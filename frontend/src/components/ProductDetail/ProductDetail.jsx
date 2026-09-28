import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from '../../styles/styles';
import { 
  AiFillHeart, 
  AiOutlineHeart, 
  AiOutlineMessage, 
  AiOutlineShoppingCart,
  AiFillStar,
  AiOutlineStar
} from 'react-icons/ai';
import { BACKEND_URL, server } from '../../../server';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../redux/slices/cartSlice';
import { addToWishlist, removeFromWishlist } from '../../redux/slices/wishListSlice';
import { toast } from 'react-toastify';

const ProductDetail = ({ data }) => {
    const [count, setCount] = useState(1);
    const [click, setClick] = useState(false);
    const [select, setSelect] = useState(0);
    const [shop, setShop] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const images = data?.images || [];
    const { wishlistItems } = useSelector(state => state.wishlist);
    const cartItems = useSelector(state => state.cart?.cartItems || []);

    const discountPercentage =
        data?.originalPrice && data?.discountPrice
            ? Math.round(((data.originalPrice - data.discountPrice) / data.originalPrice) * 100)
            : 0;

    // Check if product is in wishlist on load
    useEffect(() => {
        const isInWishList = wishlistItems.find(i => i._id === data?._id);
        setClick(!!isInWishList);
    }, [wishlistItems, data?._id]);

    // Fetch shop data dynamically with inline lookup caching
    useEffect(() => {
        if (!data?.shopId) return;
        if (data?.shop && typeof data.shop === 'object') {
            setShop(data.shop);
            return;
        }
        const fetchShop = async () => {
            try {
                const res = await axios.get(`${server}/shop/find/${data.shopId}`);
                setShop(res.data.shop);
            } catch (err) {
                console.error("Error fetching shop details:", err);
            }
        };
        fetchShop();
    }, [data?.shopId, data?.shop]);

    const setDecrement = () => count > 1 && setCount(count - 1);
    const setIncrement = () => {
        if (count < (data?.stock || 1)) {
            setCount(count + 1);
        } else {
            toast.error("Reached maximum stock limit!");
        }
    };
    
    const handleMessageSubmit = () => navigate(`/inbox/product`);

    const toggleWishlist = () => {
        if (click) {
            dispatch(removeFromWishlist(data._id));
            toast.info("Removed from Wishlist");
            setClick(false);
        } else {
            dispatch(addToWishlist(data));
            toast.success("Added to Wishlist");
            setClick(true);
        }
    };

    const handleAddToCart = () => {
        const isItemExist = cartItems.find(i => i._id === data._id);
        if (isItemExist) {
            toast.error("Item already in cart");
            return;
        }
        if ((data?.stock || 0) < count || data?.stock === 0) {
            toast.error("Insufficient product stock available!");
            return;
        }
        dispatch(addToCart({ ...data, qty: count }));
        toast.success("Item added to cart");
    };

    if (!data) return (
        <div className="flex flex-col items-center justify-center py-24 gap-3">
            <div className="w-10 h-10 border-4 border-teal-500/20 border-t-teal-500 rounded-full animate-spin" />
            <p className="text-sm font-semibold text-gray-400">Loading catalog profile...</p>
        </div>
    );

    return (
        <div className="bg-white min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 bg-white border border-gray-100 shadow-xs p-4 sm:p-6 rounded-2xl">

                    {/* Left Screen Panel Side: Display Images Gallery */}
                    <div className="flex flex-col gap-4">
                        <div className="w-full aspect-square max-h-[460px] bg-gray-50 rounded-xl border border-gray-100 p-4 flex items-center justify-center overflow-hidden">
                            <img 
                                src={images[select] ? `${BACKEND_URL}/${images[select]}` : '/placeholder.png'} 
                                alt={data.name} 
                                className="max-w-full max-h-full object-contain transition-transform duration-300 hover:scale-[1.02]"
                            />
                        </div>
                        
                        <div className="flex flex-wrap gap-2.5 overflow-x-auto pb-1 no-scrollbar">
                            {images.slice(0, 6).map((img, index) => (
                                <button 
                                    key={index} 
                                    className={`relative aspect-square w-20 bg-white rounded-lg overflow-hidden border-2 transition-all p-1 outline-none ${
                                        select === index ? 'border-teal-500 shadow-sm scale-102 bg-teal-50/20' : 'border-gray-100 hover:border-gray-300'
                                    }`}
                                    onClick={() => setSelect(index)}
                                >
                                    <img 
                                        src={`${BACKEND_URL}/${img}`} 
                                        alt={`${data.name} thumbnail ${index + 1}`} 
                                        className="w-full h-full object-contain rounded-md mix-blend-multiply"
                                    />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Right Screen Panel Side: Informational Attributes Matrix */}
                    <div className="flex flex-col justify-between py-1">
                        <div>
                            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-950 tracking-tight leading-tight">
                                {data.name}
                            </h1>
                            <div className="text-xs font-semibold text-teal-600 tracking-wide mt-1.5 uppercase">
                                Verified Deal • {data?.sold_out || 0} units sold
                            </div>
                            
                            <p className="mt-4 text-sm sm:text-base text-gray-600 leading-relaxed">
                                {data.description}
                            </p>

                            {/* Pricing Context Metric Stack */}
                            <div className="flex items-baseline gap-3 py-5 my-5 border-t border-b border-gray-50 flex-wrap">
                                <span className="text-3xl font-black text-gray-950 font-sans">
                                    {data.discountPrice?.toLocaleString()} PKR
                                </span>
                                {data.originalPrice > data.discountPrice && (
                                    <span className="text-base font-semibold text-red-500 line-through">
                                        {data.originalPrice?.toLocaleString()} PKR
                                    </span>
                                )}
                                {discountPercentage > 0 && (
                                    <span className="bg-emerald-50 text-emerald-700 text-xs font-bold px-2.5 py-1 rounded-full border border-emerald-100">
                                        Save {discountPercentage}% Off
                                    </span>
                                )}
                            </div>

                            {/* Cart Counters Matrix & Wishlist Row Buttons */}
                            <div className="flex items-center justify-between gap-4 mt-6 flex-wrap">
                                <div className="flex items-center border border-gray-200 shadow-inner bg-gray-50/50 rounded-full p-1">
                                    <button 
                                        className="w-9 h-9 bg-white text-gray-800 font-bold rounded-full shadow hover:bg-teal-50 hover:text-teal-600 transition-colors active:scale-95 outline-none" 
                                        onClick={setDecrement}
                                    >
                                        -
                                    </button>
                                    <span className="px-5 font-extrabold text-gray-900 select-none min-w-10 text-center">{count}</span>
                                    <button 
                                        className="w-9 h-9 bg-white text-gray-800 font-bold rounded-full shadow hover:bg-teal-50 hover:text-teal-600 transition-colors active:scale-95 outline-none" 
                                        onClick={setIncrement}
                                    >
                                        +
                                    </button>
                                </div>
                                
                                <button 
                                    onClick={toggleWishlist}
                                    className="p-3 bg-white hover:bg-red-50 border border-gray-100 shadow-xs rounded-xl transition-colors outline-none"
                                >
                                    {click ? (
                                        <AiFillHeart size={24} className="text-red-500 animate-popIn" />
                                    ) : (
                                        <AiOutlineHeart size={24} className="text-gray-500 hover:text-red-500 transition-colors" />
                                    )}
                                </button>
                            </div>

                            {/* Master Add to Cart Submit Trigger Callout */}
                            <div className="mt-6 flex flex-col gap-3">
                                <button 
                                    disabled={data?.stock === 0 || !data?.stock}
                                    onClick={handleAddToCart}
                                    className={`w-full max-w-sm inline-flex gap-2.5 items-center justify-center font-bold px-6 py-3.5 rounded-xl shadow-md transition-all duration-200 text-white ${
                                        data?.stock === 0 || !data?.stock
                                            ? "bg-gray-300 text-gray-500 cursor-not-allowed shadow-none"
                                            : "bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 hover:shadow-lg shadow-teal-100 active:scale-[0.99]"
                                    }`}
                                >
                                    <AiOutlineShoppingCart size={20} />
                                    {data?.stock === 0 || !data?.stock ? "Out of Stock" : "Add to Cart"}
                                </button>

                                {data?.stock <= 5 && data?.stock > 0 && (
                                    <span className="text-xs text-amber-600 font-semibold bg-amber-50 px-3 py-1.5 rounded-lg border border-amber-100 max-w-sm text-center">
                                        ⚠️ Only {data.stock} items left in store stock inventory!
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Inline Merchant Identity Profile Snippet Box */}
                        {shop && (
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-gray-100 mt-8">
                                <Link to={`/shop/preview/${data?.shopId}`} className="flex items-center gap-3 group">
                                    <img 
                                        src={shop.avatar ? `${BACKEND_URL}/${shop.avatar}` : '/placeholder.png'} 
                                        alt={shop.name} 
                                        className="w-12 h-12 rounded-full object-cover ring-2 ring-gray-100 shadow-xs"
                                    />
                                    <div>
                                        <h3 className="text-gray-900 font-bold text-sm leading-tight group-hover:text-teal-600 transition-colors">
                                            {shop.name}
                                        </h3>
                                        <h5 className="text-xs font-semibold text-amber-500 flex items-center gap-0.5 mt-0.5">
                                            ★ {(shop.ratings || 0).toFixed(1)} <span className="text-gray-400 font-medium">Ratings</span>
                                        </h5>
                                    </div>
                                </Link>
                                
                                <button 
                                    onClick={handleMessageSubmit} 
                                    className="inline-flex gap-2 text-xs font-bold text-teal-700 bg-teal-50 hover:bg-teal-100/80 px-4 py-2.5 rounded-lg border border-teal-100/60 transition-colors shadow-2xs whitespace-nowrap self-start sm:self-auto outline-none"
                                >
                                    <AiOutlineMessage size={16} />
                                    Contact Vendor
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Main Navigational Details Section Tabular Grid Component Container */}
                <div className="py-12">
                    <ProductTabs data={data} shop={shop} />
                </div>
            </div>
        </div>
    );
};

const ProductTabs = ({ data, shop }) => {
    const [active, setActive] = useState(1);
    const navigate = useNavigate();

    // Dynamically retrieve genuine product nested user validation feedback arrays 
    const verifiedReviews = data?.reviews || [];

    const tabsList = [
        { id: 1, name: "Product Details" },
        { id: 2, name: `Product Reviews (${verifiedReviews.length})` },
        { id: 3, name: "Merchant Info" }
    ];

    const renderStarsLayout = (score = 5) => {
        const parsed = Math.round(score);
        return (
            <span className="text-amber-400 text-xs tracking-tight">
                {"★".repeat(parsed)}{"☆".repeat(5 - parsed)}
            </span>
        );
    };

    return (
        <div className="bg-gray-50 border border-gray-100 px-4 sm:px-8 py-6 rounded-2xl min-h-[40vh] shadow-2xs">
            {/* Nav Menu Header */}
            <div className="flex border-b border-gray-200 pb-3 gap-6 sm:gap-8 overflow-x-auto no-scrollbar">
                {tabsList.map((tab) => {
                    const isTabActive = active === tab.id;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => setActive(tab.id)}
                            className={`text-base font-semibold transition-all relative pb-3 -mb-3 border-b-2 outline-none whitespace-nowrap ${
                                isTabActive
                                    ? "text-teal-600 border-teal-600 font-bold"
                                    : "text-gray-500 border-transparent hover:text-gray-900"
                            }`}
                        >
                            {tab.name}
                        </button>
                    );
                })}
            </div>

            {/* Content Display Switch Matrix */}
            <div className="pt-6">
                {/* 1. PRODUCT DETAILS */}
                {active === 1 && (
                    <div className="space-y-4 text-sm sm:text-base text-gray-700 leading-relaxed max-w-4xl">
                        <p className="font-medium text-gray-900">Overview Description:</p>
                        <p>{data.description}</p>
                        {data.long_description && (
                            <div className="pt-2 border-t border-gray-100 mt-2 space-y-2">
                                <p className="font-medium text-gray-900">Specifications & Specifications Details:</p>
                                <p className="text-gray-600 whitespace-pre-line">{data.long_description}</p>
                            </div>
                        )}
                    </div>
                )}

                {/* 2. DYNAMIC REAL PRODUCT REVIEWS */}
                {active === 2 && (
                    <div className="flex flex-col gap-4 max-w-3xl">
                        {verifiedReviews.length > 0 ? (
                            verifiedReviews.map((review, idx) => (
                                <div key={idx} className="bg-white border border-gray-100 p-4 rounded-xl flex items-start gap-4 shadow-2xs">
                                    <img 
                                        src={review?.user?.avatar ? `${BACKEND_URL}/${review.user.avatar}` : '/placeholder.png'} 
                                        alt="user icon" 
                                        className="w-9 h-9 rounded-full object-cover border border-gray-100 flex-shrink-0"
                                    />
                                    <div className="flex-1 space-y-1">
                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                                            <h4 className="text-sm font-bold text-gray-800">{review?.user?.name || "Verified Customer"}</h4>
                                            <div className="flex items-center gap-1.5">
                                                {renderStarsLayout(review?.rating)}
                                                <span className="text-[10px] font-medium text-gray-400">
                                                    {review?.createdAt ? new Date(review.createdAt).toLocaleDateString() : ""}
                                                </span>
                                            </div>
                                        </div>
                                        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed pt-0.5">
                                            {review?.comment || "Customer submitted transaction score without textual description metrics."}
                                        </p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="flex flex-col items-center justify-center py-12 text-center text-gray-400 font-medium text-sm">
                                ✉️ No user review items posted for this product tier package yet.
                            </div>
                        )}
                    </div>
                )}

                {/* 3. MERCHANT COMPREHENSIVE META DIRECTORY OVERVIEW */}
                {active === 3 && shop && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl bg-white border border-gray-100 p-5 rounded-xl shadow-2xs">
                        <div className="space-y-3">
                            <div className="flex items-center gap-3">
                                <img 
                                    src={shop.avatar ? `${BACKEND_URL}/${shop.avatar}` : '/placeholder.png'} 
                                    alt={shop.name} 
                                    className="w-12 h-12 rounded-full object-cover border border-gray-100"
                                />
                                <div>
                                    <h3 className="text-teal-600 text-base font-bold">{shop.name}</h3>
                                    <h5 className="text-xs font-semibold text-amber-500">★ {(shop.ratings || 0).toFixed(1)} Store Score</h5>
                                </div>
                            </div>
                            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed pt-2">
                                {shop.description || "No official merchant summary portfolio catalog published yet."}
                            </p>
                        </div>
                        
                        <div className="flex flex-col gap-2.5 text-xs sm:text-sm text-gray-700 font-medium justify-between">
                            <div className="space-y-2">
                                <div><span className="text-gray-400 font-semibold uppercase text-[10px] tracking-wider block">Joined On</span> {shop.createdAt ? new Date(shop.createdAt).toLocaleDateString('en-US', {year: 'numeric', month: 'long'}) : "N/A"}</div>
                                <div><span className="text-gray-400 font-semibold uppercase text-[10px] tracking-wider block">Total Live Stock</span> {shop.totalProducts || 0} active assets</div>
                                <div><span className="text-gray-400 font-semibold uppercase text-[10px] tracking-wider block">Total Historical Feedback</span> {shop.totalReviews || 0} customer receipts</div>
                            </div>
                            
                            <button 
                                className="w-full sm:w-auto bg-gray-900 text-white font-bold text-xs px-5 py-2.5 rounded-lg hover:bg-gray-800 transition active:scale-98 mt-2 shadow-xs outline-none text-center" 
                                onClick={() => navigate(`/shop/preview/${data?.shopId}`)}
                            >
                                Visit Shop Storefront
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductDetail;