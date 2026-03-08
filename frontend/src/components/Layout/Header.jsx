import { useState } from 'react'
import { Link } from 'react-router-dom';
import { IoSearch } from "react-icons/io5";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { BiMenuAltLeft } from "react-icons/bi";
import { AiOutlineHeart, AiOutlineShoppingCart } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import styles from '../../styles/styles.js'
import DropDown from './DropDown.jsx'
import { categoriesData } from '../../static/data';
import Navbar from './Navbar.jsx';
import { useSelector } from 'react-redux';
import { BACKEND_URL } from '../../../server.js';
import Cart from '../Cart/Cart.jsx';
import WishList from '../WishList/WishList.jsx';
import { RxCross1 } from 'react-icons/rx';

const Header = ({ activeHeading }) => {
  const [searchText, setSearchText] = useState('');
  const [searchData, setSearchData] = useState(null);
  const [active, setActive] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [openWishList, setOpenWishList] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const { isAuthenticated, user } = useSelector(state => state.user);
  const { seller } = useSelector(state => state.seller);
  const { allProducts } = useSelector(state => state.product);
  const {cartItems} = useSelector(state => state.cart);
  const {wishlistItems} = useSelector(state => state.wishlist);

  const handleSearchTextChange = (e) => {
    const term = e.target.value;
    setSearchText(term);

    const filterProducts = allProducts.filter((product) =>
      product.name.toLocaleLowerCase().includes(term.toLocaleLowerCase())
    )
    setSearchData(filterProducts);
  }

  window.addEventListener('scroll', () => {
    setActive(window.scrollY > 70);
  })

  return (
    <>
      {/* Desktop Top Bar */}
      <div className={`${styles.section} sm:h-[35px] hidden sm:flex items-center justify-between sm:mt-5 bg-gradient-to-r from-teal-500 to-cyan-400 rounded-md shadow-md px-5 py-3`}>
        <div className='w-12'>
          <img src="https://img.freepik.com/premium-vector/online-shopping-logo-design-template-simple-minimal-style-mouse-cursor-with-bag-concepts_502185-289.jpg" alt="logo" className='w-full h-full object-cover rounded' />
        </div>
        <div className={`w-[50%] relative`}>
          <input
            type="text"
            className="w-full h-9 rounded-full px-3 outline-none ring-2 ring-teal-200 focus:ring-teal-400 shadow-sm"
            placeholder='Search product...'
            value={searchText}
            onChange={handleSearchTextChange}
          />
          <IoSearch size={22} className='absolute right-3 top-1.5 text-gray-600' />

          {searchData && searchData.length !== 0 ? (
            <div className={`${searchText.length === 0 ? 'hidden' : 'absolute'} z-20 w-full max-h-72 overflow-y-auto bg-white shadow-lg rounded-md mt-1`}>
              {searchData.map((i, index) => {
                const productName = i.name.replace(/\s+/g, "-");
                return (
                  <Link key={index} to={`/products/${productName}`}>
                    <div className="flex items-center p-2 hover:bg-teal-50 transition rounded-md">
                      <img src={`${BACKEND_URL}/${i.images[0]}`} alt="image" className='w-10 h-10 object-cover rounded-md mr-3' />
                      <h1 className="text-sm text-gray-700">{i.name}</h1>
                    </div>
                  </Link>
                )
              })}
            </div>
          ) : searchText.length !== 0 ? (
            <div className="absolute z-20 w-full bg-white shadow-md rounded-md mt-1 p-2 text-center text-gray-500">
              Not found
            </div>
          ) : null}
        </div>
        <div>
          <button className="bg-white hover:bg-gray-100 text-teal-700 px-4 py-1 rounded-full font-semibold shadow-md transition">
            <Link to={`/create-shop`} className='flex items-center gap-1'>
              <h1>Become Seller</h1>
              <IoIosArrowForward size={20} />
            </Link>
          </button>
        </div>
      </div>

      {/* Desktop Main Header */}
      <div className={`${active ? 'fixed top-0 left-0 shadow-xl' : 'md:mt-5'} hidden md:flex justify-center w-full z-20 bg-white transition`}>
        <div className={`${styles.section} ${styles.noramlFlex} relative justify-between py-2 md:h-[50px]`}>
          {/* Categories */}
          <div onClick={() => setDropDown(!dropDown)} className='hidden lg:block relative w-[270px] pt-1'>
            <BiMenuAltLeft size={28} className='absolute top-2 left-2 text-teal-500 cursor-pointer' />
            <button className='w-full flex justify-center items-center bg-teal-50 hover:bg-teal-100 font-medium px-2 py-2 rounded-md text-gray-800 shadow-sm'>
              All Categories
            </button>
            <IoIosArrowDown size={25} className='absolute top-3 right-2 cursor-pointer text-gray-700' />
            {dropDown && <DropDown categoriesData={categoriesData} setDropDown={setDropDown} />}
          </div>

          <div className={`${styles.noramlFlex}`}>
            <Navbar active={activeHeading} />
          </div>

          {/* Icons */}
          <div className='flex items-center gap-4'>
            <div className='relative cursor-pointer' onClick={() => setOpenWishList(true)}>
              <AiOutlineHeart size={26} className='text-gray-700 hover:text-red-500 transition' />
              <span className='absolute -top-1 -right-1 rounded-full bg-red-500 w-4 h-4 text-xs text-white flex items-center justify-center'>{wishlistItems?.length || 0}</span>
            </div>
            <div className='relative cursor-pointer' onClick={() => setOpenCart(!openCart)}>
              <AiOutlineShoppingCart size={26} className='text-gray-700 hover:text-teal-600 transition' />
              <span className='absolute -top-1 -right-1 rounded-full bg-teal-600 w-4 h-4 text-xs text-white flex items-center justify-center'>{cartItems?.length || 0}</span>
            </div>
            <div>
              {user ? (
                <Link to={'/profile'}>
                  <img src={`${BACKEND_URL}/${user.avatar.url}`} alt="profile" className='w-8 h-8 rounded-full border-2 border-teal-500' />
                </Link>
              ) : seller ? (
                <Link to={'/shop-dashboard'}>
                  <img src={`${BACKEND_URL}/${seller.avatar}`} alt="profile" className='w-8 h-8 rounded-full border-2 border-teal-500' />
                </Link>
              ) : (
                <Link to={'/login'}>
                  <CgProfile size={28} className='text-gray-700 hover:text-teal-500 transition' />
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Header */}
      <div className={`${styles.section} flex sm:hidden items-center justify-between mt-5 mb-2 bg-white shadow-md rounded-md px-3 py-2`}>
        <BiMenuAltLeft size={28} className='cursor-pointer text-teal-500' onClick={() => setOpenMenu(true)} />
        <div className='w-12'>
          <img src="https://img.freepik.com/premium-vector/online-shopping-logo-design-template-simple-minimal-style-mouse-cursor-with-bag-concepts_502185-289.jpg" alt="logo" className='w-full h-full object-cover rounded' />
        </div>
        <div className='relative cursor-pointer' onClick={() => setOpenCart(!openCart)}>
          <AiOutlineShoppingCart size={26} className='text-gray-700 hover:text-teal-600 transition' />
          <span className='absolute -top-1 -right-1 rounded-full bg-teal-600 w-4 h-4 text-xs text-white flex items-center justify-center'>0</span>
        </div>
      </div>

      {/* Mobile Menu */}
      {openMenu && (
        <div className='fixed top-0 left-0 w-full h-screen z-40 bg-black/30'>
          <div className='bg-white w-[70%] h-full pt-10 relative shadow-lg overflow-y-auto'>
            <RxCross1 size={25} className='absolute right-2 top-3 cursor-pointer text-gray-700' onClick={() => setOpenMenu(false)} />
            
            <div className='px-4 relative'>
              <input
                type="text"
                className='w-full h-9 px-3 rounded-full outline-none ring-2 ring-teal-200 focus:ring-teal-400 shadow-sm'
                placeholder='Search product...'
                value={searchText}
                onChange={handleSearchTextChange}
              />
              <IoSearch size={22} className='absolute right-3 top-2 text-gray-600' />

              {searchData && searchData.length !== 0 ? (
                <div className='absolute z-20 w-full max-h-72 overflow-y-auto bg-white shadow-lg rounded-md mt-1'>
                  {searchData.map((i, index) => {
                    const productName = i.name.replace(/\s+/g, "-");
                    return (
                      <Link key={index} to={`/products/${productName}`}>
                        <div className="flex items-center p-2 hover:bg-teal-50 transition rounded-md">
                          <img src={`${BACKEND_URL}/${i.images[0]}`} alt="image" className='w-10 h-10 object-cover rounded-md mr-3' />
                          <h1 className='text-gray-700'>{i.name}</h1>
                        </div>
                      </Link>
                    )
                  })}
                </div>
              ) : searchText.length !== 0 ? (
                <div className='absolute z-20 w-full bg-white shadow-md rounded-md mt-1 p-2 text-center text-gray-500'>
                  Not found
                </div>
              ) : null}
            </div>

            <Navbar active={activeHeading} />

            <div className='mt-5 px-4'>
              <button className='bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-md w-full flex items-center justify-center gap-2'>
                <Link to={`/create-shop`} className='flex items-center gap-1'>
                  <h1>Become Seller</h1>
                  <IoIosArrowForward size={20} />
                </Link>
              </button>
            </div>

            <div className='mt-6 flex justify-center items-center gap-4 px-4'>
              {isAuthenticated ? (
                <Link to={'/profile'}>
                  <img src={`${BACKEND_URL}/${user.avatar.url}`} alt="profile" className='w-12 h-12 rounded-full border-2 border-teal-500 object-cover' />
                </Link>
              ) : (
                <>
                  <Link to={'/login'} className='font-semibold text-teal-600 hover:underline'>Sign in</Link>
                  <Link to={'/sign-up'} className='font-semibold text-teal-600 hover:underline'>Sign up</Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Cart & Wishlist */}
      {openCart && <Cart setOpenCart={setOpenCart} />}
      {openWishList && <WishList setOpenWishList={setOpenWishList} />}
    </>
  )
}

export default Header;