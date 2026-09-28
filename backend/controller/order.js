import express from "express";
import catchAsyncError from "../middleware/catchAsyncError.js";
import { isAuthenticated, isSellerAuthenticated, isUserOrSellerAuthenticated } from "../middleware/auth.js";
import Order from "../model/order.js";
import Product from "../model/product.js";
import ErrorHandler from "../utils/ErrorHandler.js";

const router = express.Router();

// Helper to reliably extract Seller/Shop ID across middleware implementations
const getSellerId = (req) => req.seller?._id || req.user?._id;

// ==========================================
// 1. CREATE ORDER (Server-Side Price & Stock Validation)
// ==========================================
router.post(
  "/create-order",
  isAuthenticated,
  catchAsyncError(async (req, res, next) => {
    const { cart, shippingAddress, paymentInfo, pricing: inputPricing } = req.body;

    if (!cart || !Array.isArray(cart) || cart.length === 0) {
      return next(new ErrorHandler("Cannot place an order with an empty cart.", 400));
    }

    // Extract product IDs for bulk lookup
    const productIds = cart.map((item) => item._id || item.product?._id || item.product);
    const dbProducts = await Product.find({ _id: { $in: productIds } });

    const dbProductMap = new Map();
    dbProducts.forEach((p) => dbProductMap.set(p._id.toString(), p));

    let calculatedSubtotal = 0;
    const formattedCart = [];

    // Verify stock, compute server-side pricing, and format cart
    for (const item of cart) {
      const pId = (item._id || item.product?._id || item.product)?.toString();
      const dbProduct = dbProductMap.get(pId);

      if (!dbProduct) {
        return next(new ErrorHandler(`Product not found: ID ${pId}`, 404));
      }

      const qty = Number(item.qty || item.quantity || 1);
      if (dbProduct.stock < qty) {
        return next(
          new ErrorHandler(`Insufficient stock for "${dbProduct.name}". Available: ${dbProduct.stock}`, 400)
        );
      }

      const itemPrice = dbProduct.discountPrice || dbProduct.originalPrice;
      calculatedSubtotal += itemPrice * qty;

      // Ensure shopId is extracted strictly as an ObjectId string
      const shopId = dbProduct.shopId || dbProduct.shop?._id || dbProduct.shop;

      if (!shopId) {
        return next(new ErrorHandler(`Shop owner missing for product "${dbProduct.name}".`, 400));
      }

      formattedCart.push({
        product: dbProduct._id,
        qty,
        priceAtPurchase: itemPrice,
        nameAtPurchase: dbProduct.name,
        shopId: shopId,
      });
    }

    // Shipping & Total calculations
    const shipping = inputPricing?.shipping || 0;
    const discount = inputPricing?.discount || 0;
    const calculatedTotal = calculatedSubtotal + shipping - discount;

    const pricing = {
      subtotal: calculatedSubtotal,
      shipping,
      discount,
      total: Math.max(calculatedTotal, 0),
    };

    // Create Order
    const order = await Order.create({
      user: req.user._id,
      cart: formattedCart,
      shippingAddress,
      pricing,
      paymentInfo,
      paidAt: paymentInfo?.status === "Paid" ? Date.now() : null,
    });

    // Atomic Stock Decrement & Sold Count Increment
    for (const item of formattedCart) {
      const updatedProduct = await Product.findOneAndUpdate(
        { _id: item.product, stock: { $gte: item.qty } },
        {
          $inc: {
            stock: -item.qty,
            sold_out: item.qty,
          },
        },
        { new: true }
      );

      if (!updatedProduct) {
        return next(
          new ErrorHandler(`Race condition detected: "${item.nameAtPurchase}" went out of stock during processing.`, 400)
        );
      }
    }

    res.status(201).json({
      success: true,
      message: "Order placed successfully.",
      order,
    });
  })
);

// ==========================================
// 2. TRACK ORDER (Customer Timeline)
// ==========================================
router.get(
  "/track-order/:orderId",
  isAuthenticated,
  catchAsyncError(async (req, res, next) => {
    const order = await Order.findOne({
      _id: req.params.orderId,
      user: req.user._id,
    }).select("status paidAt deliveredAt createdAt paymentInfo cart.nameAtPurchase shippingAddress");

    if (!order) {
      return next(new ErrorHandler("Order not found or unauthorized.", 404));
    }

    res.status(200).json({
      success: true,
      trackingInfo: {
        orderId: order._id,
        status: order.status,
        paidAt: order.paidAt,
        deliveredAt: order.deliveredAt,
        createdAt: order.createdAt,
        shippingAddress: order.shippingAddress,
        itemsCount: order.cart.length,
      },
    });
  })
);

