import express from "express";
import { upload } from "../multer.js";
import catchAsyncError from "../middleware/catchAsyncError.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import Product from "../model/product.js";
import Shop from "../model/shop.js";

const productRouter = express.Router();

// Create Product
productRouter.post(
  "/create-product",
  upload.array("images", 6), // max 6 images
  catchAsyncError(async (req, res, next) => {
    try {
      const { shopId, name } = req.body;

      if (!shopId) {
        return next(new ErrorHandler("Shop Id is required", 400));
      }

      const shop = await Shop.findById(shopId);
      if (!shop) {
        return next(new ErrorHandler("Shop not found", 404));
      }
      const existingProduct = await Product.findOne({name});
      if (existingProduct) {
        return next(new ErrorHandler("Product Already Exist", 400));
      }

      if (!req.files || req.files.length === 0) {
        return next(new ErrorHandler("At least one image is required", 400));
      }

      // Convert files to image URLs
      const imageUrls = req.files.map((file) => file.filename);

      const productData = {
        ...req.body,
        images: imageUrls,
        shopId: shop._id,
      };

      const product = await Product.create(productData);

      res.status(201).json({
        success: true,
        product,
      });

    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

export default productRouter;