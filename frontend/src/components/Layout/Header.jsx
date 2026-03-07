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

  const {allProducts} = useSelector(state => state.product);

  const handleSearchTextChange = (e) => {
    const term = e.target.value;
    setSearchText(term);

    const filterProducts = allProducts.filter((product) =>
      product.name.toLocaleLowerCase().includes(term.toLocaleLowerCase())
    )
    setSearchData(filterProducts);
  }

  //scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 70) {
      setActive(true);
    } else {
      setActive(false);
    }
  })
  return (
    <>
      <div>
        <div className={`${styles.section} sm:h-[25px] hidden sm:flex items-center justify-between sm:mt-5`}>
          <div className='w-12'>
            <img src="https://img.freepik.com/premium-vector/online-shopping-logo-design-template-simple-minimal-style-mouse-cursor-with-bag-concepts_502185-289.jpg" alt="logo" className='w-full h-full' />
          </div>
          <div className={`w-[50%] relative`}>
            <input
              type="text"
              className={`w-full ring-2 ring-blue-300 outline-none focus:ring-blue-500 h-8 rounded bg-white p-2`}
              placeholder='Search product...'
              value={searchText}
              onChange={handleSearchTextChange}
            />
            <IoSearch size={25} className='absolute right-2 top-1' />
            {
              searchData && searchData.length !== 0 ? (
                <div className={`${searchText.length === 0 ? 'hidden' : 'absolute'} min-h-[30vh] bg-slate-50 shadow-sm  z-9 p-4`}>
                  {searchData.map((i, index) => {
                    const d = i.name;
                    const productName = d.replace(/\s+/g, "-");
                    return (
                      <Link key={index} to={`/products/${productName}`}>
                        <div class="full flex items-start py-2 hover:bg-gray-200">
                          <img src={`${BACKEND_URL}/${i.images[0]}`} alt="image" className='w-[40px] h-[40px] m-[10px]' />
                          <h1>{i.name}</h1>
                        </div>
                      </Link>
                    )
                  })}
                </div>
              ) : (
                <div className={`${searchText.length === 0 ? 'hidden' : 'absolute'} w-full bg-slate-50 shadow-sm  z-9 p-4`}>
                  Not found
                </div>
              )
            }
          </div>
          <div>
            <button className={`${styles.button}`}>
              <Link to={`/create-shop`} className='flex'>
                <h1>Become Seller</h1>
                <IoIosArrowForward size={25} />
              </Link>
            </button>
          </div>
        </div>

        <div className={`${active && 'fixed top-0 left-0 shadow-sm'} transition hidden w-full md:flex justify-center items-center h-[60px] bg-blue-700 z-10 ${active ? "m-0" : "md:mt-[20px]"}`}>
          <div className={`${styles.section} ${styles.noramlFlex} relative justify-between md:h-[45px] w-full`}>
            {/* categories */}
            <div onClick={() => setDropDown(!dropDown)} className='hidden lg:block relative mt-[10px] w-[270px] pt-2 pl-2 h-full'>
              <BiMenuAltLeft size={30} className='absolute top-3 left-2 cursor-pointer' />
              <button className='w-full flex justify-center items-center bg-white font-sans text-lg font-[500] px-2 py-2'>
                All Categories
              </button>
              <IoIosArrowDown
                size={30}
                className='absolute top-4 right-2 cursor-pointer'
              />
              {
                dropDown && (
                  <DropDown
                    categoriesData={categoriesData}
                    setDropDown={setDropDown}
                  />
                )
              }
            </div>
            <div className={`${styles.noramlFlex}`}>
              <Navbar active={activeHeading} />
            </div>
            <div className='flex'>
              <div className={styles.noramlFlex}>
                <div className='relative cursor-pointer mr-[15px]'>
                  <AiOutlineHeart
                    size={30}
                    color='rgb(255 2555 255/83%)'
                    onClick={() => setOpenWishList(true)}
                  />
                  <span className='absolute right-0 top-0 rounded-full bg-green-400 w-4 h-4 text-white font-mono leading-tight flex items-center justify-center'>
                    0
                  </span>
                </div>
              </div>
              <div className={styles.noramlFlex}>
                <div className='relative cursor-pointer mr-[15px]' onClick={() => setOpenCart(!openCart)}>
                  <AiOutlineShoppingCart
                    size={30}
                    color='rgb(255 2555 255/83%)'
                  />
                  <span className='absolute right-0 top-0 rounded-full bg-green-400 w-4 h-4 text-white font-mono leading-tight flex items-center justify-center'>
                    0
                  </span>
                </div>
              </div>
              <div className={styles.noramlFlex}>
                {user ? (
                  <Link to={'/profile'} className='relative cursor-pointer mr-[15px]'>
                    <img src={`${BACKEND_URL}/${user.avatar.url}`} alt="profile" className='w-8 h-8 rounded-full' />
                  </Link>
                ) : seller ? (
                  <Link to={'/shop-homepage'} className='relative cursor-pointer mr-[15px]'>
                    <img src={`${BACKEND_URL}/${seller.avatar}`} alt="profile" className='w-8 h-8 rounded-full' />
                  </Link>
                ) : (
                  <Link to={'/login'} className='relative cursor-pointer mr-[15px]'>
                    <CgProfile
                      size={30}
                      color='rgb(255 2555 255/83%)'
                    />
                  </Link>
                )
                }
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cart and WishList  */}
      {
        openCart && <Cart setOpenCart={setOpenCart} />
      }
      {
        openWishList && <WishList setOpenWishList={setOpenWishList} />
      }


      {/* mobile header  */}
      <div>
        <div className={`${styles.section} h-[25px] flex sm:hidden items-center justify-between mt-5 mb-2`}>
          <div>
            <BiMenuAltLeft size={30} className='absolute top-3 left-2 cursor-pointer' onClick={() => setOpenMenu(true)} />
          </div>
          <div className='w-12'>
            <img src="https://img.freepik.com/premium-vector/online-shopping-logo-design-template-simple-minimal-style-mouse-cursor-with-bag-concepts_502185-289.jpg" alt="logo" className='w-full h-full' />
          </div>
          <div className='relative cursor-pointer mr-[15px]' onClick={() => setOpenCart(!openCart)}>
            <AiOutlineShoppingCart
              size={30}
              color=''
            />
            <span className='absolute right-0 top-0 rounded-full bg-green-400 w-4 h-4 text-white font-mono leading-tight flex items-center justify-center'>
              0
            </span>
          </div>
        </div>
      </div>

      {/* openMenu  */}
      {openMenu && (
        <div className='relative'>
          <div className='w-full fixed top-0 left-0 bg-black/29 z-40 h-screen'>
            <div className='bg-white w-[70%] absolute top-0 left-0 h-screen overflow-y-scroll pt-10'>
              <RxCross1 size={25} onClick={() => setOpenMenu(false)} className='absolute right-0 top-2 cursor-pointer' />
              <div className={`w-full relative pt-2 px-2`}>
                <input
                  type="text"
                  className={`w-full ring-2 ring-blue-300 outline-none focus:ring-blue-500 h-8 rounded bg-white p-2`}
                  placeholder='Search product...'
                  value={searchText}
                  onChange={handleSearchTextChange}
                />
                <IoSearch size={25} className='absolute right-3 top-3' />
                {
                  searchData && searchData.length !== 0 ? (
                    <div className={`${searchText.length === 0 ? 'hidden' : 'absolute'} min-h-[30vh] bg-slate-50 shadow-sm  z-9 py-2`}>
                      {searchData.map((i, index) => {
                        const d = i.name;
                        const productName = d.replace(/\s+/g, "-");
                        return (
                          <Link key={index} to={`/products/${productName}`}>
                            <div class="full flex items-center py-2 hover:bg-gray-200">
                              <img src={i.image_Url[0].url} alt="image" className='w-[40px] h-[40px]' />
                              <h1>{i.name}</h1>
                            </div>
                          </Link>
                        )
                      })}
                    </div>
                  ) : (
                    <div className={`${searchText.length === 0 ? 'hidden' : 'absolute'} w-full bg-slate-50 shadow-sm  z-9 p-4`}>
                      Not found
                    </div>
                  )
                }
              </div>
              <Navbar active={activeHeading} />
              <div>
                <button className={`bg-black text-white py-2 ml-3 mt-4 pl-2 rounded-[5px]`}>
                  <Link to={`/create-shop`} className='flex'>
                    <h1>Become Seller</h1>
                    <IoIosArrowForward size={25} />
                  </Link>
                </button>
              </div>
              <div className='mt-10 flex justify-center items-center gap-2'>
                {isAuthenticated ? (
                  <Link to={'/profile'}>
                    <img src={`${BACKEND_URL}/${user.avatar.url}`} alt="profile" className='w-[50px] h-[50px] rounded-full object-cover border-[3px] border-[#3ed132]' />
                  </Link>
                ) : (
                  <>
                    <Link to={'/login'} className='font-[700]' >
                      Sign in
                    </Link>
                    <Link to={'/sign-up'} className='font-[700]' >
                      Sign up
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div >
      )}
    </>
  )
}

export default Header