import React, { useEffect, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { addToCart } from "../../../redux/slices/cartSlice";
import { addToWishlist, removeFromWishlist } from "../../../redux/slices/wishListSlice.js";
import { BACKEND_URL } from "../../../../server.js";
import styles from "../../../styles/styles";

const ProductDetailCard = ({ open, setOpen, data }) => {
  const { cartItems } = useSelector((state) => state.cart);
  const { wishlistItems } = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();
  
  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);

  useEffect(() => {
    // Correctly check if item is in wishlist when component mounts or wishlist updates
    const isInWishList = wishlistItems && wishlistItems.find((i) => i._id === data?._id);
    setClick(!!isInWishList);
  }, [wishlistItems, data?._id]);

  if (!data) return null;

  const imageUrl =
    data?.images && data.images.length > 0
      ? `${BACKEND_URL}/${data.images[0]}`
      : "/placeholder.png";

  const discountPercentage =
    data?.originalPrice && data?.discountPrice
      ? Math.round(
          ((data.originalPrice - data.discountPrice) / data.originalPrice) * 100
        )
      : 0;

  const setDecrement = () => {
    if (count > 1) setCount(count - 1);
  };

  const setIncrement = () => {
    if (count < (data.stock || 1)) {
      setCount(count + 1);
    } else {
      toast.error("Reached stock limit!");
    }
  };

  const handleAddToCart = () => {
    const isItemExist = cartItems && cartItems.find((i) => i._id === data._id);
    if (isItemExist) {
      toast.error("Product already in Cart");
      return;
    }
    
    // Final sanity check on stock before adding
    if ((data.stock || 0) < count || (data.stock || 0) === 0) {
      toast.error("Insufficient stock!");
      return;
    }

    const cartData = { ...data, qty: count };
    dispatch(addToCart(cartData));
    toast.success("Item added to cart!");
  };

  const toggleWishlist = () => {
    if (click) {
      dispatch(removeFromWishlist(data._id));
      toast.info("Removed from Wishlist");
    } else {
      dispatch(addToWishlist(data));
      toast.success("Added to Wishlist");
    }
    // State sync handled by useEffect hook above
  };

  return (
    // Backdrop blur added for focus on modal
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl p-6 md:p-8 relative animate-fadeIn">
        
        {/* Close Button - repositioned for better visual balance */}
        <button 
          onClick={() => setOpen(false)}
          className="absolute right-5 top-5 z-50 p-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full transition-colors outline-none"
        >
          <RxCross1 size={20} />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 pt-4">
          
          {/* LEFT SIDE: Assets & Shop Navigation */}
          <div className="flex flex-col gap-5">
            <div className="w-full aspect-square rounded-xl bg-gray-50 p-4 border border-gray-100 shadow-inner flex items-center justify-center">
              <img 
                src={imageUrl} 
                alt={data?.name} 
                className="max-w-full max-h-full object-contain hover:scale-105 transition-transform duration-300" 
              />
            </div>

            <div className="flex items-center justify-between gap-4 bg-teal-50/50 border border-teal-100 p-4 rounded-xl">
              {data?.shop && (
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center border border-gray-100">
                    {/* Fallback to text if shop avatar not available */}
                    <span className="font-bold text-teal-600 text-lg">{data.shop.name.charAt(0)}</span>
                  </div>
                  <div>
                    <h3 className="text-teal-700 text-base font-bold leading-tight">
                      {data.shop.name}
                    </h3>
                    <p className="text-xs text-gray-500 font-medium tracking-tight">Official Store</p>
                  </div>
                </div>
              )}
              
              <button className="flex items-center gap-2 text-sm font-semibold text-gray-700 bg-white hover:bg-teal-50 px-4 py-2 rounded-lg border border-gray-200 transition-colors shadow-sm whitespace-nowrap">
                <AiOutlineMessage size={18} />
                Message
              </button>
            </div>
          </div>

          {/* RIGHT SIDE: Details & Actions */}
          <div className="flex flex-col pt-2">
            <h1 className="text-2xl font-bold text-gray-900 leading-tight tracking-tight">
              {data?.name}
            </h1>
            
            <div className="text-sm font-semibold text-teal-600 mt-1 mb-3">
               Verified Product • {data?.sold_out || 0} Sold
            </div>

            <p className="text-sm text-gray-600 leading-relaxed max-h-[150px] overflow-y-auto pr-1 no-scrollbar mb-6">
              {data?.description || "No description available for this item."}
            </p>

            {/* Price Row Field Container */}
            <div className="flex items-end justify-between gap-4 py-4 border-t border-b border-gray-100 mb-6 flex-wrap">
              <div className="flex items-baseline gap-2.5">
                <span className="text-3xl font-extrabold text-gray-950 font-sans">
                  {data?.discountPrice?.toLocaleString()} PKR
                </span>
                {data?.originalPrice && (
                  <span className="text-base font-medium text-red-500 line-through">
                    {data.originalPrice.toLocaleString()} PKR
                  </span>
                )}
              </div>
              
              {discountPercentage > 0 && (
                <div className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold tracking-tight border border-emerald-100">
                  Save -{discountPercentage}%
                </div>
              )}
            </div>

            {/* Interactive User Context Micro-Actions Panel Row */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 mb-8">
              {/* Refined Gradient Quantity Switcher Component */}
              <div className="flex items-center gap-0.5 self-start sm:self-auto border border-gray-100 rounded-full shadow-inner bg-gray-50 p-1">
                <button
                  className="bg-white hover:bg-teal-50 text-teal-600 w-9 h-9 flex items-center justify-center font-bold rounded-full transition-colors active:scale-95 outline-none shadow"
                  onClick={setDecrement}
                >
                  -
                </button>
                <span className="text-gray-900 px-4 font-bold text-base w-12 text-center select-none">
                  {count}
                </span>
                <button
                  className="bg-white hover:bg-teal-50 text-teal-600 w-9 h-9 flex items-center justify-center font-bold rounded-full transition-colors active:scale-95 outline-none shadow"
                  onClick={setIncrement}
                >
                  +
                </button>
              </div>

              {/* Action Floating Buttons Group Matrix Stack Container with Hover Micro-animations */}
              <div className="flex items-center gap-2.5 justify-end">
                {/* Wishlist Dynamic Interaction Trigger Switching Status */}
                <button 
                    onClick={toggleWishlist}
                    className="p-3 bg-white hover:bg-red-50 border border-gray-100 rounded-xl shadow-sm transition-colors"
                    title={click ? "Remove from wishlist" : "Add to wishlist"}
                >
                    {click ? (
                        <AiFillHeart size={22} color="red" className="animate-popIn" />
                    ) : (
                        <AiOutlineHeart size={22} className="text-gray-500 hover:text-red-500 transition-colors" />
                    )}
                </button>

                {/* Submit / Cart Action Button Control with Signature Platform Gradient Accent */}
                <button
                    onClick={handleAddToCart}
                    disabled={data?.stock === 0 || !data?.stock}
                    className={`inline-flex gap-2 items-center justify-center font-bold px-6 py-3 rounded-xl shadow-md transition transform duration-200 text-white min-w-[170px] ${
                    data?.stock === 0 || !data?.stock
                        ? "bg-gray-300 cursor-not-allowed text-gray-500"
                        : "bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 active:scale-[0.98] shadow-teal-100/50 hover:shadow-lg"
                    }`}
                >
                    <AiOutlineShoppingCart size={20} />
                    {data?.stock === 0 || !data?.stock ? "Out of Stock" : "Add to Cart"}
                </button>
              </div>
            </div>

            {/* Inventory Distribution Meta Sales Flag Status */}
            {data?.stock <= 5 && data?.stock > 0 && (
                <p className="text-sm font-semibold text-amber-600 bg-amber-50 px-4 py-2 rounded-lg border border-amber-100 text-center">
                    ⚠️ Limited stock available! Only {data.stock} units left in inventory.
                </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailCard;