import { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import { Country, State, City } from "country-state-city";
import { toast } from "react-toastify";
import { CgProfile } from "react-icons/cg";
import { AiOutlineArrowRight, AiOutlineCamera, AiOutlineClose, AiOutlineDelete, AiOutlinePlus } from "react-icons/ai";
import { MdOutlineTrackChanges } from 'react-icons/md';

import { BACKEND_URL } from "../../../server";
import styles from "../../styles/styles";
import { AddAdress, deleteAddress, loadUser, updateUserAvatar, updateUserInfo } from "../../redux/actions/userActions";
import { clearError, clearUpdateSuccess } from "../../redux/slices/userSlice";
import { getUserOrders } from "../../redux/actions/orderAction";

const ProfileContent = ({ active }) => {
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();
  const { isAuthenticated, user, updateSuccess, error } = useSelector(state => state.user);
  const { userOrders, getUserOrdersLoading } = useSelector(state => state.order);

  // Update profile states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');

  // Fetch real user orders when component mounts
  useEffect(() => {
    dispatch(getUserOrders());
  }, [dispatch]);

  // Sync state when user profile asynchronous data resolves
  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setEmail(user.email || '');
      setPhoneNumber(user.phoneNumber || '');
    }
  }, [user]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
    if (updateSuccess) {
      toast.success("Profile updated successfully");
      dispatch(clearUpdateSuccess());
      dispatch(loadUser());
      setCurrentPassword('');
    }
  }, [updateSuccess, error, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUserInfo({ name, email, phoneNumber, currentPassword }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    dispatch(updateUserAvatar(formData));
  };

  return (
    <div className='w-full min-h-screen px-2 sm:px-6 pt-4'>
      {active === 1 && (
        <div className='flex flex-col items-center w-full'>
          <div className="relative group">
            {isAuthenticated && user?.avatar?.url ? (
              <img
                src={`${BACKEND_URL}/${user.avatar.url}`}
                alt="profile"
                className="w-[110px] h-[110px] sm:w-[140px] sm:h-[140px] rounded-full object-cover border-[3px] border-emerald-500 shadow-md"
              />
            ) : (
              <CgProfile size={110} className="text-gray-300 rounded-full" />
            )}

            <div
              onClick={() => fileInputRef.current.click()}
              className="w-[32px] h-[32px] bg-white text-gray-700 hover:bg-gray-100 rounded-full cursor-pointer flex items-center justify-center absolute bottom-0 right-0 shadow-md border border-gray-200 transition"
            >
              <AiOutlineCamera size={18} />
            </div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageChange}
              accept="image/*"
              className="hidden"
            />
          </div>

          <form onSubmit={handleSubmit} className="w-full max-w-[800px] mt-6 sm:mt-10 flex flex-col gap-4 sm:gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <label className="block text-gray-700 font-medium pb-1 sm:pb-2 text-sm sm:text-base">Full Name</label>
                <input
                  type="text"
                  className={`${styles.input} w-full border border-gray-300 rounded-md p-2 bg-white focus:ring-2 focus:ring-blue-500 text-sm sm:text-base`}
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium pb-1 sm:pb-2 text-sm sm:text-base">Email Address</label>
                <input
                  type="email"
                  className={`${styles.input} w-full border border-gray-300 rounded-md p-2 bg-white focus:ring-2 focus:ring-blue-500 text-sm sm:text-base`}
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium pb-1 sm:pb-2 text-sm sm:text-base">Phone Number</label>
                <input
                  type="tel"
                  className={`${styles.input} w-full border border-gray-300 rounded-md p-2 bg-white focus:ring-2 focus:ring-blue-500 text-sm sm:text-base`}
                  required
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  pattern="03[0-9]{9}"
                  title="Format: 03XXXXXXXXX"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium pb-1 sm:pb-2 text-sm sm:text-base">Confirm Current Password</label>
                <input
                  type="password"
                  className={`${styles.input} w-full border border-gray-300 rounded-md p-2 bg-white focus:ring-2 focus:ring-blue-500 text-sm sm:text-base`}
                  required
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
              </div>
            </div>
            
            <button
              type="submit"
              className="w-full sm:w-[200px] h-[45px] border border-blue-600 text-blue-600 font-semibold rounded-md hover:bg-blue-50 transition self-center md:self-start mt-2 sm:mt-4"
            >
              Update Profile
            </button>
          </form>
        </div>
      )}

      {active === 2 && <AllOrders orders={userOrders} loading={getUserOrdersLoading} />}
      {active === 3 && <AllRefundOrders orders={userOrders} loading={getUserOrdersLoading} />}
      {active === 5 && <TrackOrder orders={userOrders} loading={getUserOrdersLoading} />}
      {active === 6 && <PaymentMethod />}
      {active === 7 && <AllAddresses />}
    </div>
  );
};

