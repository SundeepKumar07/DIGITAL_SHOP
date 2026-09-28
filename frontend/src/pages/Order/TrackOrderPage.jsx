import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { 
  AiOutlineCheck, 
  AiOutlineCheckCircle, 
  AiOutlineClockCircle, 
  AiOutlineCar, 
  AiOutlineHome 
} from 'react-icons/ai';
import { toast } from 'react-toastify';
import { getOrderDetails } from '../../redux/actions/orderAction';
import { BACKEND_URL } from '../../../server';

// Progress steps configuration
const TRACKING_STEPS = [
  { statusKey: 'processing', label: 'Order Placed', icon: AiOutlineClockCircle },
  { statusKey: 'transiting', label: 'Processing & Transiting', icon: AiOutlineCheckCircle },
  { statusKey: 'shipped', label: 'On The Way', icon: AiOutlineCar },
  { statusKey: 'received', label: 'Out for Delivery', icon: AiOutlineCar },
  { statusKey: 'delivered', label: 'Delivered', icon: AiOutlineHome },
];

const TrackOrderPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { orderDetails, getOrderDetailsLoading, orderDetailsError } = useSelector(
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

  // Normalized matching supporting multiple status format variations from backend/seller panel
  const getStepIndex = (status) => {
    if (!status) return 0;
    const s = status.toLowerCase().trim();

    if (['processing', 'order placed'].includes(s)) return 0;
    if (['transferred to delivery partner', 'transiting', 'in transit'].includes(s)) return 1;
    if (['shipping', 'shipped', 'on the way'].includes(s)) return 2;
    if (['received', 'out for delivery'].includes(s)) return 3;
    if (['delivered'].includes(s)) return 4;

    return 0;
  };

  if (getOrderDetailsLoading || !orderDetails) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <div className="text-lg font-semibold text-gray-600 animate-pulse">
          Fetching tracking information...
        </div>
      </div>
    );
  }

  const currentStep = getStepIndex(orderDetails.status);

  return (
    <div className="w-full min-h-screen bg-gray-50 py-10 px-4 md:px-12">
      <div className="max-w-[1000px] mx-auto bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-10">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b pb-6 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Track Order</h1>
            <p className="text-xs text-gray-500 font-mono mt-1">Order ID: {orderDetails._id}</p>
          </div>
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-2 rounded-lg text-sm font-semibold">
            Status: {orderDetails.status || 'Processing'}
          </div>
        </div>

        {/* TRACKING TIMELINE */}
        <div className="py-10">
          <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center w-full gap-8 md:gap-0">
            {/* Background Line (Desktop) */}
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-gray-200 -translate-y-1/2 z-0" />
            
            {/* Active Progress Line (Desktop) */}
            <div 
              className="hidden md:block absolute top-1/2 left-0 h-1 bg-emerald-500 -translate-y-1/2 z-0 transition-all duration-500" 
              style={{ width: `${(currentStep / (TRACKING_STEPS.length - 1)) * 100}%` }}
            />

            {TRACKING_STEPS.map((step, idx) => {
              const isCompleted = idx <= currentStep;
              const isCurrent = idx === currentStep;
              const Icon = step.icon;

              return (
                <div key={idx} className="relative z-10 flex md:flex-col items-center gap-4 md:gap-2 w-full md:w-auto">
                  {/* Step Circle */}
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isCompleted
                        ? 'bg-emerald-500 text-white shadow-md shadow-emerald-200'
                        : 'bg-gray-100 text-gray-400 border border-gray-200'
                    } ${isCurrent ? 'ring-4 ring-emerald-100 scale-110' : ''}`}
                  >
                    {isCompleted && idx < currentStep ? (
                      <AiOutlineCheck size={20} />
                    ) : (
                      <Icon size={22} />
                    )}
                  </div>

                  {/* Step Label */}
                  <div className="text-left md:text-center">
                    <p className={`text-sm font-semibold ${isCompleted ? 'text-gray-800' : 'text-gray-400'}`}>
                      {step.label}
                    </p>
                    <p className="text-xs text-gray-400 capitalize">
                      {idx === currentStep ? orderDetails.status : step.statusKey}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ORDER SUMMARY PREVIEW */}
        <div className="border-t pt-6 mt-4">
          <h2 className="text-md font-semibold text-gray-800 mb-4">Package Contents</h2>
          <div className="space-y-3">
            {orderDetails.cart?.map((item, index) => {
              const product = item.product || {};
              const itemImage = product.images?.[0]?.url || product.images?.[0] || '';

              return (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg bg-gray-50/50">
                  <div className="flex items-center gap-3">
                    <img
                      src={itemImage ? `${BACKEND_URL}/${itemImage}` : 'https://via.placeholder.com/60'}
                      alt={item.nameAtPurchase || product.name}
                      className="w-12 h-12 object-cover rounded-md border"
                    />
                    <div>
                      <p className="text-sm font-medium text-gray-800">{item.nameAtPurchase || product.name}</p>
                      <p className="text-xs text-gray-500">Qty: {item.qty}</p>
                    </div>
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    US${((item.priceAtPurchase || 0) * (item.qty || 1)).toFixed(2)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* NAVIGATION BACK LINK */}
        <div className="mt-8 pt-4 border-t border-gray-100 flex justify-between items-center">
          <Link to="/profile" className="text-sm font-semibold text-blue-600 hover:text-blue-800 transition">
            ← Back to Orders
          </Link>
          <Link to={`/user/order/${orderDetails._id}`} className="text-sm font-semibold text-gray-600 hover:text-gray-900 transition">
            View Full Order Details →
          </Link>
        </div>

      </div>
    </div>
  );
};

export default TrackOrderPage;