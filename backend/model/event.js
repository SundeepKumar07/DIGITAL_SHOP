import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
    name: {
        unique: true,
        type: String,
        required: [true, "Please enter your product name"]
    },
    description: {
        type: String,
        required: [true, "Please enter your product description"]
    },
    category: {
        type: String,
        required: [true, "Please enter your product category"]
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    status: {
        type: String,
        enum: ["Running", "Upcoming", "Expired"],
        default: "Upcoming",
    },
    tags: {
        type: String,
        required: [true, "Please enter your product tags"]
    },
    originalPrice: {
        type: Number,
        required: [true, "Please enter your product's original price"]
    },
    discountPrice: {
        type: Number,
        required: [true, "Please enter your product's discount price"]
    },
    stock: {
        type: Number,
        required: [true, "Please enter your product stock"]
    },
    images: [
        {
            type: String,
        },
    ],
    shopId: {
        type: String,
        required: true,
    },
    sold_out: {
        type: Number,
        default: 0,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
});

export default mongoose.model("Event", eventSchema);