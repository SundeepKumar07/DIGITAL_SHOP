// src/components/Payment/OrderSuccess.jsx
import React from 'react';
import { FiCheckCircle } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const OrderSuccess = () => {
    return (
        <div className="w-full h-[80vh] flex flex-col items-center justify-center bg-gray-50">
            <div className="bg-white p-8 md:p-12 shadow-md rounded-2xl max-w-md text-center flex flex-col items-center">
                <FiCheckCircle className="text-green-500 text-7xl mb-4 animate-bounce" />
                <h1 className="text-2xl font-bold text-gray-800 mb-2">Thank You For Your Order!</h1>
                <p className="text-gray-500 text-sm mb-6">Your transaction has processed successfully. An order confirmation invoice and real-time package tracking updates have been sent to your registered email.</p>
                <Link to="/profile/orders" className="w-full py-3 bg-black text-white rounded-xl font-medium hover:bg-gray-900 transition mb-3">
                    Track My Order Delivery
                </Link>
                <Link to="/" className="text-sm font-semibold text-gray-700 hover:text-black transition">
                    Continue Shopping
                </Link>
            </div>
        </div>
    );
};

export default OrderSuccess;