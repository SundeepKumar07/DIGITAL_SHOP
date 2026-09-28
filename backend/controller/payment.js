import express from 'express';
import Stripe from 'stripe';
import catchAsyncError from '../middleware/catchAsyncError.js';

const router = express.Router();

const getStripeInstance = () => {
    if (!process.env.STRIPE_SECRET_KEY) {
        throw new Error("Stripe Secret Key is missing from process.env!");
    }
    return new Stripe(process.env.STRIPE_SECRET_KEY);
};

// 1. Process payment endpoint
router.post('/process', catchAsyncError(async (req, res, next) => {
    const stripeData = getStripeInstance();

    const myPayment = await stripeData.paymentIntents.create({
        amount: req.body.amount,
        currency: 'USD',
        metadata: { company: 'digitalShop' },
    });

    res.status(201).json({
        success: true,
        client_secret: myPayment.client_secret,
    });
}));

// 2. Get publishable key endpoint
router.get("/stripeapikey", catchAsyncError(async (req, res, next) => {
    res.status(200).json({ 
        stripeApikey: process.env.STRIPE_PUBLISHABLE_KEY 
    });
}));

export default router;