import { AiOutlineCreditCard, AiOutlineLogout, AiOutlineMessage } from 'react-icons/ai';
import { HiOutlineReceiptRefund, HiOutlineShoppingBag } from 'react-icons/hi';
import { RxPerson } from 'react-icons/rx';
import { useNavigate } from 'react-router-dom';
import { MdOutlineTrackChanges } from "react-icons/md";
import { TbAddressBook } from "react-icons/tb";
import axios from 'axios';
import { toast } from 'react-toastify';
import { server } from '../../../server';

const ProfileSideBar = ({ active, setActive }) => {
  const navigate = useNavigate();

  const logoutHandler = () => {
    axios.get(`${server}/user/logout-user`, { withCredentials: true })
      .then((res) => {
        toast.success(res.data.message);
        navigate('/login');
        window.location.reload();
      })
      .catch((err) => {
        console.error(err.response?.data?.message || err.message);
      });
  };

  const menuItems = [
    { id: 1, label: "Profile", icon: RxPerson },
    { id: 2, label: "Orders", icon: HiOutlineShoppingBag },
    { id: 3, label: "Refunds", icon: HiOutlineReceiptRefund },
    { id: 4, label: "Inbox", icon: AiOutlineMessage, action: () => navigate('/inbox') },
    { id: 5, label: "Track Order", icon: MdOutlineTrackChanges },
    { id: 6, label: "Payment Methods", icon: AiOutlineCreditCard },
    { id: 7, label: "Addresses", icon: TbAddressBook },
    { id: 8, label: "Log out", icon: AiOutlineLogout, action: logoutHandler, isLogout: true },
  ];

  return (
    <div className='w-full bg-white shadow-sm rounded-lg p-2 sm:p-4 flex flex-col gap-1 border border-gray-100'>
      {menuItems.map((item) => {
        const IconComponent = item.icon;
        const isActive = active === item.id;
        
        return (
          <div
            key={item.id}
            onClick={() => {
              setActive(item.id);
              if (item.action) item.action();
            }}
            className={`flex items-center justify-center sm:justify-start cursor-pointer w-full p-3 rounded-md transition-all duration-200 ${
              isActive 
                ? "bg-red-50 text-red-600 font-medium" 
                : item.isLogout 
                  ? "text-gray-500 hover:bg-red-50 hover:text-red-600" 
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            }`}
          >
            <IconComponent size={22} className={isActive ? "text-red-600" : "text-inherit"} />
            <span className="pl-3 hidden sm:inline text-sm tracking-wide">
              {item.label}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default ProfileSideBar;