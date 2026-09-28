import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getOrderDetails, updateOrderStatus } from '../../redux/actions/orderAction';
import { clearUpdateOrderState, clearOrderErrors } from '../../redux/slices/orderSlice';

// Fixed import paths: Bs icons come from 'react-icons/bs'
import { 
  BsBagCheckFill, 
  BsTruck, 
  BsPersonFill, 
  BsGeoAltFill, 
  BsCreditCardFill, 
  BsArrowLeft 
} from 'react-icons/bs';

const ShopOrderDetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { 
    orderDetails, 
    getOrderDetailsLoading, 
    orderDetailsError, 
    updateOrderLoading, 
    updateOrderSuccess, 
    updateOrderError 
  } = useSelector((state) => state.order);

  const [status, setStatus] = useState('');

  // Fetch Order Details
  useEffect(() => {
    if (id) {
      dispatch(getOrderDetails(id));
    }
    return () => {
      dispatch(clearOrderErrors());
    };
  }, [dispatch, id]);

  // Sync status dropdown with fetched order details
  useEffect(() => {
    if (orderDetails?.status) {
      setStatus(orderDetails.status);
    }
  }, [orderDetails]);

  // Handle status update feedback
  useEffect(() => {
    if (updateOrderSuccess) {
      dispatch(getOrderDetails(id));
      dispatch(clearUpdateOrderState());
    }
  }, [updateOrderSuccess, dispatch, id]);

  const handleStatusUpdate = (e) => {
    e.preventDefault();
    if (status && status !== orderDetails?.status) {
      dispatch(updateOrderStatus(id, status));
    }
  };

  const statusOptions = ["Processing", "Transiting", "Shipped", "Delivered", "Cancelled"];

  if (getOrderDetailsLoading) {
    return (
      <div className="w-full h-[80vh] flex flex-col items-center justify-center gap-3">
        <div className="w-10 h-10 border-4 border-teal-500/20 border-t-teal-500 rounded-full animate-spin" />
        <p className="text-sm font-semibold text-gray-400">Loading order details...</p>
      </div>
    );
  }

  if (orderDetailsError) {
    return (
      <div className="w-full h-[70vh] flex flex-col items-center justify-center gap-4">
        <p className="text-rose-500 font-semibold">{orderDetailsError}</p>
        <button 
          onClick={() => navigate(-1)} 
          className="px-4 py-2 bg-gray-100 rounded-lg text-sm font-medium hover:bg-gray-200 cursor-pointer"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => navigate(-1)} 
            className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors cursor-pointer"
          >
            <BsArrowLeft size={18} />
          </button>
          <div>
            <h1 className="text-xl font-bold text-gray-800">Order #{orderDetails?._id}</h1>
            <p className="text-xs text-gray-500">
              Placed on {orderDetails?.createdAt ? new Date(orderDetails.createdAt).toLocaleDateString() : 'N/A'}
            </p>
          </div>
        </div>

        {/* Current Badge Status */}
        <span className={`self-start sm:self-auto px-4 py-1.5 rounded-full text-xs font-semibold ${
          orderDetails?.status === "Delivered" ? "bg-emerald-50 text-emerald-600 border border-emerald-200" :
          orderDetails?.status === "Cancelled" ? "bg-rose-50 text-rose-600 border border-rose-200" :
          "bg-amber-50 text-amber-600 border border-amber-200"
        }`}>
          {orderDetails?.status}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Columns: Items & Summary */}
        <div className="lg:col-span-2 space-y-6">
          {/* Ordered Cart Items */}
          <div className="bg-white p-6 rounded-2xl shadow-xs border border-gray-100">
            <h2 className="text-base font-semibold text-gray-800 border-b border-gray-100 pb-3 mb-4 flex items-center gap-2">
              <BsBagCheckFill className="text-teal-600" /> Cart Items
            </h2>
            <div className="divide-y divide-gray-100">
              {orderDetails?.cart?.map((item, index) => (
                <div key={item._id || index} className="py-3 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-800">{item.nameAtPurchase}</p>
                    <p className="text-xs text-gray-400">Qty: {item.qty}</p>
                  </div>
                  <p className="text-sm font-semibold text-gray-700">
                    US$ {((item.priceAtPurchase || 0) * (item.qty || 1)).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Pricing Details */}
          <div className="bg-white p-6 rounded-2xl shadow-xs border border-gray-100">
            <h2 className="text-base font-semibold text-gray-800 border-b border-gray-100 pb-3 mb-4">
              Financial Metrics
            </h2>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>US$ {(orderDetails?.pricing?.subtotal || 0).toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>US$ {(orderDetails?.pricing?.shipping || 0).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-rose-500">
                <span>Discount</span>
                <span>- US$ {(orderDetails?.pricing?.discount || 0).toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-gray-800 border-t border-gray-100 pt-3 text-base">
                <span>Total Amount</span>
                <span className="text-teal-600">US$ {(orderDetails?.pricing?.total || 0).toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Order Actions & Customer Info */}
        <div className="space-y-6">
          {/* Update Order Status Card (Seller Panel) */}
          <div className="bg-white p-6 rounded-2xl shadow-xs border border-gray-100">
            <h2 className="text-base font-semibold text-gray-800 border-b border-gray-100 pb-3 mb-4 flex items-center gap-2">
              <BsTruck className="text-teal-600" /> Update Order Status
            </h2>
            
            {updateOrderError && (
              <p className="text-xs text-rose-500 mb-3">{updateOrderError}</p>
            )}

            <form onSubmit={handleStatusUpdate} className="space-y-4">
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                disabled={orderDetails?.status === "Delivered" || orderDetails?.status === "Cancelled"}
                className="w-full p-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-teal-500 bg-gray-50 disabled:opacity-50"
              >
                {statusOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>

              <button
                type="submit"
                disabled={updateOrderLoading || status === orderDetails?.status || orderDetails?.status === "Delivered" || orderDetails?.status === "Cancelled"}
                className="w-full py-2.5 px-4 rounded-lg bg-teal-600 text-white text-sm font-semibold hover:bg-teal-700 transition-all duration-200 disabled:opacity-50 active:scale-95 cursor-pointer"
              >
                {updateOrderLoading ? "Updating Status..." : "Update Status"}
              </button>
            </form>
          </div>

          {/* Customer & Shipping Address */}
          <div className="bg-white p-6 rounded-2xl shadow-xs border border-gray-100 space-y-4">
            <div>
              <h3 className="text-sm font-semibold text-gray-800 flex items-center gap-2 mb-2">
                <BsPersonFill className="text-teal-600" /> Shipping Recipient
              </h3>
              <p className="text-xs text-gray-600">{orderDetails?.shippingAddress?.name}</p>
              <p className="text-xs text-gray-500">{orderDetails?.shippingAddress?.email}</p>
              <p className="text-xs text-gray-500">{orderDetails?.shippingAddress?.phone}</p>
            </div>

            <div className="border-t border-gray-100 pt-3">
              <h3 className="text-sm font-semibold text-gray-800 flex items-center gap-2 mb-2">
                <BsGeoAltFill className="text-teal-600" /> Shipping Address
              </h3>
              <p className="text-xs text-gray-600">
                {orderDetails?.shippingAddress?.address1}
                {orderDetails?.shippingAddress?.address2 ? `, ${orderDetails.shippingAddress.address2}` : ''}
              </p>
              <p className="text-xs text-gray-600">
                {orderDetails?.shippingAddress?.city}, {orderDetails?.shippingAddress?.state} {orderDetails?.shippingAddress?.zipCode}
              </p>
              <p className="text-xs text-gray-600">{orderDetails?.shippingAddress?.country}</p>
            </div>

            <div className="border-t border-gray-100 pt-3">
              <h3 className="text-sm font-semibold text-gray-800 flex items-center gap-2 mb-2">
                <BsCreditCardFill className="text-teal-600" /> Payment Info
              </h3>
              <p className="text-xs text-gray-600">
                Type: <span className="font-medium">{orderDetails?.paymentInfo?.type}</span>
              </p>
              <p className="text-xs text-gray-600">
                Status: <span className="font-medium">{orderDetails?.paymentInfo?.status}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopOrderDetailPage;