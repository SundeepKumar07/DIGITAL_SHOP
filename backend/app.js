import express from "express";
import dotenv from "dotenv";
import cors from 'cors';
import cookieParser from "cookie-parser";
import userRouter from "./controller/user.js";
import ErrorHandlerMiddleware from './middleware/error.js'
import connectDB from "./db/db.js";
import shopRouter from "./controller/shop.js";
// import fileUpload from "express-fileupload";

const app = express();

//config
if (process.env.NODE_ENV !== 'PRODUCTION') {
    dotenv.config({
        path: './config/.env'
    });
}

app.use(express.json());
app.use(cookieParser());
app.use(cors({ 
    origin: process.env.FRONTEND_URL, 
    credentials: true 
}));
app.use('/', express.static("uploads"))
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
// app.use(fileUpload({useTempFiles: true}));

//connecting database
connectDB();

//request apis
app.use('/api/v2/user', userRouter)
app.use('/api/v2/shop', shopRouter)

//errorHandler
app.use(ErrorHandlerMiddleware);
export default app;