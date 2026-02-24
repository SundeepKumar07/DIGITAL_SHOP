import express from "express";
import { upload } from "../multer.js";
import catchAsyncError from "../middleware/catchAsyncError.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import Product from "../model/product.js";
import Shop from "../model/shop.js";
import { isSellerAuthenticated } from "../middleware/auth.js";
import Event from "../model/event.js";

const eventRouter = express.Router();

// Create Product
eventRouter.post(
  "/create-event",
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
      const existingEvent = await Event.findOne({ name });
      if (existingEvent) {
        return next(new ErrorHandler("Event Already Exist", 400));
      }

      if (!req.files || req.files.length === 0) {
        return next(new ErrorHandler("At least one image is required", 400));
      }

      // Convert files to image URLs
      const imageUrls = req.files.map((file) => file.filename);

      const EventData = {
        ...req.body,
        images: imageUrls,
        shopId: shop._id,
      };
      const event = await Event.create(EventData);

      res.status(201).json({
        success: true,
        event,
      });

    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

//getting all product of a shop
eventRouter.get(
  "/get-all-events-shop/:id",
  catchAsyncError(async (req, res) => {
    const events = await Event.find({ shopId: req.params.id });
    res.status(200).json({
      success: true,
      events,
    });
  })
);

// //deleting a single product
eventRouter.delete(
  "/delete-shop-event/:id",
  isSellerAuthenticated,
  catchAsyncError(async (req, res, next) => {
    const eventId = req.params.id;
    
    const event = await Event.findById(eventId);
    
    if (!event) {
      return next(new ErrorHandler("Event not found", 404));
    }
    
    if (event.shopId.toString() !== req.user._id.toString()) {
      return next(new ErrorHandler("Unauthorized", 403));
    }
    
    await event.deleteOne();

    res.status(200).json({
      success: true,
      message: "Event deleted successfully",
    });
  })
);

export default eventRouter;