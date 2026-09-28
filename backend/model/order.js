import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    // Strict Normalized Relation to the Buyer
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    
    // Normalized relations with strict transactional snapshots
    cart: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product", // 👈 Strict Normalized Link to your Product collection
                required: true,
            },
            qty: {
                type: Number,
                required: true,
                min: [1, "Quantity cannot be less than 1."]
            },
            // 💡 IMMUTABLE SNAPSHOTS: Saved exactly as they were at the split-second of checkout
            priceAtPurchase: {
                type: Number,
                required: true,
            },
            nameAtPurchase: {
                type: String,
                required: true,
            },
            shopId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Shop", // 👈 Normalized link to the seller/shop
                required: true,
            }
        }
    ],

    // Shipping Snapshot (Kept denormalized so changes to user profiles don't alter past delivery details)
    shippingAddress: {
        name: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String, required: true },
        address1: { type: String, required: true },
        address2: { type: String },
        city: { type: String, required: true },
        state: { type: String, required: true },
        zipCode: { type: String, required: true },
        country: { type: String, required: true },
    },

    // Total Financial Balance Metrics
    pricing: {
        subtotal: { type: Number, required: true, default: 0 },
        shipping: { type: Number, required: true, default: 0 },
        discount: { type: Number, required: true, default: 0 },
        total: { type: Number, required: true, default: 0 }
    },

    // Gateway Parameters (Stripe, PayPal, COD)
    paymentInfo: {
        id: { type: String }, // Transaction ID string
        status: {
            type: String,
            required: true,
            enum: ["Pending", "Paid", "Failed", "Refunded"],
            default: "Pending"
        },
        type: {
            type: String,
            required: true, // "Stripe Credit Card", "PayPal Express", "Cash On Delivery"
        }
    },

    // Order Lifecycle Tracking State
    status: {
        type: String,
        required: true,
        enum: ["Processing", "Transiting", "Shipped", "Delivered", "Cancelled"],
        default: "Processing",
    },
    
    paidAt: { type: Date },
    deliveredAt: { type: Date },
}, { timestamps: true });

// Indexing for high-performance dashboard analytics queries
orderSchema.index({ user: 1, createdAt: -1 });
orderSchema.index({ "cart.shopId": 1 });


export default mongoose.model("Order", orderSchema);