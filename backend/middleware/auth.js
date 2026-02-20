import ErrorHandler from "../utils/ErrorHandler.js";
import catchAsyncError from "./catchAsyncError.js";
import jwt from "jsonwebtoken";
import user from "../model/user.js";
import shop from "../model/shop.js";

export const isAuthenticated = catchAsyncError( async (req,res,next) => {
    const { token } = req.cookies;

    //if not have token
    if(!token){
        return next( new ErrorHandler("Please login to continue"));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await user.findById(decoded.id);
    next();
});

export const isSellerAuthenticated = catchAsyncError( async (req,res,next) => {
    const { seller_token } = req.cookies;

    //if not have token
    if(!seller_token){
        return next( new ErrorHandler("Please login to continue"));
    }
    
    const decoded = jwt.verify(seller_token, process.env.JWT_SECRET_KEY);
    req.user = await shop.findById(decoded.id);
    next();
});