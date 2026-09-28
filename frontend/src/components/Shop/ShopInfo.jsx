import React, { useState } from 'react';
import { BACKEND_URL, server } from '../../../server';
import styles from '../../styles/styles';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ShopInfo = ({ isOwner, seller, products }) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const logoutHandler = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`${server}/shop/logout-shop`, { withCredentials: true });
            toast.success(res.data.message || "Logged out successfully");
            navigate('/login-shop');
            window.location.reload();
        } catch (err) {
            const errorMsg = err.response?.data?.message || "Logout failed";
            toast.error(errorMsg);
            console.error(errorMsg);
        } finally {
            setLoading(false);
        }
    };

    // Calculate aggregated or default rating safely
    const formattedRating = seller?.ratings ? `${seller.ratings.toFixed(1)} / 5.0` : "Not Rated Yet";

    // Format the joining date gracefully
    const joiningDate = seller?.createdAt 
        ? new Date(seller.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
        : "N/A";

    return (
        <div className="w-full bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-6">
            
            {/* Profile Avatar & Header Identity Context */}
            <div className="flex flex-col items-center justify-center text-center pb-4 border-b border-gray-50">
                <div className="relative group">
                    <img 
                        src={seller?.avatar ? `${BACKEND_URL}/${seller.avatar}` : '/placeholder.png'} 
                        alt={seller?.name || "Shop Profile"}
                        className="w-[120px] h-[120px] rounded-full object-cover ring-4 ring-gray-50 shadow-sm"
                    />
                </div>
                <h3 className="mt-4 text-xl font-bold text-gray-900 tracking-tight">
                    {seller?.name || "Loading Shop..."}
                </h3>
                {seller?.description && (
                    <p className="mt-2 text-sm text-gray-500 leading-relaxed max-w-sm">
                        {seller.description}
                    </p>
                )}
            </div>

            {/* Profile Core Metadata Attributes Fields Grid */}
            <div className="space-y-4 text-sm">
                <div className="flex flex-col gap-0.5">
                    <span className="font-semibold text-gray-400 uppercase text-[11px] tracking-wider">Address</span>
                    <span className="text-gray-800 font-medium">{seller?.address || "Not Provided"}</span>
                </div>

                <div className="flex flex-col gap-0.5">
                    <span className="font-semibold text-gray-400 uppercase text-[11px] tracking-wider">Phone Number</span>
                    <span className="text-gray-800 font-medium">{seller?.phoneNumber || "Not Provided"}</span>
                </div>

                <div className="flex flex-col gap-0.5">
                    <span className="font-semibold text-gray-400 uppercase text-[11px] tracking-wider">Total Products</span>
                    <span className="text-gray-800 font-medium">{products?.length || 0} items</span>
                </div>

                <div className="flex flex-col gap-0.5">
                    <span className="font-semibold text-gray-400 uppercase text-[11px] tracking-wider">Shop Ratings</span>
                    <span className="text-gray-800 font-medium flex items-center gap-1">
                        <span className="text-amber-500 font-bold">★</span> {formattedRating}
                    </span>
                </div>

                <div className="flex flex-col gap-0.5">
                    <span className="font-semibold text-gray-400 uppercase text-[11px] tracking-wider">Joined On</span>
                    <span className="text-gray-800 font-medium">{joiningDate}</span>
                </div>
            </div>

            {/* Account Management Owner Trigger View Controls */}
            {isOwner && (
                <div className="pt-4 flex flex-col gap-2.5">
                    <button 
                        className="w-full h-[42px] inline-flex items-center justify-center bg-gray-900 text-white font-medium rounded-lg text-sm hover:bg-gray-800 transition duration-200 active:scale-[0.99] outline-none shadow-sm"
                        onClick={() => navigate('/shop-dashboard-settings')}
                    >
                        Edit Shop Profile
                    </button>
                    <button 
                        disabled={loading}
                        onClick={logoutHandler}
                        className="w-full h-[42px] inline-flex items-center justify-center bg-red-50 text-red-600 font-semibold rounded-lg text-sm hover:bg-red-100 transition duration-200 disabled:opacity-50 active:scale-[0.99] outline-none"
                    >
                        {loading ? "Logging out..." : "Log Out"}
                    </button>
                </div>
            )}
        </div>
    );
};

export default ShopInfo;