import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { BsFillBagFill } from 'react-icons/bs';
import { toast } from 'react-toastify';
import { getOrderDetails, cancelOrder } from '../../redux/actions/orderAction';
import { BACKEND_URL } from '../../../server';

const OrderDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { orderDetails, getOrderDetailsLoading, orderDetailsError, updateOrderLoading } = useSelector(
    (state) => state.order
  );

  useEffect(() => {
    if (id) {
      dispatch(getOrderDetails(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (orderDetailsError) {
      toast.error(orderDetailsError);
    }
  }, [orderDetailsError]);

  const handleCancelOrder = () => {
    if (window.confirm("Are you sure you want to cancel this order?")) {
      dispatch(cancelOrder(id));
    }
  };

  if (getOrderDetailsLoading || !orderDetails) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <div className="text-lg font-semibold text-gray-600 animate-pulse">
          Loading order details...
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gray-50 py-10 px-4 md:px-12">
      <div className="max-w-[1100px] mx-auto bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
        
        {/* HEADER SECTION */}
        <div className="flex flex-col md:flex-row md:items-center justify-between border-b pb-6 gap-4">
          <div className="flex items-center gap-3">
            <BsFillBagFill size={30} className="text-emerald-600" />
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Order Details</h1>
              <p className="text-xs text-gray-500 font-mono mt-0.5">ID: {orderDetails._id}</p>
            </div>
          </div>
          <div className="text-left md:text-right">
            <span className="text-xs text-gray-400 block">Placed On:</span>
            <span className="text-sm font-medium text-gray-700">
              {orderDetails.createdAt ? new Date(orderDetails.createdAt).toLocaleDateString() : 'N/A'}
            </span>
          </div>
        </div>

        {/* STATUS BADGES & CANCEL BUTTON */}
        <div className="flex flex-wrap items-center justify-between py-4 border-b border-gray-100 gap-4">
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-600 font-medium">Status:</span>
            <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
              orderDetails.status === 'Delivered'
                ? 'bg-emerald-100 text-emerald-700'
                : orderDetails.status === 'Cancelled'
                ? 'bg-red-100 text-red-700'
                : 'bg-amber-100 text-amber-700'
            }`}>
              {orderDetails.status || 'Processing'}
            </span>
          </div>

          {orderDetails.status === 'Processing' && (
            <button
              onClick={handleCancelOrder}
              disabled={updateOrderLoading}
              className="px-4 py-2 text-xs font-semibold text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition disabled:opacity-50"
            >
              {updateOrderLoading ? 'Cancelling...' : 'Cancel Order'}
            </button>
          )}
        </div>

        {/* PRODUCT / CART ITEMS SECTION */}
        <div className="py-6 border-b border-gray-100 space-y-4">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Purchased Items</h2>
          {orderDetails.cart?.map((item, index) => {
            const product = item.product || {};
            const itemImage = product.images?.[0]?.url || product.images?.[0] || '';

            return (
              <div key={index} className="flex items-center justify-between gap-4 p-3 hover:bg-gray-50 rounded-lg transition border border-gray-50">
                <div className="flex items-center gap-4">
                  <img
                    src={itemImage ? `${BACKEND_URL}/${itemImage}` : 'https://via.placeholder.com/80'}
                    alt={item.nameAtPurchase || product.name}
                    className="w-16 h-16 object-cover rounded-md border border-gray-200"
                  />
                  <div>
                    <h3 className="font-medium text-gray-800 text-sm line-clamp-1">
                      {item.nameAtPurchase || product.name}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1">
                      US${item.priceAtPurchase} x {item.qty}
                    </p>
                  </div>
                </div>
                <div className="text-right font-semibold text-gray-800 text-sm">
                  US${(item.priceAtPurchase * item.qty).toFixed(2)}
                </div>
              </div>
            );
          })}
        </div>

        {/* SHIPPING & PAYMENT INFO */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-6 border-b border-gray-100">
          <div>
            <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-3">Shipping Address</h3>
            <div className="text-sm text-gray-600 space-y-1">
              <p className="font-medium text-gray-800">{orderDetails.shippingAddress?.fullName || 'N/A'}</p>
              <p>{orderDetails.shippingAddress?.address1} {orderDetails.shippingAddress?.address2}</p>
              <p>{orderDetails.shippingAddress?.city}, {orderDetails.shippingAddress?.state} {orderDetails.shippingAddress?.zipCode}</p>
              <p>{orderDetails.shippingAddress?.country}</p>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-3">Payment Info</h3>
            <div className="text-sm text-gray-600 space-y-1">
              <p><span className="text-gray-400">Method:</span> {orderDetails.paymentInfo?.type || 'N/A'}</p>
              <p>
                <span className="text-gray-400">Status:</span>{' '}
                <span className={orderDetails.paymentInfo?.status === 'Paid' ? 'text-emerald-600 font-medium' : 'text-amber-600 font-medium'}>
                  {orderDetails.paymentInfo?.status || 'Pending'}
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* PRICING BREAKDOWN */}
        <div className="pt-6 flex justify-end">
          <div className="w-full md:w-1/2 space-y-2 text-sm text-gray-600">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>US${orderDetails.pricing?.subtotal?.toFixed(2) || '0.00'}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping Fee:</span>
              <span>US${orderDetails.pricing?.shipping?.toFixed(2) || '0.00'}</span>
            </div>
            <div className="flex justify-between">
              <span>Discount:</span>
              <span>-US${orderDetails.pricing?.discount?.toFixed(2) || '0.00'}</span>
            </div>
            <div className="flex justify-between font-bold text-gray-800 text-base pt-2 border-t">
              <span>Total Price:</span>
              <span className="text-emerald-600">US${orderDetails.pricing?.total?.toFixed(2) || '0.00'}</span>
            </div>
          </div>
        </div>

        {/* BACK LINK */}
        <div className="mt-8 pt-4 border-t border-gray-100">
          <Link to="/profile" className="text-sm font-semibold text-blue-600 hover:text-blue-800 transition">
            ← Back to Orders
          </Link>
        </div>

      </div>
    </div>
  );
};

export default OrderDetailsPage;