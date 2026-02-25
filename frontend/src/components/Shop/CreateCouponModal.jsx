import { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { clearCreateCoupon } from "../../redux/slices/couponSlice";
import { createCouponCode } from "../../redux/actions/couponAction";

const CreateCouponModal = ({ setOpen }) => {
  const dispatch = useDispatch();
  const { seller } = useSelector((state) => state.seller);
  const { coupon, createCouponLoading, createCouponsuccess, createCouponError, } = useSelector((state) => state.couponCode);

  const [formData, setFormData] = useState({
    name: "",
    value: "",
    minAmount: "",
    maxAmount: "",
  });

  // ================= Handle Change =================
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ================= Handle Submit =================
  const handleSubmit = (e) => {
  e.preventDefault();

  const { name, value, minAmount, maxAmount } = formData;

  if (!name || !value || !minAmount || !maxAmount) {
    return toast.error("Please fill all fields");
  }

  if (+minAmount >= +maxAmount) {
    return toast.error("Min amount must be less than Max amount");
  }

  if (+value <= 0 || +value > 100) {
    return toast.error("Value must be between 1 and 100");
  }

  dispatch(createCouponCode(formData));
};

  useEffect(() => {
    if (createCouponError) {
      toast.error(createCouponError);
    }
    if (createCouponsuccess) {
      dispatch(clearCreateCoupon());
      setOpen(false);
      toast.success("Coupon code created successfully");
    }
  }, [dispatch, createCouponError, createCouponsuccess]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      {/* Modal Container */}
      <div className="relative w-[95%] sm:w-[500px] bg-white rounded-2xl shadow-2xl p-6 animate-fadeIn">

        {/* Close Button */}
        <div className="absolute right-4 top-4 cursor-pointer text-gray-500 hover:text-red-500 transition">
          <RxCross2 size={24} onClick={() => setOpen(false)} />
        </div>

        {/* Title */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Create Coupon Code
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Coupon Name */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Coupon Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="NEWYEAR2026"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Value */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Discount Value (%)
            </label>
            <input
              type="number"
              name="value"
              placeholder="10"
              value={formData.value}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Min Amount */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Minimum Amount
            </label>
            <input
              type="number"
              name="minAmount"
              placeholder="100"
              value={formData.minAmount}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Max Amount */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Maximum Amount
            </label>
            <input
              type="number"
              name="maxAmount"
              placeholder="1000"
              value={formData.maxAmount}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={createCouponLoading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            {createCouponLoading ? "Creating..." : "Create Coupon"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateCouponModal;