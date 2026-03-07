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
import { BACKEND_URL } from "../../../../server.js";
import { useDispatch, useSelector } from "react-redux";
import { addToWishlist, removeFromWishlist } from "../../../redux/slices/wishListSlice.js";
import { addToCart } from "../../../redux/slices/cartSlice.js";
import { toast } from "react-toastify";

const ProductCard = ({ data }) => {
  const [click, setClick] = useState(false);
  const [open, setOpen] = useState(false);

  if (!data) return null;

  const imageUrl = data?.images && data.images.length > 0 ? data.images[0] : "/placeholder.png";
  const discountPercentage =
    data?.originalPrice && data?.discountPrice
      ? Math.round(((data.originalPrice - data.discountPrice) / data.originalPrice) * 100)
      : 0;

  const { wishlistItems } = useSelector((state) => state.wishlist);
  const cartItems = useSelector((state) => state.cart?.cartItems || []);
  const dispatch = useDispatch();

  // Check if product is in wishlist on load
  useEffect(() => {
    const isInWishList = wishlistItems.find((i) => i._id === data._id);
    setClick(!!isInWishList);
  }, [wishlistItems, data._id]);

  // Toggle wishlist
  const toggleWishlist = () => {
    if (click) {
      dispatch(removeFromWishlist(data._id));
      setClick(false);
    } else {
      dispatch(addToWishlist(data));
      setClick(true);
    }
  };

  // Add to cart
  const handleAddToCart = () => {
    const isItemExist = cartItems.find((i) => i._id === data._id);
    if (isItemExist) {
      toast.error("Item already in cart");
      return;
    }
    dispatch(addToCart({ ...data, qty: 1 }));
    toast.success("Item added to cart");
  };

  return (
    <>
      <div className="relative w-full h-[370px] lg:h-[375px] bg-white rounded-lg p-3 shadow-md cursor-pointer hover:shadow-lg transition-shadow">
        
        {/* Product Image */}
        <Link to={`/products/${data._id}`}>
          <img
            src={`${BACKEND_URL}/${imageUrl}`}
            alt={data?.name}
            className="w-full h-[170px] object-contain mb-2"
          />
        </Link>

        {/* Shop Name */}
        <h5 className={`${styles.shop_name} text-gray-500 text-sm`}>
          {data?.shop?.name || "Not specified"}
        </h5>

        {/* Product Name */}
        <Link to={`/products/${data._id}`}>
          <h4 className="pb-2 font-[500] text-sm md:text-base">
            {data?.name?.length > 40 ? data.name.slice(0, 40) + "..." : data?.name}
          </h4>
        </Link>

        {/* Rating */}
        <div className="flex items-center mb-1">
          <AiFillStar size={16} color="#F6BA00" />
          <AiOutlineStar size={16} color="#F6BA00" className="ml-1" />
        </div>

        {/* Price Section */}
        <div className="py-1 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h5 className={`${styles.productDiscountPrice} text-sm`}>
              {data?.discountPrice} PKR
            </h5>
            <h4 className={`${styles.price} text-xs text-gray-500 line-through`}>
              {data?.originalPrice} PKR
            </h4>
            {discountPercentage > 0 && (
              <span className="text-[12px] text-green-600">-{discountPercentage}%</span>
            )}
          </div>
        </div>

        {/* Sold Count */}
        <span className="font-[400] text-[12px] text-[#68d284]">{data?.sold_out || 0} sold</span>

        {/* Action Buttons */}
        <div className="absolute top-2 right-2 flex flex-col gap-2">
          {click ? (
            <AiFillHeart
              size={20}
              onClick={toggleWishlist}
              className="cursor-pointer"
              color="red"
              title="Remove from wishlist"
            />
          ) : (
            <AiOutlineHeart
              size={20}
              onClick={toggleWishlist}
              className="cursor-pointer"
              color="#333"
              title="Add to wishlist"
            />
          )}

          <AiOutlineEye
            size={20}
            onClick={() => setOpen(true)}
            className="cursor-pointer"
            color="#333"
            title="Quick view"
          />

          <AiOutlineShoppingCart
            size={20}
            onClick={handleAddToCart}
            className="cursor-pointer"
            color="#444"
            title="Add to cart"
          />
        </div>

        {/* Quick View Modal */}
        {open && <ProductDetailCard open={open} setOpen={setOpen} data={data} />}
      </div>
    </>
  );
};

export default ProductCard;