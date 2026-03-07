import { useEffect, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import styles from "../../../styles/styles";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../../redux/slices/cartSlice";
import { addToWishlist, removeFromWishlist } from "../../../redux/slices/wishListSlice.js";
import { toast } from "react-toastify";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { BACKEND_URL } from "../../../../server.js";

const ProductDetailCard = ({ open, setOpen, data }) => {
  const {cartItems} = useSelector(state => state.cart);
  const {wishlistItems} = useSelector(state => state.wishlist);
  const dispatch = useDispatch();
  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);

//=================== setting wishlist ==================
useEffect(() => {
  const isInWishList = wishlistItems.find(i => i._id === data._id);
  if(isInWishList) setClick(true);
}, [wishlistItems]);


//===================== data rendering =======================
  if (!data) return null;

  const imageUrl =
    data?.images && data.images.length > 0
      ? `${BACKEND_URL}/${data.images[0]}`
      : "/placeholder.png";

  const discountPercentage =
    data?.originalPrice && data?.discountPrice
      ? Math.round(
        ((data.originalPrice - data.discountPrice) /
          data.originalPrice) *
        100
      )
      : 0;

//==================== increment decrement ====================
  const setDecrement = () => {
    if (count > 1) setCount(count - 1);
  };

  const setIncrement = () => {
    if (count < (data.stock || 1)) {
      setCount(count + 1);
    }
  };

  //================== Add To Cart Function =====================
  const handleAddToCart = () => {
    const isItemExist = cartItems && cartItems.find(i => i._id === data._id)
    if(isItemExist){
      toast.error("Product already in Cart");
      return;
    }
    if (data.stock < count) {
      toast.error("Product stock limited!");
      return;
    }

    const cartData = {
      ...data,
      qty: count,
    };

    dispatch(addToCart(cartData));
    toast.success("Item added to cart!");
  };

  //================== Toggle Wish list ======================
  const toggleWishlist = () => {
    if (click) {
      dispatch(removeFromWishlist(data._id));
      setClick(false);
    } else {
      dispatch(addToWishlist(data));
      setClick(true);
    }
  };


  return (
    <div className="fixed w-full h-screen top-0 left-0 bg-[#00000030] z-40 flex items-center justify-center">
      <div className="w-[90%] lg:w-[60%] h-[90vh] overflow-y-auto md:h-[75vh] bg-white rounded-md p-4 relative">

        {/* Close Button */}
        <RxCross1
          size={25}
          className="absolute right-3 top-3 z-50 cursor-pointer"
          onClick={() => setOpen(false)}
        />

        <div className="block w-full md:flex">

          {/* LEFT SIDE */}
          <div className="w-full md:w-[40%]">
            <img src={imageUrl} alt={data?.name} className="pr-2" />

            {/* Shop Info */}
            {data?.shop && (
              <div className="flex items-center pt-2">
                <div>
                  <h3 className="text-blue-400 text-[15px]">
                    {data.shop.name}
                  </h3>
                </div>
              </div>
            )}

            <div className="mt-5">
              <button className="bg-black text-white flex gap-2 items-center rounded px-3 py-2">
                Send Message <AiOutlineMessage />
              </button>
            </div>

            <h3 className="text-[16px] text-red-500 mt-5">
              ({data?.sold_out || 0}) sold
            </h3>
          </div>

          {/* RIGHT SIDE */}
          <div className="w-full md:w-[60%] pt-5 pr-[3px]">
            <h1 className={`${styles.productTitle} text-[18px]`}>
              {data?.name}
            </h1>

            <p className="mt-2 text-gray-600">
              {data?.description}
            </p>

            {/* Price Section */}
            <div className="flex mt-5 items-center gap-3">
              <h3 className={styles.productDiscountPrice}>
                {data?.discountPrice} PKR
              </h3>

              <h4 className={styles.price}>
                {data?.originalPrice} PKR
              </h4>

              {discountPercentage > 0 && (
                <span className="text-green-600 text-sm">
                  -{discountPercentage}%
                </span>
              )}
            </div>

            {/* Quantity + Wishlist */}
            <div className="flex items-center justify-between mt-5 pr-3 w-full">

              {/* Quantity */}
              <div>
                <button
                  className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-r px-4 py-2"
                  onClick={setDecrement}
                >
                  -
                </button>

                <button className="bg-gray-200 text-gray-800 px-4 py-[11px] font-medium">
                  {count}
                </button>

                <button
                  className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-l px-4 py-2"
                  onClick={setIncrement}
                >
                  +
                </button>
              </div>

              {/* Wishlist */}
              {click ? (
                <AiFillHeart
                  size={22}
                  onClick={toggleWishlist}
                  color="red"
                  className="cursor-pointer"
                />
              ) : (
                <AiOutlineHeart
                  size={22}
                  onClick={toggleWishlist}
                  className="cursor-pointer"
                />
              )}
            </div>

            {/* Add To Cart */}
            <div className="mt-5">
              <button
                onClick={handleAddToCart}
                disabled={data?.stock === 0}
                className={`flex gap-2 items-center rounded px-3 py-2 text-white ${data?.stock === 0
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-black"
                  }`}
              >
                {data?.stock === 0 ? "Out of Stock" : "Add to Cart"}
                <AiOutlineShoppingCart />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailCard;