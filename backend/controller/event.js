import express from "express";
import { upload } from "../multer.js";
import catchAsyncError from "../middleware/catchAsyncError.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import Shop from "../model/shop.js";
import { isSellerAuthenticated } from "../middleware/auth.js";
import Event from "../model/event.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

    // 🔥 Delete Images From Uploads Folder
    await Promise.all(
      event.images.map(async (image) => {
        const filePath = path.join(__dirname, "../uploads", image);

        if (fs.existsSync(filePath)) {
          await fs.promises.unlink(filePath);
        }
      })
    );

    // 🔥 Then Delete Event From DB
    await event.deleteOne();

    res.status(200).json({
      success: true,
      message: "Event deleted successfully",
    });
  })
);

export default eventRouter;