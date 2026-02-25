import express from "express";
import catchAsyncError from "../middleware/catchAsyncError.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import { isSellerAuthenticated } from "../middleware/auth.js";
import CouponCode from "../model/couponCode.js";

const couponCodeRouter = express.Router();

// create Coupoun codes
couponCodeRouter.post(
  "/create-coupon-code",
  isSellerAuthenticated,
  catchAsyncError(async (req, res, next) => {

    const existingCoupon = await CouponCode.findOne({ name: req.body.name });

    if (existingCoupon) {
      return next(new ErrorHandler("Coupon code already exists", 400));
    }

    const newCouponCode = await CouponCode.create({
      ...req.body,
      shopId: req.user._id,
    });

    res.status(201).json({
      success: true,
      newCouponCode,
    });
  })
);

//getting all product of a shop
couponCodeRouter.get(
  "/get-all-coupon-code-shop/:id",
  catchAsyncError(async (req, res) => {
    const coupons = await CouponCode.find({ shopId: req.params.id });
    res.status(200).json({
      success: true,
      coupons,
    });
  })
);

// //deleting a single product
couponCodeRouter.delete(
  "/delete-shop-coupon-code/:id",
  isSellerAuthenticated,
  catchAsyncError(async (req, res, next) => {
    const couponId = req.params.id;

    const couponCode = await CouponCode.findById(couponId);

    if (!couponCode) {
      return next(new ErrorHandler("coupon code not found", 404));
    }

    if (couponCode.shopId.toString() !== req.user._id.toString()) {
      return next(new ErrorHandler("Unauthorized", 403));
    }

    // 🔥 Then Delete Event From DB
    await couponCode.deleteOne();

    res.status(200).json({
      success: true,
      message: "coupon code deleted successfully",
    });
  })
);


export default couponCodeRouter;