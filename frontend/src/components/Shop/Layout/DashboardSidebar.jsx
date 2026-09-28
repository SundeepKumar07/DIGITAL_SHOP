import { Link } from "react-router-dom";
import { RxDashboard } from 'react-icons/rx';
import { FiPackage, FiShoppingBag } from "react-icons/fi";
import { AiOutlineFolderAdd, AiOutlineGift } from "react-icons/ai";
import { MdOutlineLocalOffer } from "react-icons/md";
import { VscNewFile } from "react-icons/vsc";
import { CiMoneyBill, CiSettings } from "react-icons/ci";
import { BiMessageSquareDetail } from "react-icons/bi";
import { HiOutlineReceiptRefund } from "react-icons/hi";

const DashboardSidebar = ({ active }) => {
  const menuItems = [
    { id: 1, label: "Dashboard", path: "/shop-dashboard", icon: RxDashboard },
    { id: 2, label: "All Orders", path: "/shop-dashboard-orders", icon: FiShoppingBag },
    { id: 3, label: "All Products", path: "/shop-dashboard-products", icon: FiPackage },
    { id: 4, label: "Create Product", path: "/shop/create-product", icon: AiOutlineFolderAdd },
    { id: 5, label: "All Events", path: "/shop-dashboard-events", icon: MdOutlineLocalOffer },
    { id: 6, label: "Create Event", path: "/shop/create-event", icon: VscNewFile },
    { id: 7, label: "Withdraw Money", path: "/shop-dashboard-withdraw-money", icon: CiMoneyBill },
    { id: 8, label: "Shop Inbox", path: "/shop-dashboard-messages", icon: BiMessageSquareDetail },
    { id: 9, label: "Discount Codes", path: "/shop-dashboard/coupouns", icon: AiOutlineGift },
    { id: 10, label: "Refunds", path: "/shop-dashboard-refunds", icon: HiOutlineReceiptRefund },
    { id: 11, label: "Settings", path: "/shop-dashboard-settings", icon: CiSettings },
  ];

  return (
    <aside className="w-full h-[calc(100vh-70px)] bg-white border-r border-gray-100 py-4 overflow-y-auto sticky top-[70px] left-0 z-10 select-none">
      <div className="flex flex-col gap-1 px-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = active === item.id;

          return (
            <Link
              key={item.id}
              to={item.path}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg font-medium text-sm transition-all duration-200 group ${
                isActive
                  ? "bg-blue-50 text-blue-600 border-l-4 border-blue-600 rounded-l-none pl-2"
                  : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              <Icon 
                size={isActive ? 22 : 20} 
                className={`transition-colors flex-shrink-0 ${
                  isActive ? "text-blue-600" : "text-gray-400 group-hover:text-gray-600"
                }`} 
              />
              <span className="hidden md:block truncate">
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </aside>
  );
};

export default DashboardSidebar;