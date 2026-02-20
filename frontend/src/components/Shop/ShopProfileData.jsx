import React, { useState } from 'react'
import { productData } from '../../static/data';
import ProductCard from '../Route/ProductCard/ProductCard';
import styles from '../../styles/styles';
import { Link } from 'react-router-dom';

const ShopProfileData = ({ isOwner }) => {
  const [active, setActive] = useState(1);
  return (
    <div className='w-full'>
      <div className="flex w-full justify-between">
        <div className='flex w-full px-2 gap-2'>
          <div className="flex items-center pr-[20px]">
            <h5 onClick={() => setActive(1)} className={`font-[600] text-[20px] ${active == 1 ? 'text-red-500' : 'text-[#000000a6]'} cursor-pointer`}>
              Shop Products
            </h5>
          </div>
          <div className="flex items-center pr-[20px]">
            <h5 onClick={() => setActive(2)} className={`font-[600] text-[20px] ${active == 2 ? 'text-red-500' : 'text-[#000000a6]'} cursor-pointer`}>
              Shop Evens
            </h5>
          </div>
          <div className="flex items-center pr-[20px]">
            <h5 onClick={() => setActive(3)} className={`font-[600] text-[20px] ${active == 3 ? 'text-red-500' : 'text-[#000000a6]'} cursor-pointer`}>
              Shop Reviews
            </h5>
          </div>
        </div>
        {
          isOwner && (
            <Link to={`/shop-dashboard`} className={`${styles.button} !h-[42px] !m-0 !rounded-[4px]`}>
              Go Dasboard
            </Link>
          )
        }
      </div>
      <br />
      <div className="grid grid-cols-1 gap-[12px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] xl:grid-cols-4 xl:gap-[20px]">
        {
          productData && productData.map((i, index) => (
            <ProductCard data={i} key={index} />
          ))
        }
      </div>
    </div>
  )
}

export default ShopProfileData