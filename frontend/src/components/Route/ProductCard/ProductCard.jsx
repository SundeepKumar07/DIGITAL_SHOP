import { useState } from "react";
import { Link } from 'react-router-dom';
import styles from "../../../styles/styles.js";
import { AiFillHeart, AiFillStar, AiOutlineEye, AiOutlineHeart, AiOutlineShoppingCart, AiOutlineStar } from "react-icons/ai";
import ProductDetailCard from "../ProductDetailCard/ProductDetailCard.jsx";

const ProductCard = ({data}) => {
  const [click, setClick] = useState(false);
  const [open, setOpen] = useState(false);

  const d = data.name;
  const productName = data?.name ? data.name.replace(/\s+/g, "-") : "";
  return (
    <>
    <div className={`w-full h-[370px] lg:h-[375px] bg-white rounded-lg p-3 shadow-sm cursor-pointer relative`}>
      <div className="justify-end">

      </div>
      <Link to={`/products/${productName}`}>
        <img src={data.image_Url[0].url} alt=""
        className={`w-full h-[170px] object-contain`}
        />
      </Link>
      <Link to={`/`}>
        <h5 className={`${styles.shop_name}`}>{data.shop.name}</h5>
      </Link>
      <Link to={`/products/${productName}`}>
        <h4 className="pb-4 font-[500">
          {data.name.length > 40 ? data.name.slice(0, 40) + "...": data.name}
        </h4>
        <div className="flex">
          <AiFillStar
            size={20}
            className="cursor-pointer" 
            color="#F6BA00"
          />
          <AiOutlineStar
            size={20}
            className="cursor-pointer" 
            color="#F6BA00"
          />
        </div>

        <div className={`py-2 flex items-center justify-between`}>
          <div className="flex">
            <h5 className={`${styles.productDiscountPrice}`}>
              {(data.price === 0? data.price : data.discount_price) + " PKR"}
            </h5>
            <h4 className={`${styles.price}`}>
              {data.price ? data.price + " PKR": null}
            </h4>
            <span className="font-[400] text-[17px] text-[#68d284]">
              {data.total_sell} sold
            </span>
          </div>
        </div>
      </Link>
        {/* side options  */}
      <div>
        {
          click?
          <AiFillHeart
            size={22}
            onClick={() => setClick(false)}
            className={`cursor-pointer absolute right-2 top-2`}
            color= {click? "red" : "#333"}
            title="Remove from wish list"
          />
          : <AiOutlineHeart
            size={22}
            onClick={() => setClick(true)}
            className={`cursor-pointer absolute right-2 top-2`}
            color= {click? "red" : "#333"}
            title="Add in to wish list"
          />
        }
          <AiOutlineEye
            size={22}
            onClick={() => setOpen(!open)}
            className={`cursor-pointer absolute right-2 top-14`}
            color= {"#333"}
            title="Quick view"
          />
          <AiOutlineShoppingCart
            size={22}
            onClick={() => setOpen(!open)}
            className={`cursor-pointer absolute right-2 top-26`}
            color= {"#444"}
            title="Add to cart"
          />

          {/* open functionality  */}
          {
            open &&
              <ProductDetailCard open={open} setOpen={setOpen} data={data} />
          }
      </div>
    </div>
    </>
  )
}

export default ProductCard