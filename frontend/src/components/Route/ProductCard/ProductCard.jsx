import { useState } from "react";
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

const ProductCard = ({ data }) => {
  const [click, setClick] = useState(false);
  const [open, setOpen] = useState(false);

  if (!data) return null;

  const productName = data?.name
    ? data.name.replace(/\s+/g, "-").toLowerCase()
    : "";

  const imageUrl =
    data?.images && data.images.length > 0
      ? data.images[0]
      : "/placeholder.png";

  const discountPercentage =
    data?.originalPrice && data?.discountPrice
      ? Math.round(
          ((data.originalPrice - data.discountPrice) /
            data.originalPrice) *
            100
        )
      : 0;

  return (
    <>
      <div className="w-full h-[370px] lg:h-[375px] bg-white rounded-lg p-3 shadow-sm cursor-pointer relative">
        
        {/* Image */}
        <Link to={`/products/${data._id}`}>
          <img
            src={`${BACKEND_URL}/${imageUrl}`}
            alt={data?.name}
            className="w-full h-[170px] object-contain"
          />
        </Link>

        {/* Shop Name */}
        <h5 className={`${styles.shop_name}`}>
          {data?.shop?.name || "Not specified"}
        </h5>

        {/* Product Name */}
        <Link to={`/products/${productName}`}>
          <h4 className="pb-2 font-[500]">
            {data?.name?.length > 40
              ? data.name.slice(0, 40) + "..."
              : data?.name}
          </h4>
        </Link>

        {/* Rating (Static for now) */}
        <div className="flex">
          <AiFillStar size={20} color="#F6BA00" />
          <AiOutlineStar size={20} color="#F6BA00" />
        </div>

        {/* Price Section */}
        <div className="py-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h5 className={`${styles.productDiscountPrice}`}>
              {data?.discountPrice} PKR
            </h5>

            <h4 className={`${styles.price}`}>
              {data?.originalPrice} PKR
            </h4>

            {discountPercentage > 0 && (
              <span className="text-[14px] text-green-600">
                -{discountPercentage}%
              </span>
            )}
          </div>
        </div>

        {/* Sold Count */}
        <span className="font-[400] text-[15px] text-[#68d284]">
          {data?.sold_out || 0} sold
        </span>

        {/* Side Icons */}
        <div>
          {click ? (
            <AiFillHeart
              size={22}
              onClick={() => setClick(false)}
              className="cursor-pointer absolute right-2 top-2"
              color="red"
              title="Remove from wish list"
            />
          ) : (
            <AiOutlineHeart
              size={22}
              onClick={() => setClick(true)}
              className="cursor-pointer absolute right-2 top-2"
              color="#333"
              title="Add to wish list"
            />
          )}

          <AiOutlineEye
            size={22}
            onClick={() => setOpen(true)}
            className="cursor-pointer absolute right-2 top-14"
            color="#333"
            title="Quick view"
          />

          <AiOutlineShoppingCart
            size={22}
            className="cursor-pointer absolute right-2 top-24"
            color="#444"
            title="Add to cart"
          />

          {open && (
            <ProductDetailCard
              open={open}
              setOpen={setOpen}
              data={data}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default ProductCard;