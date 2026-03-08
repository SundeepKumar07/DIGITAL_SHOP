import { useRef } from "react";
import { CgProfile } from "react-icons/cg";
import { useDispatch, useSelector } from 'react-redux';
import { BACKEND_URL } from "../../../server";
import { AiOutlineArrowRight, AiOutlineCamera, AiOutlineClose, AiOutlineDelete, AiOutlinePlus } from "react-icons/ai";
import { MdOutlineTrackChanges } from 'react-icons/md'
import styles from "../../styles/styles";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import { AddAdress, deleteAddress, loadUser, updateUserAvatar, updateUserInfo } from "../../redux/actions/userActions";
import { toast } from "react-toastify";
import { clearError, clearUpdateSuccess } from "../../redux/slices/userSlice";
import { Country, State, City } from "country-state-city";

const ProfileContent = ({ active }) => {
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector(state => state.user);
  const { updateSuccess, error } = useSelector((state) => state.user);


  //=================== update profile data
  const [name, setName] = useState(`${user ? user.name : ''}`)
  const [email, setEmail] = useState(`${user ? user.email : ''}`)
  const [phoneNumber, setPhoneNumber] = useState(user ? user?.phoneNumber || "" : "");
  const [currentPassword, setCurrentPassword] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUserInfo({
      name,
      email,
      phoneNumber,
      currentPassword
    }));
  }
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
    if (updateSuccess) {
      toast.success("Profile updated successfully");
      dispatch(clearUpdateSuccess());
      dispatch(loadUser());
    }
  }, [updateSuccess, error]);

  //============== updateing profile pic ==================
  const handleCameraClick = () => {
    fileInputRef.current.click();
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    dispatch(updateUserAvatar(formData));
  };

  //============ returning body =============
  return (
    <div className='w-[90%] h-screen'>
      {
        active === 1 && (
          <div className='flex flex-col items-center w-full'>
            <div className="relative">

              {isAuthenticated ? (
                <img
                  src={`${BACKEND_URL}/${user.avatar.url}`}
                  alt="profile"
                  className="w-[150px] h-[150px] rounded-full object-cover border-[3px] border-[#3ed132]"
                />
              ) : (
                <CgProfile
                  size={30}
                  color="rgb(255 255 255 / 83%)"
                  className="w-[150px] h-[150px] rounded-full"
                />
              )}

              {/* Camera Icon */}
              <div
                onClick={handleCameraClick}
                className="w-[30px] h-[30px] bg-white rounded-full cursor-pointer items-center justify-center flex absolute bottom-1 right-1"
              >
                <AiOutlineCamera />
              </div>

              {/* Hidden File Input */}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
                accept="image/*"
                style={{ display: "none" }}
              />

            </div>
            <br />
            <br />
            <div className="w-full px-5">
              <form onSubmit={handleSubmit} aria-required={true}>
                <div className="w-full flex flex-col sm:flex-row pb-3 gap-2">
                  <div className="sm:w-[50%] w-full">
                    <label className="block pb-2">
                      Full name
                    </label>
                    <input
                      type="text"
                      className={`${styles.input} w-[95%] border-none bg-white`}
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="sm:w-[50%] w-full">
                    <label className="block pb-2">
                      Email Address
                    </label>
                    <input
                      type="text"
                      className={`${styles.input} w-[95%] border-none bg-white`}
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
                <div className="w-full flex flex-col sm:flex-row pb-3 gap-2">
                  <div className="sm:w-[50%] w-full">
                    <label className="block pb-2">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      className={`${styles.input} w-[95%] border-none bg-white`}
                      required
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      pattern="03[0-9]{2}[0-9]{7}"
                      title="Format: 03XXXXXXXXX"
                    />
                  </div>
                  <div className="sm:w-[50%] w-full">
                    <label className="block pb-2">
                      Enter Password
                    </label>
                    <input
                      type="text"
                      className={`${styles.input} w-[95%] border-none bg-white`}
                      required
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                    />
                  </div>
                </div>
                <input
                  type="submit"
                  value="Update"
                  className="w-[250px] h-[40px] text-center border border-blue-700 text-blue-600 mt-8 cursor-pointer"
                />
              </form>
            </div>
          </div>
        )
      }
      {
        active === 2 && (
          <div>
            <AllOrders />
          </div>
        )
      }
      {
        active === 3 && (
          <div>
            <AllRefundOrders />
          </div>
        )
      }
      {
        active === 5 && (
          <div>
            <TrackOrder />
          </div>
        )
      }
      {
        active === 6 && (
          <div>
            <PaymentMethod />
          </div>
        )
      }
      {
        active === 7 && (
          <div>
            <AllAddresses />
          </div>
        )
      }
    </div>
  )
}

const AllOrders = () => {

  const orders = [
    {
      _id: "122323112331232412",
      orderItems: [
        {
          name: "iphone 17 pro max 4 bg ram and 64 gb storage",
        },
      ],
      totalPrice: 120,
      orderStatus: "Processijng",
    }
  ]
  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) => {
        return params.row.status === "Delivered"
          ? "greenColor"
          : "redColor";
      }
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },

    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },

    {
      field: "action",
      flex: 1,
      minWidth: 150,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/user/order/${params.id}`}>
              <Button>
                <AiOutlineArrowRight size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];

  const row = [];

  orders && orders.forEach((item) => {
    row.push({
      id: item._id,
      itemsQty: item.orderItems.length,
      total: "US$ " + item.totalPrice,
      status: item.orderStatus,
    });
  });

  return (
    <div className="pl-8 pt-2">
      <DataGrid
        rows={row}
        columns={columns}
        pageSize={10}
        disableRowSelectionOnClick
        autoHeight
      />
    </div>
  )
}

const AllRefundOrders = () => {
  const orders = [
    {
      _id: "122323112331232412",
      orderItems: [
        {
          name: "iphone 17 pro max 4 bg ram and 64 gb storage",
        },
      ],
      totalPrice: 120,
      orderStatus: "Processijng",
    }
  ]
  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) => {
        return params.row.status === "Delivered"
          ? "greenColor"
          : "redColor";
      }
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },

    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },

    {
      field: "action",
      flex: 1,
      minWidth: 150,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/user/order/${params.id}`}>
              <Button>
                <AiOutlineArrowRight size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];

  const row = [];

  orders && orders.forEach((item) => {
    row.push({
      id: item._id,
      itemsQty: item.orderItems.length,
      total: "US$ " + item.totalPrice,
      status: item.orderStatus,
    });
  });
  return (
    <div className="pl-8 pt-2">
      <DataGrid
        rows={row}
        columns={columns}
        pageSize={10}
        disableRowSelectionOnClick
        autoHeight
      />
    </div>
  )
}

const TrackOrder = () => {
  const orders = [
    {
      _id: "122323112331232412",
      orderItems: [
        {
          name: "iphone 17 pro max 4 bg ram and 64 gb storage",
        },
      ],
      totalPrice: 120,
      orderStatus: "Processijng",
    }
  ]

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) => {
        return params.row.status === "Delivered"
          ? "greenColor"
          : "redColor";
      }
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },

    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },

    {
      field: "action",
      flex: 1,
      minWidth: 150,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/user/order/${params.id}`}>
              <Button>
                <MdOutlineTrackChanges size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];
  const row = [];

  orders && orders.forEach((item) => {
    row.push({
      id: item._id,
      itemsQty: item.orderItems.length,
      total: "US$ " + item.totalPrice,
      status: item.orderStatus,
    });
  });
  return (
    <div className="pl-8 pt-2">
      <DataGrid
        rows={row}
        columns={columns}
        pageSize={10}
        disableRowSelectionOnClick
        autoHeight
      />
    </div>
  )
}

const PaymentMethod = () => {
  return (
    <div className="w-full px-5">
      <div className="flex w-full justify-between items-center">
        <h1 className="text-[25px] text-black font-[600] pb-2">
          Payment Method
        </h1>
        <div className={`${styles.button} rounded-md`}>
          <span className="text-white">
            Add Now
          </span>
        </div>
      </div>
      <br />
      <div className="w-full bg-white h-[70px] rounded-[4px] flex items-center justify-between px-3 shadow pr-10">
        <div class="flex items-center">
          <img src="https://logowik.com/content/uploads/images/visa-payment-card1873.jpg" alt="" className="w-8" />
          <h6 className="pl-5 font-[600]">Shahriar Sajeel</h6>
        </div>
        <div className="pl-8 flex items-center">
          <h6>************1234</h6>
          <h5 className="pl-6">08/2025</h5>
        </div>
        <div className="min-w-[10%] flex justify-between items-center pl-8">
          <AiOutlineDelete size={25} className="cursor-pointer" />
        </div>
      </div>
    </div>
  )
}

const AllAddresses = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const addresses = user.addresses;
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    addressType: "",
    address1: "",
    address2: "",
    city: "",
    country: "",
    zipCode: "",
  });

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddAddress = () => {
    dispatch(AddAdress(form));
    setForm({
      addressType: "",
      address1: "",
      address2: "",
      city: "",
      country: "",
      zipCode: "",
    });
    setOpen(false);
  };

  const handleDelete = (index) => {
    dispatch(deleteAddress(index));
  };

  return (
    <div className="w-full px-5 py-5">
      <div className="flex w-full justify-between items-center mb-5">
        <h1 className="text-[25px] text-black font-[600] pb-2">My Addresses</h1>
        <button
          className={`${styles.button} rounded-md flex items-center gap-2`}
          onClick={() => setOpen(true)}
        >
          <AiOutlinePlus /> <span>Add Now</span>
        </button>
      </div>

      <div className="flex flex-col gap-3">
        {addresses && addresses.map((addr, idx) => (
          <div
            key={idx}
            className="w-full bg-white h-auto min-h-[70px] rounded-[4px] flex flex-col md:flex-row items-start md:items-center justify-between px-3 py-3 shadow pr-10"
          >
            <div className="flex items-center min-w-[12%]">
              <h6 className="pl-2 font-[600]">{addr.addressType}</h6>
            </div>
            <div className="pl-4 flex-1 flex flex-col md:flex-row gap-2 md:gap-8">
              <h6>{addr.address1}, {addr.address2}</h6>
              <h6>{addr.city}, {addr.country}</h6>
              <h6>ZIP: {addr.zipCode}</h6>
              <h6>{addr.phone}</h6>
            </div>
            <div className="min-w-[10%] flex justify-between items-center pl-8">
              <AiOutlineDelete
                size={25}
                className="cursor-pointer text-red-500 hover:text-red-700 transition"
                onClick={() => handleDelete(idx)}
              />
            </div>
          </div>
        ))}
      </div>

      {open && (
        <div className="fixed inset-0 bg-black/45 flex items-center justify-center z-50">
          <div className="bg-white w-[95%] md:w-[500px] rounded-md shadow-lg p-5 relative">
            <AiOutlineClose
              className="absolute top-3 right-3 text-gray-600 cursor-pointer"
              size={25}
              onClick={() => setOpen(false)}
            />
            <h2 className="text-xl font-semibold mb-4">Add New Address</h2>
            <div className="flex flex-col gap-3">
              <input
                type="text"
                name="addressType"
                value={form.addressType}
                onChange={handleInputChange}
                placeholder="Address Type"
                className={`${styles.input} border p-2 rounded-md w-full`}
              />
              <input
                type="text"
                name="address1"
                value={form.address1}
                onChange={handleInputChange}
                placeholder="Address Line 1"
                className={`${styles.input} border p-2 rounded-md w-full`}
              />
              <input
                type="text"
                name="address2"
                value={form.address2}
                onChange={handleInputChange}
                placeholder="Address Line 2"
                className={`${styles.input} border p-2 rounded-md w-full`}
              />

              {/* Country Dropdown */}
              <select
                name="country"
                value={form.country}
                onChange={handleInputChange}
                className={`${styles.input} border p-2 rounded-md w-full`}
              >
                <option value="">Select Country</option>
                {Country.getAllCountries().map((c) => (
                  <option key={c.isoCode} value={c.isoCode}>
                    {c.name}
                  </option>
                ))}
              </select>

              {/* State Dropdown */}
              <select
                name="state"
                value={form.state}
                onChange={handleInputChange}
                className={`${styles.input} border p-2 rounded-md w-full`}
                disabled={!form.country}
              >
                <option value="">Select State</option>
                {form.country &&
                  State.getStatesOfCountry(form.country).map((s) => (
                    <option key={s.isoCode} value={s.isoCode}>
                      {s.name}
                    </option>
                  ))}
              </select>

              {/* City Dropdown */}
              <select
                name="city"
                value={form.city}
                onChange={handleInputChange}
                className={`${styles.input} border p-2 rounded-md w-full`}
                disabled={!form.state}
              >
                <option value="">Select City</option>
                {form.state &&
                  City.getCitiesOfState(form.country, form.state).map((city) => (
                    <option key={city.name} value={city.name}>
                      {city.name}
                    </option>
                  ))}
              </select>

              <input
                type="text"
                name="zipCode"
                value={form.zipCode}
                onChange={handleInputChange}
                placeholder="ZIP Code"
                className={`${styles.input} border p-2 rounded-md w-full`}
              />

              <button
                className={`${styles.button} w-full mt-2`}
                onClick={handleAddAddress}
              >
                Add Address
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileContent