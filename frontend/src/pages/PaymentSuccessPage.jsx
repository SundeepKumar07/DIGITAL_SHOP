import React from 'react';
import { Link } from 'react-router-dom';
import { IoCheckmarkCircle } from 'react-icons/io5'; // Clean fallback if gif loads slowly
import MyGift from '../assets/done.gif';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import styles from '../styles/styles.js'; // Importing your global styles wrapper
import CheckoutSteps from '../components/Checkout/CheckoutSteps.jsx';

const PaymentSuccessPage = () => {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col justify-between">
      <Header />
      {/* Main Success Container */}
      <div className='flex w-full items-center justify-center'>
        <div className='w-200 ml-10 sm:ml-40'>
          <CheckoutSteps active={3}/>
        </div>
      </div>
      <div className={`${styles.section} flex-grow flex items-center justify-center my-10 px-4`}>
        <div className="bg-white p-8 md:p-12 rounded-2xl shadow-xl max-w-md w-full text-center border border-gray-100 transition duration-300 hover:shadow-2xl">
          
          {/* Animated Success Visual */}
          <div className="flex items-center justify-center relative mb-6">
            <div className="absolute inset-0 bg-teal-50 rounded-full scale-75 animate-ping opacity-20"></div>
            <img 
              src={MyGift} 
              alt="Success Animation" 
              className="w-48 h-48 md:w-56 md:h-56 object-contain z-10 relative" 
            />
          </div>

          {/* Success Message Header */}
          <h2 className="text-2xl md:text-3xl font-extrabold text-gray-800 tracking-tight mb-2">
            Order Placed Successfully!
          </h2>
          
          {/* Subtext description */}
          <p className="text-gray-500 text-sm md:text-base font-medium mb-8">
            Your order has been safely placed. A confirmation email with details has been sent to your inbox.
          </p>

          <hr className="border-gray-100 my-6" />

          {/* Action Buttons to keep user on the platform */}
          <div className="flex flex-col gap-3">
            <Link 
              to="/profile" 
              className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-semibold py-3 px-6 rounded-full shadow-md hover:from-teal-600 hover:to-cyan-600 transition-all duration-200 transform hover:-translate-y-0.5 text-center"
            >
              Track Order
            </Link>
            
            <Link 
              to="/" 
              className="w-full bg-teal-50 hover:bg-teal-100 text-teal-700 font-semibold py-3 px-6 rounded-full transition-all duration-200 text-center"
            >
              Continue Shopping
            </Link>
          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PaymentSuccessPage;