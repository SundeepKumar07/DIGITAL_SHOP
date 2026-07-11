import { useState } from "react";
import { Country, State, City } from "country-state-city";
import { FiMapPin, FiShoppingCart } from "react-icons/fi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { server } from "../../../server";
import { toast } from "react-toastify";

const Checkout = () => {
  const navigate = useNavigate();
  const { user } = useSelector(state => state.user);
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phoneNumber || "",
    zipCode: "",
    country: "",
    state: "",
    city: "",
    address1: "",
    address2: "",
    coupon: "",
  });

  //================= cart component =================
  const cartItems = useSelector((state) => state.cart?.cartItems || []);

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.discountPrice * item.qty,
    0
  );
  const shipping = Math.floor(totalPrice * 0.01);
  const discountPercentage = formData.coupon ? (totalPrice * formData.coupon.value) / 100 : '';
  const discountAmount = appliedCoupon
    ? (totalPrice * appliedCoupon.value) / 100
    : 0;

  const finalPrice = totalPrice + shipping - discountAmount;

  //================= form submission / payment ================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const orderData = {
      shippingAddress: {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address1: formData.address1,
        address2: formData.address2,
        country: formData.country,
        state: formData.state,
        city: formData.city,
        zipCode: formData.zipCode,
      },
      cartItems,
      pricing: {
        subtotal: totalPrice,
        shipping,
        discount: discountAmount,
        total: finalPrice,
      },
      coupon: appliedCoupon || null,
    };

    localStorage.setItem("latestOrder", JSON.stringify(orderData));

    navigate("/payment");
  };

  //================== address component ===============
  const [selectedAddressIndex, setSelectedAddressIndex] = useState(null);
  const ChooseAddress = () => {
    const handleAddressSelect = (selectedIndex) => {
      if (selectedAddressIndex === selectedIndex) {
        setSelectedAddressIndex(null);
        setFormData({
          ...formData,
          country: '',
          state: '',
          city: '',
          zipCode: '',
          address1: '',
          address2: ''
        });

        return;
      }

      setSelectedAddressIndex(selectedIndex);

      const selectedAddress = user.addresses[selectedIndex];

      const countryCode = selectedAddress.country;
      const cityName = selectedAddress.city;

      const states = State.getStatesOfCountry(countryCode);

      let detectedState = "";

      for (let state of states) {
        const cities = City.getCitiesOfState(countryCode, state.isoCode);

        const found = cities.find(c => c.name === cityName);

        if (found) {
          detectedState = state.isoCode;
          break;
        }
      }

      setFormData({
        ...formData,
        country: countryCode,
        state: detectedState,
        city: cityName,
        zipCode: selectedAddress.zipCode,
        address1: selectedAddress.address1,
        address2: selectedAddress.address2
      });
    };

    return (
      <div className="mt-2 flex flex-col gap-2">
        {user?.addresses.map((item, index) => (
          <label key={index} className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              name="address"
              checked={selectedAddressIndex === index}
              onChange={() => handleAddressSelect(index)}
            />
            <span>
              {item.addressType} - {item.address1}
            </span>
          </label>
        ))}
      </div>
    );
  };
  return (
    <div className="w-full flex justify-center py-10 bg-gray-100">

      <div className="w-[90%] max-w-6xl grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* SHIPPING FORM */}
        <div className="lg:col-span-2 bg-white shadow-md rounded-xl p-6">

          <h2 className="flex items-center gap-2 text-xl font-semibold mb-6">
            <FiMapPin />
            Shipping Address
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* NAME + EMAIL */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <input
                type="text"
                name="name"
                required
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                className="input"
              />

              <input
                type="email"
                name="email"
                required
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                className="input"
              />

            </div>

            {/* PHONE + ZIP */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <input
                type="text"
                name="phone"
                required
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                className="input"
              />

              <input
                type="text"
                name="zipCode"
                required
                placeholder="Zip Code"
                disabled={selectedAddressIndex === null ? false : true}
                value={formData.zipCode}
                onChange={handleChange}
                className={`input ${selectedAddressIndex !== null && 'bg-gray-100'}`}
              />

            </div>

            {/* COUNTRY + CITY */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <select
                name="country"
                value={formData.country}
                required
                onChange={handleChange}
                disabled={selectedAddressIndex === null ? false : true}
                className={`input ${selectedAddressIndex !== null && 'bg-gray-100'}`}
              >
                <option value="">Select Country</option>

                {Country.getAllCountries().map((item, i) => (
                  <option key={i} value={item.isoCode}>
                    {item.name}
                  </option>
                ))}

              </select>

              <select
                name="state"
                value={formData.state}
                required
                onChange={handleChange}
                disabled={selectedAddressIndex === null ? false : true}
                className={`input ${selectedAddressIndex !== null && 'bg-gray-100'}`}
              >
                <option value="">Select State</option>

                {State.getStatesOfCountry(formData.country).map((item, i) => (
                  <option key={i} value={item.isoCode}>
                    {item.name}
                  </option>
                ))}

              </select>
              <select
                name="city"
                value={formData.city}
                required
                onChange={handleChange}
                disabled={selectedAddressIndex === null ? false : true}
                className={`input ${selectedAddressIndex !== null && 'bg-gray-100'}`}
              >
                <option value="">Select City</option>

                {City.getCitiesOfState(formData.country, formData.state).map((item, i) => (
                  <option key={i} value={item.name}>
                    {item.name}
                  </option>
                ))}

              </select>

            </div>

            {/* ADDRESS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <input
                type="text"
                name="address1"
                required
                placeholder="Address Line 1"
                value={formData.address1}
                disabled={selectedAddressIndex === null ? false : true}
                onChange={handleChange}
                className={`input ${selectedAddressIndex !== null && 'bg-gray-100'}`}
              />

              <input
                type="text"
                name="address2"
                placeholder="Address Line 2"
                value={formData.address2}
                disabled={selectedAddressIndex === null ? false : true}
                onChange={handleChange}
                className={`input ${selectedAddressIndex !== null && 'bg-gray-100'}`}
              />

            </div>

            {/* choose from default address  */}
            <div>
              <h5>Choose from saved address</h5>
              {
                user && (
                  <div>
                    {
                      user && user?.addresses && <div className="w-full flex mt-1">
                        <ChooseAddress />
                      </div>
                    }
                  </div>
                )
              }
            </div>
            {/* BUTTON */}
            <button
              type="submit"
              className="w-full h-12 bg-black text-white rounded-lg font-semibold hover:bg-gray-900 transition"
            >
              Continue to Payment
            </button>
          </form>
        </div>

        <ReviewOrder
          formData={formData}
          handleChange={handleChange}
          shipping={shipping}
          subTotalPrice={totalPrice}
          discountAmount={discountAmount}
          finalPrice={finalPrice}
          setAppliedCoupon={setAppliedCoupon}
        />
      </div>

      {/* Tailwind reusable input style */}
      <style>{`
        .input {
          width: 100%;
          height: 44px;
          border: 1px solid #d1d5db;
          border-radius: 8px;
          padding: 0 12px;
          outline: none;
          transition: all 0.2s;
        }

        .input:focus {
          border-color: black;
          box-shadow: 0 0 0 2px rgba(0,0,0,0.05);
        }
      `}</style>

    </div>
  );
};


const ReviewOrder = ({
  formData,
  handleChange,
  shipping,
  subTotalPrice,
  discountAmount,
  finalPrice,
  setAppliedCoupon
}) => {

  const cartItems = useSelector((state) => state.cart?.cartItems || []);

  const HandleApplyCouponCode = async (e) => {
    e.preventDefault();

    try {
      if (!formData.coupon) {
        return toast.error("Enter coupon code");
      }

      const productId = cartItems[0]?._id; // adjust if needed

      const { data } = await axios.get(`${server}/coupon-code/validate-coupon`, {
        params: {
          code: formData.coupon,
          productId,
          cartTotal: subTotalPrice,
        },
      });
      console.log(data);

      if (data.success) {
        setAppliedCoupon(data.coupon);
        toast.success("Coupon applied successfully");
      }

    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid coupon");
    }
  };

  return (
    <div>
      <div className="bg-white shadow-md rounded-xl p-6 h-fit sticky top-20">

        <h3 className="flex items-center gap-2 text-xl font-semibold mb-6">
          <FiShoppingCart />
          Order Summary
        </h3>

        <div className="space-y-3">

          <div className="flex justify-between text-gray-600">
            <span>Subtotal</span>
            <span>${subTotalPrice}</span>
          </div>

          <div className="flex justify-between text-gray-600">
            <span>Shipping</span>
            <span>${shipping}</span>
          </div>

          <div className="flex justify-between text-gray-600 border-b pb-3">
            <span>Discount</span>
            <span>${discountAmount}</span>
          </div>

          <div className="flex justify-between text-lg font-bold pt-3">
            <span>Total</span>
            <span>${finalPrice}</span>
          </div>

        </div>

        {/* COUPON */}
        <div className="mt-6">
          <form onSubmit={HandleApplyCouponCode} className="flex gap-2">
            <input
              type="text"
              name="coupon"
              placeholder="Coupon Code"
              value={formData.coupon}
              onChange={handleChange}
              className="input flex-1"
            />

            <button
              type="submit"
              className="px-4 bg-black text-white rounded-lg hover:bg-gray-800"
            >
              Apply
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default Checkout;