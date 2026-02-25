import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { AiOutlineDelete, AiOutlineEye } from 'react-icons/ai';
import { DataGrid } from '@mui/x-data-grid';
import { toast } from 'react-toastify';
import styles from '../../styles/styles';
import CreateCouponModal from './CreateCouponModal';
import { deleteShopCoupon, getShopAllCoupons } from '../../redux/actions/couponAction';
import { clearDeleteState } from '../../redux/slices/couponSlice';

const AllCouponsCodes = () => {
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();
    const { getCouponsLoading, getCouponsSuccess, coupons, error, deleteLoading, deleteCouponSuccess, deleteError } = useSelector(state => state.couponCode);
    const { seller } = useSelector(state => state.seller);
    //============================ useEffects =========================
    useEffect(() => {
        if (seller && seller._id) {
            dispatch(getShopAllCoupons(seller._id));
        }
    }, [seller]);

    useEffect(() => {
        if (deleteCouponSuccess) {
            toast.success("Coupon code deleted successfully");
            dispatch(getShopAllCoupons(seller._id));
            dispatch(clearDeleteState());
        }

        if (deleteError) {
            toast.error(deleteError);
            dispatch(clearDeleteState());
        }
    }, [deleteCouponSuccess, deleteError, dispatch]);


    //============================ Handlers ==========================
    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            dispatch(deleteShopCoupon(id));
        }
    };

    //==================== Column and row setup =================
    const columns = [
  { field: "id", headerName: "Coupon ID", minWidth: 180, flex: 0.8 },

  {
    field: "name",
    headerName: "Coupon Code",
    minWidth: 150,
    flex: 1,
  },

  {
    field: "value",
    headerName: "Discount (%)",
    minWidth: 130,
    flex: 0.7,
  },

  {
    field: "minAmount",
    headerName: "Min Amount",
    minWidth: 130,
    flex: 0.7,
  },

  {
    field: "maxAmount",
    headerName: "Max Amount",
    minWidth: 130,
    flex: 0.7,
  },

  // 🗑 Delete
  {
    field: "delete",
    headerName: "Delete",
    sortable: false,
    minWidth: 100,
    flex: 0.5,
    renderCell: (params) => {
      return (
        <button
          onClick={() => handleDelete(params.row.id)}
          className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition duration-300"
        >
          <AiOutlineDelete size={18} />
        </button>
      );
    },
  },
];

    const row = coupons?.map((coupon) => ({
  id: coupon._id,
  name: coupon.name,
  value: coupon.value,
  minAmount: "US$ " + coupon.minAmount,
  maxAmount: "US$ " + coupon.maxAmount,
})) || [];

    //==================== return statements ===================
    return (
        <>
            {
                getCouponsLoading ? (
                    <div>
                        Loading...
                    </div>
                ) : (
                    <div className="w-full mx-4 sm:mx-8 mt-3 bg-white p-6 rounded-2xl shadow-md h-[75vh] overflow-y-scroll">
                        <div className="w-full flex justify-end" onClick={() => setOpen(true)}>
                            <div className={`${styles.button} !w-[170px] !rounded-[5px] !h-[40px] mr-3 mb-2`}>
                                <span>Create Coupon Code</span>
                            </div>
                        </div>
                        <DataGrid
                            rows={row}
                            columns={columns}
                            pageSize={10}
                            disableRowSelectionOnClick
                            autoHeight
                            sx={{
                                border: "none",

                                "& .MuiDataGrid-cell": {
                                    display: "flex",
                                    alignItems: "center",
                                    fontSize: "14px",
                                    color: "#374151",
                                },

                                "& .MuiDataGrid-columnHeaders": {
                                    backgroundColor: "#f9fafb",
                                    fontSize: "15px",
                                    fontWeight: "600",
                                    color: "#111827",
                                    borderBottom: "1px solid #e5e7eb",
                                },

                                "& .MuiDataGrid-row": {
                                    borderBottom: "1px solid #f1f1f1",
                                },

                                "& .MuiDataGrid-row:hover": {
                                    backgroundColor: "#f3f4f6",
                                },

                                "& .MuiDataGrid-footerContainer": {
                                    borderTop: "1px solid #e5e7eb",
                                    backgroundColor: "#fafafa",
                                },

                                "& .MuiDataGrid-columnSeparator": {
                                    display: "none",
                                },

                                "& .MuiDataGrid-cell:focus": {
                                    outline: "none",
                                },

                                "& .MuiDataGrid-columnHeader:focus": {
                                    outline: "none",
                                },
                            }}
                        />
                    </div>
                )
            }
            {open && <CreateCouponModal setOpen={setOpen} />}
        </>
    )
}

export default AllCouponsCodes