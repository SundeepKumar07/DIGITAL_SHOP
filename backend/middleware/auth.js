import ErrorHandler from "../utils/ErrorHandler.js";
import catchAsyncError from "./catchAsyncError.js";
import jwt from "jsonwebtoken";
import user from "../model/user.js";
import shop from "../model/shop.js";

export const isAuthenticated = catchAsyncError(async (req, res, next) => {
    const { token } = req.cookies;

    if (!token) {
        return next(new ErrorHandler("Please login to continue", 401));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await user.findById(decoded.id);
    next();
});

export const isSellerAuthenticated = catchAsyncError(async (req, res, next) => {
    const { seller_token } = req.cookies;

    if (!seller_token) {
        return next(new ErrorHandler("Please login to continue", 401));
    }
    
    const decoded = jwt.verify(seller_token, process.env.JWT_SECRET_KEY);
    req.user = await shop.findById(decoded.id);
    next();
});

export const isUserOrSellerAuthenticated = catchAsyncError(async (req, res, next) => {
    const { token, seller_token } = req.cookies;

    // 1. Check User Token
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
            req.user = await user.findById(decoded.id);
        } catch (err) {
            // Token expired or invalid, continue checking seller_token
        }
    }

    // 2. Check Seller Token
    if (seller_token) {
        try {
            const decoded = jwt.verify(seller_token, process.env.JWT_SECRET_KEY);
            req.seller = await shop.findById(decoded.id);
        } catch (err) {
            // Token expired or invalid
        }
    }

    // 3. Reject if neither account was populated
    if (!req.user && !req.seller) {
        return next(new ErrorHandler("Please login to access this resource", 401));
    }

    next();
});