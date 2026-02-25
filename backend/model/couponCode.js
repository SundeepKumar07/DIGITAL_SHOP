import mongoose from "mongoose";

const couponCodeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter your coupoon code name"],
        unique: true,
    },
    value: {
        type: Number,
        required: true,
    },
    minAmount: {
        type: Number,
    },
    maxAmount: {
        type: Number,
    },
    shopId: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
});

export default mongoose.model("CouponCode", couponCodeSchema);