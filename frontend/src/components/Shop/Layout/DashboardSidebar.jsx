import { Link } from "react-router-dom";
import { RxDashboard } from 'react-icons/rx';
import { FiPackage, FiShoppingBag } from "react-icons/fi";
import { AiOutlineFolderAdd, AiOutlineGift } from "react-icons/ai";
import { MdOutlineLocalOffer } from "react-icons/md";
import { VscNewFile } from "react-icons/vsc";
import { CiMoneyBill, CiSettings } from "react-icons/ci";
import { BiMessageSquareDetail } from "react-icons/bi";
import { HiOutlineReceiptRefund } from "react-icons/hi";

const DashboardSidebar = ({active}) => {
  return (
    <div className='w-full h-[89vh] bg-white shadow-sm overflow-y-scroll scroll- sticky top-0 left-0 z-10'>
        {/* single item  */}
        <div className="w-full items-center md:px-4 px-2 py-2">
            <Link to={'/shop-dashboard'} className={`w-full flex items-center ${active == 1 ? 'text-[crimson]' : 'text-[#555]'}`}>
                <RxDashboard
                    size={25}
                />
                <h5 className={`p-2 text-[16px] font-[400] md:block hidden`}>
                    Dashboard
                </h5>
            </Link>
        </div>
        <div className="w-full items-center md:px-4 px-2 py-2">
            <Link to={'/shop-dashboard-orders'} className={`w-full flex items-center ${active == 2 ? 'text-[crimson]' : 'text-[#555]'}`}>
                <FiShoppingBag
                    size={25}
                />
                <h5 className={`p-2 text-[16px] font-[400] md:block hidden`}>
                    All Orders
                </h5>
            </Link>
        </div>
        <div className="w-full items-center md:px-4 px-2 py-2">
            <Link to={'/shop-dashboard-products'} className={`w-full flex items-center ${active == 3 ? 'text-[crimson]' : 'text-[#555]'}`}>
                <FiPackage
                    size={25}
                />
                <h5 className={`p-2 text-[16px] font-[400] md:block hidden`}>
                    All Products
                </h5>
            </Link>
        </div>
        <div className="w-full items-center md:px-4 px-2 py-2">
            <Link to={'/shop/create-product'} className={`w-full flex items-center ${active == 4 ? 'text-[crimson]' : 'text-[#555]'}`}>
                <AiOutlineFolderAdd
                    size={25}
                />
                <h5 className={`p-2 text-[16px] font-[400] md:block hidden`}>
                    Create Product
                </h5>
            </Link>
        </div>
        <div className="w-full items-center md:px-4 px-2 py-2">
            <Link to={'/shop-dashboard-events'} className={`w-full flex items-center ${active == 5 ? 'text-[crimson]' : 'text-[#555]'}`}>
                <MdOutlineLocalOffer
                    size={25}
                />
                <h5 className={`p-2 text-[16px] font-[400] md:block hidden`}>
                    All Events
                </h5>
            </Link>
        </div>
        <div className="w-full items-center md:px-4 px-2 py-2">
            <Link to={'/shop-dashboard-create-event'} className={`w-full flex items-center ${active == 6 ? 'text-[crimson]' : 'text-[#555]'}`}>
                <VscNewFile
                    size={25}
                />
                <h5 className={`p-2 text-[16px] font-[400] md:block hidden`}>
                    Create Event
                </h5>
            </Link>
        </div>
        <div className="w-full items-center md:px-4 px-2 py-2">
            <Link to={'/shop-dashboard-withdraw-money'} className={`w-full flex items-center ${active == 7 ? 'text-[crimson]' : 'text-[#555]'}`}>
                <CiMoneyBill
                    size={25}
                />
                <h5 className={`p-2 text-[16px] font-[400] md:block hidden`}>
                    Withdraw Money
                </h5>
            </Link>
        </div>
        <div className="w-full items-center md:px-4 px-2 py-2">
            <Link to={'/shop-dashboard-messages'} className={`w-full flex items-center ${active == 8 ? 'text-[crimson]' : 'text-[#555]'}`}>
                <BiMessageSquareDetail
                    size={25}
                />
                <h5 className={`p-2 text-[16px] font-[400] md:block hidden`}>
                    Shop Inbox
                </h5>
            </Link>
        </div>
        <div className="w-full items-center md:px-4 px-2 py-2">
            <Link to={'/shop-dashboard/coupouns'} className={`w-full flex items-center ${active == 9 ? 'text-[crimson]' : 'text-[#555]'}`}>
                <AiOutlineGift
                    size={25}
                />
                <h5 className={`p-2 text-[16px] font-[400] md:block hidden`}>
                    Discount Codes
                </h5>
            </Link>
        </div>
        <div className="w-full items-center md:px-4 px-2 py-2">
            <Link to={'/shop-dashboard-refunds'} className={`w-full flex items-center ${active == 10 ? 'text-[crimson]' : 'text-[#555]'}`}>
                <HiOutlineReceiptRefund
                    size={25}
                />
                <h5 className={`p-2 text-[16px] font-[400] md:block hidden`}>
                    Refunds
                </h5>
            </Link>
        </div>
        <div className="w-full items-center md:px-4 px-2 py-2">
            <Link to={'/shop-dashboard-settings'} className={`w-full flex items-center ${active == 11 ? 'text-[crimson]' : 'text-[#555]'}`}>
                <CiSettings
                    size={30}
                />
                <h5 className={`p-2 text-[16px] font-[400] md:block hidden`}>
                    Setting
                </h5>
            </Link>
        </div>
    </div>
  )
}

export default DashboardSidebar