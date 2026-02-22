import styles from '../../styles/styles';
import ShopInfo from "../../components/Shop/ShopInfo";
import ShopProfileData from "../../components/Shop/ShopProfileData";
import { useState } from "react";
import { FaBars } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";

const ShopHomePage = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className={`${styles.section} bg-[#f5f5f5] min-h-screen`}>
      <div className="flex flex-col md:flex-row gap-6 w-full py-4 sm:py-6">

        {/* Sidebar */}
        <div className="relative w-full md:w-[25%]">
          {/* Sidebar for desktop */}
          <div className="hidden sm:block bg-white rounded-lg shadow-sm overflow-y-auto h-[90vh] sticky top-4 p-4">
            <ShopInfo isOwner={true} />
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
              <ShopInfo isOwner={true} />
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className="w-full md:w-[72%] bg-white rounded-lg shadow-sm p-6 mt-2 sm:mt-0">
          <ShopProfileData isOwner={true} />
        </div>

      </div>
    </div>
  );
}
export default ShopHomePage;