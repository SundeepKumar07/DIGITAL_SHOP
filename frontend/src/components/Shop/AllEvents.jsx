import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { AiOutlineDelete, AiOutlineEye } from 'react-icons/ai';
import { DataGrid } from '@mui/x-data-grid';
import { toast } from 'react-toastify';
import { deleteShopEvent, getShopAllEvents } from '../../redux/actions/eventAction';
import { clearDeleteState } from '../../redux/slices/eventSlice';

const AllEvents = () => {
    const dispatch = useDispatch();
    const { events ,getEventsLoading, deleteLoading, deleteEventSuccess, deleteError } = useSelector(state => state.event);
    const { seller } = useSelector(state => state.seller);
    //============================ useEffects =========================
    useEffect(() => {
        if (seller && seller._id) {
            dispatch(getShopAllEvents(seller._id));
        }
    }, [seller]);

    useEffect(() => {
        if (deleteEventSuccess) {
            toast.success("Event deleted successfully");
            dispatch(getShopAllEvents(seller._id));
            dispatch(clearDeleteState());
        }

        if (deleteError) {
            toast.error(deleteError);
            dispatch(clearDeleteState());
        }
    }, [deleteEventSuccess, deleteError, dispatch]);


    //============================ Handlers ==========================
    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this event?")) {
            dispatch(deleteShopEvent(id));
        }
    };

    //==================== Column and row setup =================
    const columns = [
        { field: "id", headerName: "Product Id", minWidth: 150, flex: 0.7 },

        {
            field: "name",
            headerName: "Name",
            minWidth: 120,
            flex: 1.4,
        },

        {
            field: "price",
            headerName: "Price",
            minWidth: 100,
            flex: 0.6,
        },

        {
            field: "stock",
            headerName: "Stock",
            type: "number",
            minWidth: 80,
            flex: 0.5,
        },

        {
            field: "sold",
            headerName: "Sold",
            type: "number",
            minWidth: 100,
            flex: 0.6,
        },

        // 👁 Preview
        {
            field: "preview",
            headerName: "Preview",
            sortable: false,
            minWidth: 100,
            flex: 0.6,
            renderCell: (params) => {
                const product_name = params.row.name.replace(/\s+/g, "-");

                return (
                    <Link to={`/event/${product_name}`}>
                        <button className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white transition duration-300">
                            <AiOutlineEye size={18} />
                        </button>
                    </Link>
                );
            },
        },

        // 🗑 Delete
        {
            field: "delete",
            headerName: "Delete",
            sortable: false,
            minWidth: 100,
            flex: 0.6,
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

    const row = events?.map(event => ({
        id: event._id,
        name: event.name,
        price: "US$ " + event.originalPrice,
        stock: event.stock,
        sold: event.sold_out,
    })) || [];

    //==================== return statements ===================
    return (
        <>
            {
                getEventsLoading ? (
                    <div>
                        Loading...
                    </div>
                ) : (
                    <div className="w-full mx-4 sm:mx-8 mt-3 bg-white p-6 rounded-2xl shadow-md h-[75vh] overflow-y-scroll">
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
        </>
    )
}

export default AllEvents