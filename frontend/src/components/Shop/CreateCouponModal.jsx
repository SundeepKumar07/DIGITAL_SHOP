import { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { clearCreateCoupon } from "../../redux/slices/couponSlice";
import { createCouponCode } from "../../redux/actions/couponAction";
import { getShopAllProducts } from "../../redux/actions/productAction";

const CreateCouponModal = ({ setOpen }) => {
  const dispatch = useDispatch();
  const { seller } = useSelector((state) => state.seller);
  const { coupon, createCouponLoading, createCouponsuccess, createCouponError, } = useSelector((state) => state.couponCode);
  const { products } = useSelector(state => state.product);
  const [formData, setFormData] = useState({
    name: "",
    value: "",
    minAmount: "",
    maxAmount: "",
    productId: "",
  });
  useEffect(() => {
    dispatch(getShopAllProducts(seller._id));
  }, [dispatch]);

  // ================= Handle Change =================
  const handleChange = (e) => {
    const { name, value } = e.target;

    const updatedData = {
      ...formData,
      [name]: value,
    };

    // calculate discount ONLY when both exist
    if (updatedData.minAmount && updatedData.maxAmount && updatedData.minAmount !== '') {
      updatedData.value = Math.floor(
        (updatedData.minAmount / updatedData.maxAmount) * 100
      );
    }

    setFormData(updatedData);
  };

  // ================= Handle Submit =================
  const handleSubmit = (e) => {
    e.preventDefault();

    const { name, value, minAmount, maxAmount, productId } = formData;

    if (!name || !value || !minAmount || !maxAmount || !productId) {
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
              disabled
              value={formData.value}
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Min Amount */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Discount Amount
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
              Original Amount
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

          {/* select product */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Select Product
            </label>

            <select
              name="productId"
              value={formData.productId}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="">Choose Product</option>

              {products?.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.name}
                </option>
              ))}
            </select>
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