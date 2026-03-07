import styles from '../../styles/styles';
import ShopInfo from "../../components/Shop/ShopInfo";
import ShopProfileData from "../../components/Shop/ShopProfileData";
import { useEffect, useState } from "react";
import { FaBars } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from 'react-redux';
import { getShopAllProducts } from '../../redux/actions/productAction';

const ShopHomePage = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  //============================ useEffects =========================
  const {products} = useSelector(state => state.product);
  const {sellerLoading, seller} = useSelector(state => state.seller);

  useEffect(() => {
    if (seller && seller._id) {
      dispatch(getShopAllProducts(seller._id));
    }
  }, [seller]);

  return (
    <div className={`${styles.section} bg-[#f5f5f5] min-h-screen`}>
      <div className="flex flex-col md:flex-row gap-6 w-full py-4 sm:py-6">

        {/* Sidebar */}
        <div className="relative w-full md:w-[25%]">
          {/* Sidebar for desktop */}
          <div className="hidden sm:block bg-white rounded-lg shadow-sm overflow-y-auto h-[90vh] sticky top-4 p-4">
            <ShopInfo isOwner={true} seller={seller} products={products}/>
          </div>

          {/* Mobile sidebar toggle button */}
          <div className="sm:hidden absolute top-0 right-0 z-20">
            <FaBars size={25} onClick={() => setOpen(true)} className="cursor-pointer" />
          </div>

          {/* Mobile sidebar drawer */}
          {open && (
            <div className="overflow-y-scroll fixed top-0 right-0 h-full w-3/4 max-w-xs bg-white shadow-lg z-30 flex flex-col p-4 animate-slide-in">
              <div className="flex justify-end mb-4">
                <RxCross2 size={25} onClick={() => setOpen(false)} className="cursor-pointer" />
              </div>
              {!sellerLoading && <ShopInfo isOwner={true} seller={seller} products={products} />}
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className="w-full md:w-[72%] bg-white rounded-lg shadow-sm p-6 mt-2 sm:mt-0">
          <ShopProfileData isOwner={true} shopId={seller._id} />
        </div>

      </div>
    </div>
  );
}
export default ShopHomePage;