// Reusable configurations for DataGrid orders
const baseColumns = [
  { field: "id", headerName: "Order ID", minWidth: 120, flex: 0.7 },
  {
    field: "status",
    headerName: "Status",
    minWidth: 110,
    flex: 0.7,
    cellClassName: (params) => {
      if (params.value === "Delivered") return "text-green-600 font-semibold";
      if (params.value === "Refunded" || params.value === "Cancelled") return "text-red-600 font-semibold";
      return "text-amber-600 font-semibold";
    }
  },
  { field: "itemsQty", headerName: "Items Qty", type: "number", minWidth: 100, flex: 0.6 },
  { field: "total", headerName: "Total", type: "number", minWidth: 110, flex: 0.8 },
];

const AllOrders = ({ orders = [], loading }) => {
  const columns = [
    ...baseColumns,
    {
      field: "action",
      flex: 0.5,
      minWidth: 80,
      headerName: "Action",
      sortable: false,
      renderCell: (params) => (
        <Link to={`/user/order/${params.id}`}>
          <Button><AiOutlineArrowRight size={18} /></Button>
        </Link>
      ),
    },
  ];

  const rows = orders.map((item) => ({
    id: item._id,
    itemsQty: item.cart?.length || 0,
    total: "US$ " + (item.pricing?.total ?? item.totalPrice ?? 0),
    status: item.status || "Processing",
  }));

  return (
    <div className="w-full overflow-x-auto">
      <h2 className="text-lg sm:text-xl font-semibold mb-4">All Orders</h2>
      <div className="min-w-[600px]">
        <DataGrid 
          rows={rows} 
          columns={columns} 
          autoHeight 
          loading={loading}
          disableRowSelectionOnClick 
        />
      </div>
    </div>
  );
};

const AllRefundOrders = ({ orders = [], loading }) => {
  const columns = [
    ...baseColumns,
    {
      field: "action",
      flex: 0.5,
      minWidth: 80,
      headerName: "Action",
      sortable: false,
      renderCell: (params) => (
        <Link to={`/user/order/${params.id}`}>
          <Button><AiOutlineArrowRight size={18} /></Button>
        </Link>
      ),
    },
  ];

  const refundOrders = orders.filter(
    (item) => item.status === "Processing Refund" || item.status === "Refund Success" || item.paymentInfo?.status === "Refunded"
  );

  const rows = refundOrders.map((item) => ({
    id: item._id,
    itemsQty: item.cart?.length || 0,
    total: "US$ " + (item.pricing?.total ?? item.totalPrice ?? 0),
    status: item.status || "Refund Processing",
  }));

  return (
    <div className="w-full overflow-x-auto">
      <h2 className="text-lg sm:text-xl font-semibold mb-4">Refund Orders</h2>
      <div className="min-w-[600px]">
        <DataGrid 
          rows={rows} 
          columns={columns} 
          autoHeight 
          loading={loading}
          disableRowSelectionOnClick 
        />
      </div>
    </div>
  );
};

const TrackOrder = ({ orders = [], loading }) => {
  // Filter out terminal or inactive statuses (e.g. Cancelled, Refunded, Delivered)
  const activeTrackableOrders = orders.filter(
    (item) => item.status !== "Cancelled" && item.status !== "Refunded"
  );

  const columns = [
    ...baseColumns,
    {
      field: "action",
      flex: 0.5,
      minWidth: 80,
      headerName: "Track",
      sortable: false,
      renderCell: (params) => (
        <Link to={`/user/order/track/${params.id}`}>
          <Button><MdOutlineTrackChanges size={18} /></Button>
        </Link>
      ),
    },
  ];

  const rows = activeTrackableOrders.map((item) => ({
    id: item._id,
    itemsQty: item.cart?.length || 0,
    total: "US$ " + (item.pricing?.total ?? item.totalPrice ?? 0),
    status: item.status || "Processing",
  }));

  return (
    <div className="w-full overflow-x-auto">
      <h2 className="text-lg sm:text-xl font-semibold mb-4">Track Order</h2>
      <div className="min-w-[600px]">
        <DataGrid 
          rows={rows} 
          columns={columns} 
          autoHeight 
          loading={loading}
          disableRowSelectionOnClick 
        />
      </div>
    </div>
  );
};

const PaymentMethod = () => {
  return (
    <div className="w-full">
      <div className="flex w-full justify-between items-center mb-6">
        <h1 className="text-xl sm:text-2xl text-gray-800 font-semibold">Payment Methods</h1>
        <button className="bg-gray-900 text-white text-sm sm:text-base px-3 py-1.5 sm:px-4 sm:py-2 rounded-md hover:bg-gray-800 transition">
          Add Now
        </button>
      </div>
      <div className="w-full bg-white rounded-md flex flex-wrap sm:flex-nowrap items-center justify-between p-4 shadow-sm border border-gray-100 gap-4">
        <div className="flex items-center gap-3">
          <img src="https://logowik.com/content/uploads/images/visa-payment-card1873.jpg" alt="Visa" className="w-10 sm:w-12 object-contain" />
          <h6 className="font-semibold text-gray-800 text-sm sm:text-base">Shahriar Sajeel</h6>
        </div>
        <div className="flex items-center gap-4 sm:gap-6 text-sm sm:text-base">
          <h6 className="text-gray-600 tracking-wider">************1234</h6>
          <h5 className="text-gray-500">08/2025</h5>
        </div>
        <button className="text-red-500 hover:text-red-700 transition p-1 ml-auto sm:ml-0">
          <AiOutlineDelete size={20} />
        </button>
      </div>
    </div>
  );
};

