import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../../../styles/styles.js";
import {
  AiFillHeart,
  AiFillStar,
  AiOutlineEye,
  AiOutlineHeart,
  AiOutlineShoppingCart,
  AiOutlineStar,
} from "react-icons/ai";
import ProductDetailCard from "../ProductDetailCard/ProductDetailCard.jsx";
import { BACKEND_URL, server } from "../../../../server.js";
import { useDispatch, useSelector } from "react-redux";
import { addToWishlist, removeFromWishlist } from "../../../redux/slices/wishListSlice.js";
import { addToCart } from "../../../redux/slices/cartSlice.js";
import { toast } from "react-toastify";
import axios from "axios";

const ProductCard = ({ data }) => {
  const [click, setClick] = useState(false);
  const [open, setOpen] = useState(false);
  const [shop, setShop] = useState(null);

  const dispatch = useDispatch();
  const { wishlistItems } = useSelector((state) => state.wishlist);
  const cartItems = useSelector((state) => state.cart?.cartItems || []);

  if (!data) return null;

  const imageUrl = data?.images && data.images.length > 0 ? data.images[0] : "placeholder.png";
  
  const discountPercentage =
    data?.originalPrice && data?.discountPrice
      ? Math.round(((data.originalPrice - data.discountPrice) / data.originalPrice) * 100)
      : 0;

  // Optimized Shop extraction: Checks if data already populated the shop object first
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

  // Synchronize state hook with Redux Wishlist
  useEffect(() => {
    const isInWishList = wishlistItems.find((i) => i._id === data._id);
    setClick(!!isInWishList);
  }, [wishlistItems, data._id]);

  const toggleWishlist = (e) => {
    e.stopPropagation(); // Stop Event Bubbling
    if (click) {
      dispatch(removeFromWishlist(data._id));
      toast.info("Removed from Wishlist");
    } else {
      dispatch(addToWishlist(data));
      toast.success("Added to Wishlist");
    }
  };

  const handleAddToCart = (e) => {
    e.stopPropagation(); // Stop Event Bubbling
    const isItemExist = cartItems.find((i) => i._id === data._id);
    if (isItemExist) {
      toast.error("Item already in cart");
      return;
    }
    dispatch(addToCart({ ...data, qty: 1 }));
    toast.success("Item added to cart");
  };

  // Helper function to render product ratings smoothly
  const renderStars = (rating = 4) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<AiFillStar key={i} size={16} color="#F6BA00" className="mr-0.5" />);
      } else {
        stars.push(<AiOutlineStar key={i} size={16} color="#F6BA00" className="mr-0.5" />);
      }
    }
    return stars;
  };

  return (
    <>
      <div className="group relative w-full h-[380px] bg-white rounded-xl p-3 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between">
        
        <div>
          {/* Product Cover Asset Preview */}
          <Link to={`/products/${data._id}`} className="block overflow-hidden rounded-lg bg-gray-50/50 mb-3">
            <img
              src={`${BACKEND_URL}/${imageUrl}`}
              alt={data?.name}
              className="w-full h-[170px] object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300"
            />
          </Link>

          {/* Shop Context Info Metadata Header Line */}
          <Link 
            to={`/shop/preview/${data.shopId}`} 
            className="text-xs font-semibold text-blue-600 hover:underline tracking-tight block mb-1 truncate"
          >
            {shop?.name || data?.shopName || "Official Store"}
          </Link>

          {/* Truncated Dynamic Product String Text Description Title */}
          <Link to={`/products/${data._id}`} className="block group-hover:text-blue-600 transition-colors">
            <h4 className="font-medium text-gray-800 text-sm leading-snug line-clamp-2">
              {data?.name}
            </h4>
          </Link>
        </div>

        {/* Footer Financial & Review Breakdown Matrix Info Area */}
        <div className="mt-auto pt-2 space-y-2">
          {/* Dynamic Review Stars Rating Line */}
          <div className="flex items-center">
            {renderStars(data?.ratings)}
            {data?.reviews?.length > 0 && (
              <span className="text-[11px] text-gray-400 ml-1">({data.reviews.length})</span>
            )}
          </div>

          {/* Pricing Row Field Grid Layout */}
          <div className="flex items-baseline justify-between flex-wrap gap-1">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-base font-bold text-gray-900">
                {data?.discountPrice?.toLocaleString()} PKR
              </span>
              {data?.originalPrice > data?.discountPrice && (
                <span className="text-xs text-gray-400 line-through">
                  {data?.originalPrice?.toLocaleString()} PKR
                </span>
              )}
            </div>
            
            {discountPercentage > 0 && (
              <span className="text-[11px] font-bold bg-green-50 text-green-600 px-1.5 py-0.5 rounded">
                -{discountPercentage}% Off
              </span>
            )}
          </div>

          {/* Inventory Distribution Meta Sales Flag Status */}
          <div className="flex items-center justify-between text-[11px] border-t border-gray-50 pt-2 text-gray-400 font-medium">
            <span>{data?.sold_out || 0} units sold</span>
            {data?.stock <= 5 && data?.stock > 0 && (
              <span className="text-red-500 font-semibold">Only {data.stock} left!</span>
            )}
          </div>
        </div>

        {/* Floating Interactive User Micro-Action Tool Floating Stack */}
        <div className="absolute top-3 right-3 flex flex-col gap-1.5 opacity-90 sm:opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-white/80 backdrop-blur-xs p-1 rounded-lg shadow-xs border border-gray-100">
          <button
            onClick={toggleWishlist}
            className="p-1.5 hover:bg-gray-100 rounded-md transition-colors text-gray-700 hover:text-red-500 outline-none"
            title={click ? "Remove from wishlist" : "Add to wishlist"}
          >
            {click ? <AiFillHeart size={19} color="red" /> : <AiOutlineHeart size={19} />}
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); setOpen(true); }}
            className="p-1.5 hover:bg-gray-100 rounded-md transition-colors text-gray-700 hover:text-blue-600 outline-none"
            title="Quick view"
          >
            <AiOutlineEye size={19} />
          </button>

          <button
            onClick={handleAddToCart}
            className="p-1.5 hover:bg-gray-100 rounded-md transition-colors text-gray-700 hover:text-green-600 outline-none"
            title="Add to cart"
          >
            <AiOutlineShoppingCart size={19} />
          </button>
        </div>

        {/* Quick View Portal Modal System Mounted Box */}
        {open && <ProductDetailCard open={open} setOpen={setOpen} data={data} />}
      </div>
    </>
  );
};

export default ProductCard;