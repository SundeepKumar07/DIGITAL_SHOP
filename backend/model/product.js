import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        unique: true,
        type: String,
        require: [true, "Please enter your product name"]
    },
    description: {
        type: String,
        require: [true, "Please enter your product description"]
    },
    category: {
        type: String,
        require: [true, "Please enter your product category"]
    },
    tags: {
        type: String,
        require: [true, "Please enter your product tags"]
    },
    originalPrice: {
        type: Number,
        require: [true, "Please enter your product's original price"]
    },
    discountPrice: {
        type: Number,
        require: [true, "Please enter your product's discount price"]
    },
    stock: {
        type: Number,
        require: [true, "Please enter your product stock"]
    },
    images: [
        {
            type: String,
        },
    ],
    shopId:{
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

export default mongoose.model("Product", productSchema);