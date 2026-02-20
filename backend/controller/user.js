import express from 'express';
// import path from "path";
import { upload } from '../multer.js';
import User from '../model/user.js';
import fs from 'fs';
import jwt from 'jsonwebtoken';
import sendMail from '../utils/sendEmail.js';
import sendToken from '../utils/sendToken.js';
import ErrorHandler from '../utils/ErrorHandler.js';
import catchAsyncError from '../middleware/catchAsyncError.js';
import { isAuthenticated } from '../middleware/auth.js';

const userRouter = express.Router();

userRouter.post("/create-user", upload.single("file"), async (req, res, next) => {
    const { name, email, password } = req.body;

    //condition for user exist already
    const userEmail = await User.findOne({ email });
    if (userEmail) {
        const filename = req.file.filename;
        const filepath = `uploads/${filename}`;
        fs.unlink(filepath, (err) => {
            if (err) {
                console.log(err);
                return next(new ErrorHandler("Error deleting file", 500));
            }
        });
        return next(new ErrorHandler("User already exist", 400));
    }

    //image file handling
    if (!req.file) {
        return next(new ErrorHandler("No file uploaded", 400));
    }

    // const fileUrl = path.join(filename);
    const filename = req.file.filename;
    const fileUrl = filename;

    //creating user object
    const user = {
        name,
        email,
        password,
        avatar: {
            public_id: fileUrl,
            url: fileUrl,
        },
    }

    //preparing activation link
    const activationToken = createActivationToken(user);
    const activationUrl = `${process.env.FRONTEND_URL}/activation/${activationToken}`;

    //sending activation link to email
    try {
        await sendMail({
            email: user.email,
            subject: "Activate your account",
            message: `Hello ${user.name}, please click on link to activate your account: ${activationUrl}`,
        });

        return res.json({
            success: true,
            message: `please check your email-${user.email} to activate your account.`,
        });
    } catch (error) {
        next(new ErrorHandler(error.message, 500));
    }

})

//create activation token
const createActivationToken = (user) => {
    return jwt.sign(user, process.env.ACTIVATION_SECRET, {
        expiresIn: "5m",
    })
}

//account activation route
userRouter.post('/activation', catchAsyncError(async (req, res, next) => {
    try {
        const { activation_token } = req.body;
        const newUser = jwt.verify(activation_token, process.env.ACTIVATION_SECRET);

        if (!newUser) {
            return next(new ErrorHandler("Invalid token", 400));
        }

        const { name, email, password, avatar } = newUser;

        //condition for user exist already
        const userEmail = await User.findOne({ email });
        if (userEmail) {
            return next(new ErrorHandler("User already exist", 400));
        }
        const user = new User({
            name,
            email,
            password,
            avatar,
        });

        await user.save(); // Save to DB
        sendToken(user, 201, res); // Now this works ✅

    } catch (err) {
        return next(new ErrorHandler(err.message, 500));
    }
}))

//login route
userRouter.post("/login-user", catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body;

    if(!email || !password){
        return next(new ErrorHandler("Please, fill all fields"));
    }

    try {
        const user = await User.findOne({ email }).select("+password");
        
        if(!user){
            return next(new ErrorHandler("User not found", 404));
        }

        const isPasswordValid = await user.comparePassword(password);

        if(!isPasswordValid){
            return next(new ErrorHandler("Invalid Credentials", 400));
        }
        sendToken(user, 201, res);
    } catch (err) {
        return next(new ErrorHandler(err.message, 500));
    }
}))

//get user
userRouter.get('/getuser', isAuthenticated, catchAsyncError(async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);

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

//logout user
userRouter.get('/logout-user', isAuthenticated, catchAsyncError(async (req, res, next) => {
    try {
        res.cookie('token', null, {
            expires: new Date(Date.now()),
            httpOnly: true,
        });

        res.status(201).json({
            success: true,
            message: "Log out successfully"
        })
    } catch (err) {
        return next(new ErrorHandler(err.message, 400));
    }
}))

//activation 
export default userRouter;