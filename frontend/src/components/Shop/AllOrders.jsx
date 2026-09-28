import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getShopOrders } from '../../redux/actions/orderAction';
import { Link } from 'react-router-dom';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { DataGrid } from '@mui/x-data-grid';

const AllOrders = () => {
    const dispatch = useDispatch();

    // 1. Matched to exact state keys from orderSlice
    const { getShopOrdersLoading, shopOrders } = useSelector((state) => state.order);
    const { seller } = useSelector((state) => state.seller);

    //============================ useEffects =========================
    useEffect(() => {
        if (seller?._id) {
            dispatch(getShopOrders());
        }
    }, [dispatch, seller?._id]);

    //==================== Column and row setup =================
    const columns = [
        { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },
        {
            field: "status",
            headerName: "Status",
            minWidth: 130,
            flex: 0.8,
            renderCell: (params) => {
                const status = params.row.status;
                const isDelivered = status === "Delivered";
                const isCancelled = status === "Cancelled";
                
                let badgeStyle = "bg-amber-50 text-amber-600 border border-amber-200";
                if (isDelivered) {
                    badgeStyle = "bg-emerald-50 text-emerald-600 border border-emerald-200";
                } else if (isCancelled) {
                    badgeStyle = "bg-rose-50 text-rose-600 border border-rose-200";
                }

                return (
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${badgeStyle}`}>
                        {status}
                    </span>
                );
            },
        },
        {
            field: "itemsQty",
            headerName: "Items Qty",
            type: "number",
            minWidth: 100,
            flex: 0.6,
        },
        {
            field: "total",
            headerName: "Total",
            minWidth: 120,
            flex: 0.8,
        },
        {
            field: "createdAt",
            headerName: "Order Date",
            minWidth: 130,
            flex: 0.8,
        },
        {
            field: "action",
            headerName: "Action",
            sortable: false,
            minWidth: 100,
            flex: 0.5,
            renderCell: (params) => {
                return (
                    <Link to={`/order/${params.row.id}`}>
                        <button className="p-2 rounded-lg bg-teal-50 text-teal-600 hover:bg-teal-600 hover:text-white transition-all duration-200 active:scale-95 outline-none cursor-pointer">
                            <AiOutlineArrowRight size={18} />
                        </button>
                    </Link>
                );
            },
        },
    ];

    // 2. Map through shopOrders instead of orders
    const row = (shopOrders || []).map((item) => {
        const shopItemsQty = item.cart
            ? item.cart.reduce((acc, curr) => acc + (curr.qty || curr.quantity || 1), 0)
            : 0;

        // 3. Fallback check for pricing snapshot schema
        const totalAmount = item.pricing?.total ?? item.totalPrice ?? 0;

        return {
            id: item._id,
            itemsQty: shopItemsQty,
            total: `US$ ${totalAmount.toFixed(2)}`,
            status: item.status || "Processing",
            createdAt: item.createdAt ? item.createdAt.slice(0, 10) : "N/A",
        };
    });

    //==================== Return statements ===================
    return (
        <div className="w-full mx-4 sm:mx-8 mt-4">
            {getShopOrdersLoading ? (
                <div className="w-full bg-white p-6 rounded-2xl shadow-xs border border-gray-100 h-[70vh] flex flex-col items-center justify-center gap-3">
                    <div className="w-10 h-10 border-4 border-teal-500/20 border-t-teal-500 rounded-full animate-spin" />
                    <p className="text-sm font-semibold text-gray-400">Loading shop orders data matrix...</p>
                </div>
            ) : (
                <div className="bg-white p-6 rounded-2xl shadow-xs border border-gray-100 h-[75vh]">
                    <DataGrid
                        rows={row}
                        columns={columns}
                        pageSizeOptions={[10, 25, 50]}
                        initialState={{
                            pagination: {
                                paginationModel: { pageSize: 10 },
                            },
                        }}
                        disableRowSelectionOnClick
                        sx={{
                            border: "none",
                            "& .MuiDataGrid-cell": {
                                display: "flex",
                                alignItems: "center",
                                fontSize: "14px",
                                color: "#374151",
                            },
                            "& .MuiDataGrid-columnHeaders": {
                                backgroundColor: "#f0fdfa",
                                fontSize: "14px",
                                fontWeight: "700",
                                color: "#0f766e",
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

export default AllOrders;