const AllAddresses = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const addresses = user?.addresses || [];
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    addressType: "",
    address1: "",
    address2: "",
    country: "",
    state: "",
    city: "",
    zipCode: "",
  });

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddAddress = () => {
    dispatch(AddAdress(form));
    setForm({ addressType: "", address1: "", address2: "", country: "", state: "", city: "", zipCode: "" });
    setOpen(false);
  };

  return (
    <div className="w-full">
      <div className="flex w-full justify-between items-center mb-6">
        <h1 className="text-xl sm:text-2xl text-gray-800 font-semibold">My Addresses</h1>
        <button
          className="bg-gray-900 text-white text-xs sm:text-base px-3 py-2 sm:px-4 sm:py-2 rounded-md flex items-center gap-1 sm:gap-2 hover:bg-gray-800 transition"
          onClick={() => setOpen(true)}
        >
          <AiOutlinePlus /> <span>Add Address</span>
        </button>
      </div>

      <div className="flex flex-col gap-4">
        {addresses.map((addr, idx) => (
          <div key={idx} className="w-full bg-white rounded-md flex flex-col md:flex-row items-start md:items-center justify-between p-4 shadow-sm border border-gray-100 gap-3 md:gap-4">
            <div className="min-w-[80px]">
              <span className="bg-gray-100 text-gray-800 text-[10px] sm:text-xs px-2 py-1 rounded font-semibold tracking-wide uppercase">
                {addr.addressType}
              </span>
            </div>
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-1 sm:gap-2 text-xs sm:text-sm text-gray-600 w-full">
              <p className="font-medium text-gray-800">{addr.address1} {addr.address2}</p>
              <p>{addr.city}, {addr.country}</p>
              <p>ZIP: {addr.zipCode}</p>
              <p>{addr.phone}</p>
            </div>
            <button 
              onClick={() => dispatch(deleteAddress(idx))}
              className="text-red-500 hover:text-red-700 transition self-end md:self-center"
            >
              <AiOutlineDelete size={20} />
            </button>
          </div>
        ))}
      </div>

      {open && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-3 sm:p-4">
          <div className="bg-white w-full max-w-md max-h-[90vh] overflow-y-auto rounded-lg shadow-xl p-5 sm:p-6 relative animate-fadeIn">
            <AiOutlineClose
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 cursor-pointer transition"
              size={20}
              onClick={() => setOpen(false)}
            />
            <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-4">Add New Address</h2>
            <div className="flex flex-col gap-3 sm:gap-4 text-sm">
              <input type="text" name="addressType" value={form.addressType} onChange={handleInputChange} placeholder="Address Type (e.g. Home, Work)" className="border p-2 sm:p-2.5 rounded-md w-full focus:ring-2 focus:ring-blue-500 outline-none" />
              <input type="text" name="address1" value={form.address1} onChange={handleInputChange} placeholder="Address Line 1" className="border p-2 sm:p-2.5 rounded-md w-full focus:ring-2 focus:ring-blue-500 outline-none" />
              <input type="text" name="address2" value={form.address2} onChange={handleInputChange} placeholder="Address Line 2" className="border p-2 sm:p-2.5 rounded-md w-full focus:ring-2 focus:ring-blue-500 outline-none" />

              <select name="country" value={form.country} onChange={handleInputChange} className="border p-2 sm:p-2.5 rounded-md w-full bg-white focus:ring-2 focus:ring-blue-500 outline-none">
                <option value="">Select Country</option>
                {Country.getAllCountries().map((c) => <option key={c.isoCode} value={c.isoCode}>{c.name}</option>)}
              </select>

              <select name="state" value={form.state} onChange={handleInputChange} disabled={!form.country} className="border p-2 sm:p-2.5 rounded-md w-full bg-white focus:ring-2 focus:ring-blue-500 outline-none disabled:bg-gray-50">
                <option value="">Select State</option>
                {form.country && State.getStatesOfCountry(form.country).map((s) => <option key={s.isoCode} value={s.isoCode}>{s.name}</option>)}
              </select>

              <select name="city" value={form.city} onChange={handleInputChange} disabled={!form.state} className="border p-2 sm:p-2.5 rounded-md w-full bg-white focus:ring-2 focus:ring-blue-500 outline-none disabled:bg-gray-50">
                <option value="">Select City</option>
                {form.state && City.getCitiesOfState(form.country, form.state).map((city) => <option key={city.name} value={city.name}>{city.name}</option>)}
              </select>

              <input type="text" name="zipCode" value={form.zipCode} onChange={handleInputChange} placeholder="ZIP Code" className="border p-2 sm:p-2.5 rounded-md w-full focus:ring-2 focus:ring-blue-500 outline-none" />

              <button onClick={handleAddAddress} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium p-2.5 rounded-md transition mt-2 shadow-sm">
                Save Address
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileContent;