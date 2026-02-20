import { CgProfile } from "react-icons/cg";
import { useSelector } from 'react-redux';
import { BACKEND_URL } from "../../../server";
import { AiOutlineArrowRight, AiOutlineCamera, AiOutlineDelete } from "react-icons/ai";
import { MdOutlineTrackChanges } from 'react-icons/md'
import styles from "../../styles/styles";
import { useState } from "react";
import { Link } from "react-router-dom";

import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';

const ProfileContent = ({ active }) => {
  const { isAuthenticated, user } = useSelector(state => state.user);
  const [name, setName] = useState(`${user ? user.name : ''}`)
  const [email, setEmail] = useState(`${user ? user.email : ''}`)
  const [phoneNo, setPhoneNo] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');


  const handleSubmit = (e) => {
    e.preventDefault();
  }
  return (
    <div className='w-[90%] h-screen'>
      {
        active === 1 && (
          <div className='flex flex-col items-center w-full'>
            <div className='relative'>
              {isAuthenticated ? (
                <img src={`${BACKEND_URL}/${user.avatar.url}`} alt="profile" className='w-[150px] h-[150px] rounded-full object-cover border-[3px] border-[#3ed132]' />
              ) : (
                <CgProfile
                  size={30}
                  color='rgb(255 2555 255/83%)'
                  className='w-[150px] h-[150px] rounded-full'
                />
              )
              }
              <div className="w-[30px] h-[30px] bg-white rounded-full cursor-pointer items-center justify-center flex absolute bottom-1 right-1">
                <AiOutlineCamera />
              </div>
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
                      value={phoneNo}
                      onChange={(e) => setPhoneNo(e.target.value)}
                    />
                  </div>
                  <div className="sm:w-[50%] w-full">
                    <label className="block pb-2">
                      Zip code
                    </label>
                    <input
                      type="text"
                      className={`${styles.input} w-[95%] border-none bg-white`}
                      required
                      value={zipCode}
                      onChange={(e) => setZipCode(e.target.value)}
                    />
                  </div>
                </div>
                <div className="w-full flex flex-col sm:flex-row pb-3 gap-2">
                  <div className="sm:w-[50%] w-full">
                    <label className="block pb-2">
                      Address 1
                    </label>
                    <input
                      type="text"
                      className={`${styles.input} w-[95%] border-none bg-white`}
                      required
                      value={address1}
                      onChange={(e) => setAddress1(e.target.value)}
                    />
                  </div>
                  <div className="sm:w-[50%] w-full">
                    <label className="block pb-2">
                      Address 2
                    </label>
                    <input
                      type="text"
                      className={`${styles.input} w-[95%] border-none bg-white`}
                      required
                      value={address2}
                      onChange={(e) => setAddress2(e.target.value)}
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
      <br/>
      <div className="w-full bg-white h-[70px] rounded-[4px] flex items-center justify-between px-3 shadow pr-10">
        <div class="flex items-center">
          <img src="https://logowik.com/content/uploads/images/visa-payment-card1873.jpg" alt="" className="w-8"/>
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
  return (
    <div className="w-full px-5">
      <div className="flex w-full justify-between items-center">
         <h1 className="text-[25px] text-black font-[600] pb-2">
          My Addresses
         </h1>
         <div className={`${styles.button} rounded-md`}>
          <span className="text-white">
            Add Now
          </span>
         </div>
      </div>
      <br/>
      <div className="w-full bg-white h-[70px] rounded-[4px] flex items-center justify-between px-3 shadow pr-10">
        <div class="flex items-center">
          <h6 className="pl-5 font-[600]">Default</h6>
        </div>
        <div className="pl-8 flex items-center">
          <h6>404, Erdaan Pasaage, New Zoietown, Paraguay</h6>
        </div>
        <div className="pl-8 flex items-center">
          <h6>0300 3385703</h6>
        </div>
        <div className="min-w-[10%] flex justify-between items-center pl-8">
          <AiOutlineDelete size={25} className="cursor-pointer" />
        </div>
      </div>
    </div>
  )
}

export default ProfileContent