import React, { useState, useEffect } from 'react';
import { CardNumberElement, CardExpiryElement, CardCvcElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { PayPalButtons } from "@paypal/react-paypal-js";
import { useSelector, useDispatch } from 'react-redux';
import { createOrder } from '../../redux/actions/orderAction';
import { clearCreateOrderState } from '../../redux/slices/orderSlice';

const CheckoutForm = ({ orderData }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Redux States
  const { user } = useSelector((state) => state.user);
  const { createOrderLoading, createOrderSuccess, createOrderError } = useSelector((state) => state.order);

  const [paymentMethod, setPaymentMethod] = useState("card"); // 'card', 'paypal', 'cod'
  const [loading, setLoading] = useState(false);

  // Handle Redux state feedback for order creation
  useEffect(() => {
    if (createOrderSuccess) {
      localStorage.removeItem("latestOrder");
      toast.success("Order Placed Successfully!");
      dispatch(clearCreateOrderState());
      navigate("/order/success");
    }

    if (createOrderError) {
      toast.error(createOrderError);
      dispatch(clearCreateOrderState());
      setLoading(false);
    }
  }, [createOrderSuccess, createOrderError, dispatch, navigate]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (loading || createOrderLoading) return;

    // --- 1. CASH ON DELIVERY SUBMISSION ROUTE ---
    if (paymentMethod === "cod") {
      setLoading(true);
      const finalOrder = {
        ...orderData,
        user: user?._id,
        paymentInfo: {
          type: "Cash On Delivery",
          status: "Pending"
        }
      };

      dispatch(createOrder(finalOrder));
      return;
    }

    // --- 2. PAYPAL BLOCKED INTERCEPTOR ---
    if (paymentMethod === "paypal") {
      return; // Handled directly inside PayPalButtons component below
    }

    // --- 3. STRIPE SECURE CARD SUBMISSION ROUTE ---
    if (!stripe || !elements) {
      toast.error("Stripe gateway has not fully loaded yet. Please wait.");
      return;
    }

    try {
      setLoading(true);
      const cardElement = elements.getElement(CardNumberElement);

      const { error: submitError } = await elements.submit();
      if (submitError) {
        toast.error(submitError.message);
        setLoading(false);
        return;
      }

      const result = await stripe.confirmCardPayment(
        stripe.elements?.clientSecret || "",
        {
          payment_method: {
            card: cardElement,
            billing_details: {
              name: orderData?.shippingAddress?.name || user?.name || "Customer",
              email: orderData?.shippingAddress?.email || user?.email || "",
              phone: orderData?.shippingAddress?.phone || user?.phone || "",
              address: {
                line1: orderData?.shippingAddress?.address1 || "",
                city: orderData?.shippingAddress?.city || "",
                state: orderData?.shippingAddress?.state || "",
                postal_code: orderData?.shippingAddress?.zipCode || "",
                country: orderData?.shippingAddress?.country || "US",
              }
            }
          }
        }
      );

      if (result.error) {
        toast.error(result.error.message);
        setLoading(false);
      } else if (result.paymentIntent.status === "succeeded") {
        const finalOrder = {
          ...orderData,
          user: user?._id,
          paymentInfo: {
            id: result.paymentIntent.id,
            status: "Paid",
            type: "Stripe Credit Card"
          }
        };

        dispatch(createOrder(finalOrder));
      }
    } catch (error) {
      toast.error("Payment could not be verified securely.");
      console.error("Payment confirmation error:", error);
      setLoading(false);
    }
  };

  const isProcessing = loading || createOrderLoading;

  return (
    <form onSubmit={handleFormSubmit} className="bg-white shadow-md rounded-xl p-6 space-y-6">
      <h2 className="text-xl font-semibold mb-4">Choose Payment Gateway Method</h2>

      {/* SELECTION RADIO BUTTON BLOCKS */}
      <div className="space-y-3">
        <label className={`flex items-center gap-3 p-4 border rounded-xl cursor-pointer transition ${paymentMethod === 'card' ? 'border-black bg-gray-50' : 'border-gray-200'}`}>
          <input type="radio" name="payMethod" checked={paymentMethod === 'card'} onChange={() => setPaymentMethod('card')} className="accent-black" />
          <span className="font-medium text-gray-800">Pay Safely via Stripe Card</span>
        </label>

        <label className={`flex items-center gap-3 p-4 border rounded-xl cursor-pointer transition ${paymentMethod === 'paypal' ? 'border-black bg-gray-50' : 'border-gray-200'}`}>
          <input type="radio" name="payMethod" checked={paymentMethod === 'paypal'} onChange={() => setPaymentMethod('paypal')} className="accent-black" />
          <span className="font-medium text-gray-800">Instant Express Checkout with PayPal</span>
        </label>

        <label className={`flex items-center gap-3 p-4 border rounded-xl cursor-pointer transition ${paymentMethod === 'cod' ? 'border-black bg-gray-50' : 'border-gray-200'}`}>
          <input type="radio" name="payMethod" checked={paymentMethod === 'cod'} onChange={() => setPaymentMethod('cod')} className="accent-black" />
          <span className="font-medium text-gray-800">Cash On Delivery (COD)</span>
        </label>
      </div>

      {/* DYNAMIC FORM SEGMENTS */}
      {paymentMethod === 'card' && (
        <div className="space-y-4 pt-4 border-t border-gray-100 animate-fadeIn">
          <h3 className="font-medium text-gray-700">Enter Payment Details</h3>
          <div>
            <label className="text-xs text-gray-500 font-semibold mb-1 block">Card Number</label>
            <div className="stripe-input-wrapper"><CardNumberElement options={stripeStyleOptions} /></div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-gray-500 font-semibold mb-1 block">Expiration Date</label>
              <div className="stripe-input-wrapper"><CardExpiryElement options={stripeStyleOptions} /></div>
            </div>
            <div>
              <label className="text-xs text-gray-500 font-semibold mb-1 block">Secure CVC</label>
              <div className="stripe-input-wrapper"><CardCvcElement options={stripeStyleOptions} /></div>
            </div>
          </div>
        </div>
      )}

      {/* PAYPAL CONTAINER REGION */}
      {paymentMethod === 'paypal' && (
        <div className="pt-4 border-t border-gray-100 space-y-4">
          <div className="p-4 bg-blue-50 text-blue-700 rounded-lg text-sm border border-blue-200">
            Please process transaction options securely using the sandbox buttons below:
          </div>
          <PayPalButtons
            style={{ layout: "vertical" }}
            createOrder={(data, actions) => {
              return actions.order.create({
                purchase_units: [{ amount: { value: orderData?.pricing?.total?.toString() } }]
              });
            }}
            onApprove={async (data, actions) => {
              const details = await actions.order.capture();
              if (details.status === "COMPLETED") {
                const finalOrder = {
                  ...orderData,
                  user: user?._id,
                  paymentInfo: { 
                    id: details.id, 
                    status: "Paid", 
                    type: "PayPal Express" 
                  }
                };
                dispatch(createOrder(finalOrder));
              }
            }}
          />
        </div>
      )}

      {paymentMethod === 'cod' && (
        <div className="p-4 bg-amber-50 text-amber-800 rounded-lg text-sm border border-amber-200">
          No upfront settlement needed. Pay your dispatch courier handling fees inside your currency locale.
        </div>
      )}

      {/* ACTION SUBMIT BUTTON */}
      {paymentMethod !== 'paypal' && (
        <button
          type="submit"
          disabled={isProcessing}
          className="w-full h-12 bg-black text-white rounded-lg font-semibold hover:bg-gray-900 transition disabled:bg-gray-400 mt-4"
        >
          {isProcessing ? "Processing Order..." : paymentMethod === 'card' ? `Pay Securely $${orderData?.pricing?.total}` : "Place Order"}
        </button>
      )}

      <style>{`
        .stripe-input-wrapper {
          border: 1px solid #d1d5db;
          border-radius: 8px;
          padding: 12px;
          background: white;
        }
        .stripe-input-wrapper:focus-within {
          border-color: #000000;
        }
      `}</style>
    </form>
  );
};

const stripeStyleOptions = {
  style: {
    base: {
      fontSize: "16px",
      color: "#1f2937",
      fontFamily: "Inter, sans-serif",
      "::placeholder": { color: "#9ca3af" },
    },
    invalid: { color: "#ef4444" },
  },
};

export default CheckoutForm;