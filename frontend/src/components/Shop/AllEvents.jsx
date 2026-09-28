import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { AiOutlineDelete, AiOutlineEye } from 'react-icons/ai';
import { DataGrid } from '@mui/x-data-grid';
import { toast } from 'react-toastify';
import { deleteShopEvent, getShopAllEvents } from '../../redux/actions/eventAction';
import { clearDeleteState } from '../../redux/slices/eventSlice';

const AllEvents = () => {
    const dispatch = useDispatch();
    const { events, getEventsLoading, deleteEventSuccess, deleteError } = useSelector(state => state.event);
    const { seller } = useSelector(state => state.seller);

    //============================ useEffects =========================
    useEffect(() => {
        if (seller?._id) {
            dispatch(getShopAllEvents(seller._id));
        }
    }, [seller, dispatch]);

    useEffect(() => {
        if (deleteEventSuccess) {
            toast.success("Event deleted successfully");
            if (seller?._id) {
                dispatch(getShopAllEvents(seller._id));
            }
            dispatch(clearDeleteState());
        }

        if (deleteError) {
            toast.error(deleteError);
            dispatch(clearDeleteState());
        }
    }, [deleteEventSuccess, deleteError, seller?._id, dispatch]);

    //============================ Handlers ==========================
    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this event?")) {
            dispatch(deleteShopEvent(id));
        }
    };

    //==================== Column and row setup =================
    const columns = [
        { field: "id", headerName: "Event Id", minWidth: 150, flex: 0.7 },
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
        // 👁 Preview Row Button
        {
            field: "preview",
            headerName: "Preview",
            sortable: false,
            minWidth: 100,
            flex: 0.6,
            renderCell: (params) => {
                const event_name = params.row.name.replace(/\s+/g, "-");
                return (
                    <Link to={`/event/${event_name}`}>
                        <button className="p-2 rounded-lg bg-teal-50 text-teal-600 hover:bg-teal-600 hover:text-white transition-all duration-200 active:scale-95 outline-none">
                            <AiOutlineEye size={18} />
                        </button>
                    </Link>
                );
            },
        },
        // 🗑 Delete Action Trigger
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
                        className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-all duration-200 active:scale-95 outline-none"
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
        <div className="w-full mx-4 sm:mx-8 mt-4">
            {getEventsLoading ? (
                <div className="w-full bg-white p-6 rounded-2xl shadow-xs border border-gray-100 h-[70vh] flex flex-col items-center justify-center gap-3">
                    <div className="w-10 h-10 border-4 border-teal-500/20 border-t-teal-500 rounded-full animate-spin" />
                    <p className="text-sm font-semibold text-gray-400">Loading live marketing events grid...</p>
                </div>
            ) : (
                <div className="bg-white p-6 rounded-2xl shadow-xs border border-gray-100 h-[75vh] overflow-y-auto no-scrollbar">
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
                                backgroundColor: "#f0fdfa", // Unified Light Teal variant theme
                                fontSize: "14px",
                                fontWeight: "700",
                                color: "#0f766e", // Theme accent dark teal typography
                                borderBottom: "2px solid #ccfbf1",
                            },
                            "& .MuiDataGrid-columnHeaderTitle": {
                                fontWeight: "700",
                            },
                            "& .MuiDataGrid-row": {
                                borderBottom: "1px solid #f3f4f6",
                                transition: "background-color 0.2s ease",
                            },
                            "& .MuiDataGrid-row:hover": {
                                backgroundColor: "#f9fafb",
                            },
                            "& .MuiDataGrid-footerContainer": {
                                borderTop: "1px solid #e5e7eb",
                                backgroundColor: "#ffffff",
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
            )}
        </div>
    );
};

export default AllEvents;