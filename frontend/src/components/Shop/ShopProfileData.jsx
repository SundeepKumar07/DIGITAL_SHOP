import React, { useEffect, useState } from "react";
import ProductCard from "../Route/ProductCard/ProductCard";
import styles from "../../styles/styles";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const ShopProfileData = ({ isOwner, shopId }) => {
  const [active, setActive] = useState(1);
  const { isLoading, allProducts, error } = useSelector(state => state.product);
  // filter products belonging to this shop
  const products = allProducts?.filter((item) => item.shopId === shopId);

  return (
    <div className="w-full">

      {/* Tabs */}
      <div className="flex flex-col sm:flex-row w-full justify-between border-b-2 pb-2">
        <div className="flex w-full px-2 gap-2 flex-wrap mb-2 md:mb-0">

          <h5
            onClick={() => setActive(1)}
            className={`font-[600] text-[20px] ${active === 1 ? "text-red-500" : "text-[#000000a6]"
              } cursor-pointer`}
          >
            Shop Products
          </h5>

          <h5
            onClick={() => setActive(2)}
            className={`font-[600] text-[20px] ${active === 2 ? "text-red-500" : "text-[#000000a6]"
              } cursor-pointer`}
          >
            Shop Events
          </h5>

          <h5
            onClick={() => setActive(3)}
            className={`font-[600] text-[20px] ${active === 3 ? "text-red-500" : "text-[#000000a6]"
              } cursor-pointer`}
          >
            Shop Reviews
          </h5>
        </div>

        {isOwner && (
          <Link
            to={`/shop-dashboard`}
            className={`${styles.button} !h-[42px] !m-0 !rounded-[4px]`}
          >
            Go Dashboard
          </Link>
        )}
      </div>

      <br />

      {/* PRODUCTS TAB */}
      {active === 1 && (
        <>
          {isLoading ? (
            <h2 className="text-center py-10">Loading...</h2>
          ) : error ? (
            <h2 className="text-center text-red-500 py-10">{error}</h2>
          ) : (
            <div className="grid grid-cols-1 gap-[12px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] xl:grid-cols-4 xl:gap-[20px]">
              {products && products.length > 0 ? (
                products.map((product) => (
                  <ProductCard data={product} key={product._id} />
                ))
              ) : (
                <h3 className="text-center w-full col-span-full">
                  No products found
                </h3>
              )}
            </div>
          )}
        </>
      )}

      {/* EVENTS TAB */}
      {active === 2 && (
        <div className="text-center py-10">
          Events section coming soon...
        </div>
      )}

      {/* REVIEWS TAB */}
      {active === 3 && (
        <div className="text-center py-10">
          Reviews section coming soon...
        </div>
      )}
    </div>
  );
};

export default ShopProfileData;