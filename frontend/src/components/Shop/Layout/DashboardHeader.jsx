import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { AiOutlineGift } from 'react-icons/ai';
import { MdOutlineLocalOffer } from 'react-icons/md';
import { BiMessageSquareDetail } from 'react-icons/bi';
import { FiPackage, FiShoppingBag } from 'react-icons/fi';
import { FaBars } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { BACKEND_URL } from '../../../../server';

const DashboardHeader = () => {
  const [open, setOpen] = useState(false);
  const { seller } = useSelector(state => state.seller);

  const navLinks = [
    { to: "/shop-dashboard/coupouns", title: "Coupons", icon: AiOutlineGift },
    { to: "/shop-dashboard-events", title: "Events", icon: MdOutlineLocalOffer },
    { to: "/shop-dashboard-products", title: "Products", icon: FiShoppingBag },
    { to: "/shop-dashboard-orders", title: "Orders", icon: FiPackage },
    { to: "/shop-dashboard-messages", title: "Messages", icon: BiMessageSquareDetail },
  ];

  return (
    <header className="w-full h-[70px] bg-white border-b border-gray-100 sticky top-0 left-0 z-30 flex items-center justify-between px-4 sm:px-6 select-none">
      
      {/* Brand Platform Identity Branding Logo */}
      <div className="flex-shrink-0">
        <Link to="/shop-dashboard">
          <img 
            src="https://img.freepik.com/premium-vector/online-shopping-logo-design-template-simple-minimal-style-mouse-cursor-with-bag-concepts_502185-289.jpg" 
            alt="Logo" 
            className="w-[60px] object-contain" 
          />
        </Link>
      </div>

      {/* Primary Context Controls Desktop Viewport & Responsive Trigger */}
      <div className="flex items-center gap-4">
        
        {/* Desktop Interface Row Navigation */}
        <nav className="hidden sm:flex items-center gap-2">
          {navLinks.map((link, index) => {
            const Icon = link.icon;
            return (
              <Link 
                key={index} 
                to={link.to} 
                title={link.title}
                className="p-2.5 text-gray-500 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors duration-200"
              >
                <Icon size={24} />
              </Link>
            );
          })}
        </nav>

        {/* Separator Divider Line (Hidden on Mobile) */}
        <span className="hidden sm:block h-6 w-px bg-gray-200" aria-hidden="true" />

        {/* User Workspace Profile Hub Avatar Context Trigger */}
        <Link to="/shop-homepage" className="flex-shrink-0 transition-transform active:scale-95">
          <img 
            src={seller?.avatar ? `${BACKEND_URL}/${seller.avatar}` : '/placeholder.png'} 
            alt="Shop Avatar" 
            className="w-[40px] h-[40px] rounded-full object-cover ring-2 ring-gray-100 hover:ring-blue-500 transition-all duration-200"
          />
        </Link>

        {/* Hamburger Mobile Navigation Toggle Switch */}
        <button 
          onClick={() => setOpen(true)}
          className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg sm:hidden transition-colors outline-none"
        >
          <FaBars size={22} />
        </button>
      </div>

      {/* --- Responsive Sidebar Backdrop & Overlay Layer Panel System --- */}
      {open && (
        <>
          {/* Backdrop Blur Screen Cover Effect */}
          <div 
            onClick={() => setOpen(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 sm:hidden transition-opacity" 
          />

          {/* Side Drawer Modal Menu Body Content Container */}
          <div className="fixed top-0 right-0 h-screen w-[270px] bg-white z-50 p-6 flex flex-col gap-6 shadow-2xl sm:hidden animate-slideIn">
            
            {/* Action Top Bar Header controls */}
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <span className="font-bold text-gray-800 text-lg">Menu Navigation</span>
              <button 
                onClick={() => setOpen(false)}
                className="p-1.5 text-gray-500 hover:bg-gray-50 rounded-md transition-colors outline-none"
              >
                <RxCross2 size={22} />
              </button>
            </div>

            {/* Mobile Columnar Route Links Lists Stack */}
            <nav className="flex flex-col gap-1.5">
              {navLinks.map((link, index) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={index}
                    to={link.to}
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-4 px-3 py-3 rounded-lg text-gray-600 hover:text-blue-600 hover:bg-blue-50/60 font-medium transition-all duration-200"
                  >
                    <Icon size={22} className="text-gray-400 group-hover:text-blue-600" />
                    <span>{link.title}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </>
      )}
    </header>
  );
};

export default DashboardHeader;