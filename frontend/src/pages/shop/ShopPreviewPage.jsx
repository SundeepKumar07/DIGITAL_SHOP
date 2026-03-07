import styles from "../../styles/styles";
import ShopInfo from "../../components/Shop/ShopInfo";
import ShopProfileData from "../../components/Shop/ShopProfileData";
import { useEffect, useState } from "react";
import { FaBars } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "axios";
import { server } from "../../../server";

const ShopPreviewPage = () => {
  const [open, setOpen] = useState(false);
  const [seller, setSeller] = useState(null);
  const [sellerLoading, setSellerLoading] = useState(true);

  const { allProducts, isLoading } = useSelector((state) => state.product);

  const params = useParams();
  const id = params.id;

  // fetch shop info
  useEffect(() => {
    const fetchShop = async () => {
      try {
        const res = await axios.get(`${server}/shop/find/${id}`);
        setSeller(res.data.shop);
        setSellerLoading(false);
      } catch (error) {
        console.error("Error fetching shop:", error);
        setSellerLoading(false);
      }
    };

    if (id) {
      fetchShop();
    }
  }, [id]);

  // filter products belonging to this shop
  const products = allProducts?.filter((item) => item.shopId === id);

  return (
    <div className={`${styles.section} bg-[#f5f5f5] min-h-screen`}>
      <div className="flex flex-col md:flex-row gap-6 w-full py-4 sm:py-6">

        {/* Sidebar */}
        <div className="relative w-full md:w-[25%]">

          {/* Desktop Sidebar */}
          <div className="hidden sm:block bg-white rounded-lg shadow-sm overflow-y-auto h-[90vh] sticky top-4 p-4">
            {!sellerLoading && (
              <ShopInfo isOwner={false} seller={seller} products={products} />
            )}
          </div>

          {/* Mobile Toggle */}
          <div className="sm:hidden absolute top-0 right-0 z-20">
            <FaBars
              size={25}
              onClick={() => setOpen(true)}
              className="cursor-pointer"
            />
          </div>

          {/* Mobile Drawer */}
          {open && (
            <div className="overflow-y-scroll fixed top-0 right-0 h-full w-3/4 max-w-xs bg-white shadow-lg z-30 flex flex-col p-4">
              <div className="flex justify-end mb-4">
                <RxCross2
                  size={25}
                  onClick={() => setOpen(false)}
                  className="cursor-pointer"
                />
              </div>

              {!sellerLoading && (
                <ShopInfo isOwner={false} seller={seller} products={products} />
              )}
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className="w-full md:w-[72%] bg-white rounded-lg shadow-sm p-6 mt-2 sm:mt-0">
          <ShopProfileData isOwner={false} shopId={id}/>
        </div>

      </div>
    </div>
  );
};

export default ShopPreviewPage;