// ==========================================
// 3. GET SINGLE ORDER DETAILS (Customer)
// ==========================================
router.get(
  "/get-order-details/:orderId",
  isUserOrSellerAuthenticated,
  catchAsyncError(async (req, res, next) => {
    // 1. Fetch order
    const order = await Order.findById(req.params.orderId)
      .populate("cart.product", "images name discountPrice");

    if (!order) {
      return next(new ErrorHandler("Order not found", 404));
    }

    // 2. Check if logged-in user is the customer
    const isCustomer = req.user && order.user.toString() === req.user._id.toString();

    // 3. Check if logged-in seller owns any product in this order's cart
    const isSeller = req.seller && order.cart.some(
      (item) => item.shopId?.toString() === req.seller._id.toString() ||
                item.product?.shopId?.toString() === req.seller._id.toString()
    );

    // 4. Access Control Decision
    if (!isCustomer && !isSeller) {
      return next(new ErrorHandler("You are not authorized to view this order", 403));
    }

    res.status(200).json({
      success: true,
      order,
    });
  })
);

// ==========================================
// 4. GET ALL ORDERS OF LOGGED-IN CUSTOMER
// ==========================================
router.get(
  "/get-all-orders-of-customer",
  isAuthenticated,
  catchAsyncError(async (req, res, next) => {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });
  })
);

// ==========================================
// 5. GET ALL ORDERS OF SHOP / SELLER
// ==========================================
router.get(
  "/get-all-orders-of-shop",
  isSellerAuthenticated,
  catchAsyncError(async (req, res, next) => {
    const sellerId = getSellerId(req);

    if (!sellerId) {
      return next(new ErrorHandler("Seller authentication details missing.", 401));
    }

    const orders = await Order.find({
      "cart.shopId": sellerId,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });
  })
);

// ==========================================
// 6. UPDATE ORDER STATUS (Seller Endpoint)
// ==========================================
router.put(
  "/update-order-status/:orderId",
  isSellerAuthenticated,
  catchAsyncError(async (req, res, next) => {
    const sellerId = getSellerId(req);
    const { status } = req.body;
    const allowedStatuses = ["Processing", "Transiting", "Shipped", "Delivered", "Cancelled"];

    if (!allowedStatuses.includes(status)) {
      return next(new ErrorHandler("Invalid status state provided.", 400));
    }

    const order = await Order.findOne({
      _id: req.params.orderId,
      "cart.shopId": sellerId,
    });

    if (!order) {
      return next(new ErrorHandler("Order not found for this vendor.", 404));
    }

    order.status = status;

    if (status === "Delivered") {
      order.deliveredAt = Date.now();
      if (order.paymentInfo?.type === "Cash On Delivery") {
        order.paymentInfo.status = "Paid";
        order.paidAt = Date.now();
      }
    }

    await order.save();

    res.status(200).json({
      success: true,
      message: "Order status updated successfully.",
      order,
    });
  })
);

// ==========================================
// 7. CANCEL ORDER (Customer Endpoint)
// ==========================================
router.put(
  "/cancel-order/:orderId",
  isAuthenticated,
  catchAsyncError(async (req, res, next) => {
    const order = await Order.findOne({
      _id: req.params.orderId,
      user: req.user._id,
    });

    if (!order) {
      return next(new ErrorHandler("Order not found.", 404));
    }

    // Only allow initial Processing stage cancellations
    if (order.status !== "Processing" || order.deliveredAt) {
      return next(new ErrorHandler(`Order cannot be cancelled once it is in '${order.status}' stage.`, 400));
    }

    order.status = "Cancelled";
    await order.save();

    // Restock products back into inventory
    for (const item of order.cart) {
      await Product.findByIdAndUpdate(item.product, {
        $inc: {
          stock: item.qty,
          sold_out: -item.qty,
        },
      });
    }

    res.status(200).json({
      success: true,
      message: "Order cancelled successfully and stock replenished.",
      order,
    });
  })
);

// ==========================================
// 8. REQUEST RETURN / REFUND (Customer Endpoint)
// ==========================================
router.put(
  "/request-return/:orderId",
  isAuthenticated,
  catchAsyncError(async (req, res, next) => {
    const order = await Order.findOne({
      _id: req.params.orderId,
      user: req.user._id,
    });

    if (!order) {
      return next(new ErrorHandler("Order not found.", 404));
    }

    if (order.status !== "Delivered") {
      return next(new ErrorHandler("Only delivered orders can be requested for return.", 400));
    }

    order.status = "Processing"; // Sets state to return processing
    order.paymentInfo.status = "Refunded";
    await order.save();

    res.status(200).json({
      success: true,
      message: "Return request submitted successfully.",
      order,
    });
  })
);

// ==========================================
// 9. ADMIN: GET ALL SYSTEM ORDERS
// ==========================================
router.get(
  "/admin/all-orders",
  isAuthenticated,
  catchAsyncError(async (req, res, next) => {
    if (req.user.role !== "Admin") {
      return next(new ErrorHandler("Access denied: Admin privileges required.", 403));
    }

    const orders = await Order.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });
  })
);

export default router;