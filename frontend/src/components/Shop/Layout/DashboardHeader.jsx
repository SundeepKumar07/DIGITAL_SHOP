import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { AiOutlineGift } from 'react-icons/ai';
import { MdOutlineLocalOffer } from 'react-icons/md';
import { BiMessageSquareDetail } from 'react-icons/bi';
import { FiPackage, FiShoppingBag } from 'react-icons/fi';
import { BACKEND_URL } from '../../../../server';

const DashboardHeader = () => {
  const { seller } = useSelector(state => state.seller);
  return (
    <div className='w-full h-[80px] bg-white shadow sticky top-0 left-0 z-30 flex items-center justify-between px-4'>
      <div>
        <Link to={'/shop-dashboard'}>
          <img src="https://img.freepik.com/premium-vector/online-shopping-logo-design-template-simple-minimal-style-mouse-cursor-with-bag-concepts_502185-289.jpg" alt="" className='w-[80px]' />
        </Link>
      </div>
      <div className='flex items-center'>
        <div className='flex items-center mr-4'>
          <Link to={'/shop-dashboard/cupouns'}>
            <AiOutlineGift
              size={30}
              color='#555'
              className='mx-5 cursor-pointer'
            />
          </Link>
          <Link to={'/shop-dashboard-events'}>
            <MdOutlineLocalOffer
              size={30}
              color='#555'
              className='mx-5 cursor-pointer'
            />
          </Link>
          <Link to={'/shop-dashboard-products'}>
            <FiShoppingBag
              size={30}
              color='#555'
              className='mx-5 cursor-pointer'
            />
          </Link>
          <Link to={'/shop-dashboard-orders'}>
            <FiPackage
              size={30}
              color='#555'
              className='mx-5 cursor-pointer'
            />
          </Link>
          <Link to={'/shop-dashboard-messages'}>
            <BiMessageSquareDetail
              size={30}
              color='#555'
              className='mx-5 cursor-pointer'
            />
          </Link>
          <Link to={`/shop-homepage`}>
            <img src={`${BACKEND_URL}/${seller.avatar}`} alt=""
              className='w-[45px] h-[45px] rounded-full object-cover'
            />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default DashboardHeader