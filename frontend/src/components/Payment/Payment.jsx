import React, { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import axios from 'axios';
import { server } from "../../../server";
import CheckoutForm from './CheckoutForm';
import { FiShoppingCart } from "react-icons/fi";
import { useNavigate } from 'react-router-dom'; // Assuming react-router-dom is used
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

const Payment = () => {
    const navigate = useNavigate();
    const [orderData, setOrderData] = useState(null);
    const [stripePromise, setStripePromise] = useState(null);
    const [clientSecret, setClientSecret] = useState("");

    // 1. Fetch the Stripe Publishable Key safely
    useEffect(() => {
        const getStripeKey = async () => {
            try {
                const { data } = await axios.get(`${server}/payment/stripeapikey`, { withCredentials: true });
                // Instantly assign the resolution value safely
                setStripePromise(loadStripe(data.stripeApikey));
            } catch (err) {
                console.error("Error loading Stripe key", err);
            }
        };
        getStripeKey();
    }, []);

    // 2. Fetch order data and request a Payment Intent
    // Inside Payment.jsx -> Look closely at your useEffect declaration hook:
    useEffect(() => {
        const savedOrder = JSON.parse(localStorage.getItem('latestOrder'));

        if (!savedOrder) {
            navigate('/cart');
            return;
        }

        setOrderData(savedOrder); // 👈 Passes the whole order block down to CheckoutForm

        const config = { headers: { "Content-Type": "application/json" }, withCredentials: true };
        const paymentData = { amount: Math.round(savedOrder.pricing.total * 100) };

        axios.post(`${server}/payment/process`, paymentData, config)
            .then(({ data }) => {
                setClientSecret(data.client_secret);
            })
            .catch(err => console.error("Error generating intent token", err));
    }, [navigate]);

    // Render loading indicator until all three asynchronous dependencies are resolved
    if (!orderData || !stripePromise || !clientSecret) {
        return (
            <div className="w-full h-[60vh] flex flex-col items-center justify-center gap-3">
                <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                <div className="text-gray-600 font-medium animate-pulse">Preparing Secure Checkout Gateway...</div>
            </div>
        );
    }

    return (
        <div className="w-full flex justify-center py-10 bg-gray-100">
            <div className="w-[90%] max-w-6xl grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Stripe Elements Context Wrapper Container */}
                <div className="lg:col-span-2">
                    <Elements stripe={stripePromise} options={{ clientSecret }}>
                        <CheckoutForm orderData={orderData} />
                    </Elements>
                </div>

                {/* Order Summary Checkout Panel */}
                <div className="bg-white shadow-md rounded-xl p-6 h-fit sticky top-20">
                    <h3 className="flex items-center gap-2 text-xl font-semibold mb-6">
                        <FiShoppingCart /> Order Review
                    </h3>
                    <div className="space-y-3">
                        <div className="flex justify-between text-gray-600">
                            <span>Subtotal</span>
                            <span>${orderData.pricing.subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-gray-600">
                            <span>Shipping</span>
                            <span>${orderData.pricing.shipping.toFixed(2)}</span>
                        </div>
                        {orderData.pricing.discount > 0 && (
                            <div className="flex justify-between text-green-600">
                                <span>Discount</span>
                                <span>-${orderData.pricing.discount.toFixed(2)}</span>
                            </div>
                        )}
                        <div className="flex justify-between text-lg font-bold pt-3 border-t">
                            <span>Grand Total</span>
                            <span>${orderData.pricing.total.toFixed(2)}</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Payment;