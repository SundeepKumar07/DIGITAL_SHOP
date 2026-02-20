import express from 'express';
// import path from "path";
import { upload } from '../multer.js';
import fs from 'fs';
import jwt from 'jsonwebtoken';
import sendMail from '../utils/sendEmail.js';
import ErrorHandler from '../utils/ErrorHandler.js';
import catchAsyncError from '../middleware/catchAsyncError.js';
import { isAuthenticated, isSellerAuthenticated } from '../middleware/auth.js';
import Shop from '../model/shop.js';
import sendShopToken from '../utils/sendShopToken.js';

const shopRouter = express.Router();

shopRouter.post('/create-shop', upload.single('file'), async (req, res, next) => {
    try {
        const { email } = req.body;
        const sellerEmai = await Shop.findOne({ email });
        if (sellerEmai) {
            const filename = req.file.filename;
            const filepath = `uploads/${filename}`;
            fs.unlink(filepath, (err) => {
                if (err) {
                    console.log(err);
                    return next(new ErrorHandler("Error deleting file", 500));
                }
            });
            return next(new ErrorHandler("Shop already exist", 400));
        }

        //image file handling
        if (!req.file) {
            return next(new ErrorHandler("No file uploaded", 400));
        }

        // const fileUrl = path.join(filename);
        const filename = req.file.filename;
        const fileUrl = filename;

        const seller = {
            name: req.body.name,
            email,
            password: req.body.password,
            avatar: fileUrl,
            address: req.body.address,
            phoneNumber: req.body.phoneNumber,
            zipCode: req.body.zipCode
        }

        const activationToken = createActivationToken(seller);
        const activationUrl = `${process.env.FRONTEND_URL}/shop/activation/${activationToken}`;

        //sending activation link to email
        try {
            await sendMail({
                email: seller.email,
                subject: "Activate your Shop account",
                message: `Hello ${seller.name}, please click on link to activate your seeler account: ${activationUrl}`,
            });

            return res.json({
                success: true,
                message: `please check your email-${seller.email} to activate your account.`,
            });
        } catch (error) {
            next(new ErrorHandler(error.message, 500));
        }
    } catch (error) {
        return next(new ErrorHandler(error.message, 400))
    }
});

//activation token
const createActivationToken = (seller) => {
    return jwt.sign(seller, process.env.ACTIVATION_SECRET, {
        expiresIn: "5m",
    })
}

//=============creating activation=============
shopRouter.post('/activation', catchAsyncError(async (req, res, next) => {
    try {
        const { activation_token } = req.body;
        const newSeller = jwt.verify(activation_token, process.env.ACTIVATION_SECRET);

        if (!newSeller) {
            return next(new ErrorHandler("Invalid token", 400));
        }

        const { name, email, password, avatar, zipCode, phoneNumber, address } = newSeller;

        //condition for Shop exist already
        const userEmail = await Shop.findOne({ email });
        if (userEmail) {
            return next(new ErrorHandler("Shop already exist", 400));
        }
        const seller = new Shop({
            name,
            email,
            password,
            avatar,
            zipCode,
            address,
            phoneNumber
        });

        await seller.save(); // Save to DB
        sendShopToken(seller, 201, res); // Now this works ✅

    } catch (err) {
        return next(new ErrorHandler(err.message, 500));
    }
}))

//login route
shopRouter.post("/login-shop", catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body;

    if(!email || !password){
        return next(new ErrorHandler("Please, fill all fields"));
    }

    try {
        const seller = await Shop.findOne({ email }).select("+password");
        
        if(!seller){
            return next(new ErrorHandler("Seller not found", 404));
        }

        const isPasswordValid = await seller.comparePassword(password);

        if(!isPasswordValid){
            return next(new ErrorHandler("Invalid Credentials", 400));
        }
        sendShopToken(seller, 201, res);
    } catch (err) {
        return next(new ErrorHandler(err.message, 500));
    }
}))

//get seller
shopRouter.get('/getseller', isSellerAuthenticated, catchAsyncError(async (req, res, next) => {
    try {
        const user = await Shop.findById(req.user.id);

        //if not
        if(!user){
            return next(new ErrorHandler("Logged in first"));
        }

        return res.json({
            success: false,
            user,
        });
    } catch (err) {
        return next(new ErrorHandler(err.message, 400));
    }
}))

export default shopRouter;