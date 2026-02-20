import { AiOutlineCreditCard, AiOutlineLogin, AiOutlineLogout, AiOutlineMessage } from 'react-icons/ai';
import { HiOutlineReceiptRefund, HiOutlineShoppingBag } from 'react-icons/hi';
import { RxPerson } from 'react-icons/rx';
import { useNavigate } from 'react-router-dom'
import { MdOutlineTrackChanges } from "react-icons/md"
import { TbAddressBook } from "react-icons/tb"
import axios from 'axios';
import { server } from '../../../server';
import { toast } from 'react-toastify';

const ProfileSideBar = ({active, setActive}) => {
  const navigate = useNavigate();

  const logoutHandler = () => {
    axios.get(`${server}/user/logout-user`, {withCredentials: true}).then((res) => {
      toast.success(res.data.message)
      navigate('/login');
      window.location.reload(true);
    }).catch((err) => {
      console.log(err.response.data.message);
    })
  }
  return (
    <div className='w-full bg-white shadow-sm rounded-10 p-3 sm:p-4 pt-8 rounded-md'>
      <div className='flex items-center cursor-pointer w-full mb-8' onClick={()=> setActive(1)}>
        <RxPerson 
          size={25}
          color={active === 1 ? "red" : ''}
        />
        <span
          className={`${active === 1 ? "text-[red]" : "text-blue"} pl-3 hidden sm:inline`}
        >
          Profile
        </span>
      </div>
      <div className='flex items-center cursor-pointer w-full mb-8' onClick={()=> setActive(2)}>
        <HiOutlineShoppingBag 
          size={25}
          color={active === 2 ? "red" : ''}
        />
        <span
          className={`${active === 2 ? "text-[red]" : "text-blue"} pl-3 hidden sm:inline`}
        >
          Others
        </span>
      </div>
      <div className='flex items-center cursor-pointer w-full mb-8' 
        onClick={()=> setActive(3)}
      >
        <HiOutlineReceiptRefund 
          size={25}
          color={active === 3 ? "red" : ''}
        />
        <span
          className={`${active === 3 ? "text-[red]" : "text-blue"} pl-3 hidden sm:inline`}
        >
          Refunds
        </span>
      </div>
      <div className='flex items-center cursor-pointer w-full mb-8' 
        onClick={()=> {setActive(4); navigate(`/inbox`)}}
      >
        <AiOutlineMessage 
          size={25}
          color={active === 4 ? "red" : ''}
        />
        <span
          className={`${active === 4 ? "text-[red]" : "text-blue"} pl-3 hidden sm:inline`}
        >
          Inbox
        </span>
      </div>
      <div className='flex items-center cursor-pointer w-full mb-8' 
        onClick={()=> {setActive(5)}}
      >
        <MdOutlineTrackChanges 
          size={25}
          color={active === 5 ? "red" : ''}
        />
        <span
          className={`${active === 5 ? "text-[red]" : "text-blue"} pl-3 hidden sm:inline`}
        >
          Track Order
        </span>
      </div>
      <div className='flex items-center cursor-pointer w-full mb-8' 
        onClick={()=> {setActive(6)}}
      >
        <AiOutlineCreditCard 
          size={25}
          color={active === 6 ? "red" : ''}
        />
        <span
          className={`${active === 6 ? "text-[red]" : "text-blue"} pl-3 hidden sm:inline`}
        >
          Payment Methods
        </span>
      </div>
      <div className='flex items-center cursor-pointer w-full mb-8' 
        onClick={()=> {setActive(7)}}
      >
        <TbAddressBook 
          size={25}
          color={active === 7 ? "red" : ''}
        />
        <span
          className={`${active === 7 ? "text-[red]" : "text-blue"} pl-3 hidden sm:inline`}
        >
          Address
        </span>
      </div>
      <div className='flex items-center cursor-pointer w-full mb-8' 
        onClick={()=> {setActive(8); logoutHandler()}}
      >
        <AiOutlineLogout 
          size={25}
          color={active === 8 ? "red" : ''}
        />
        <span
          className={`${active === 8 ? "text-[red]" : "text-blue"} pl-3 hidden sm:inline`}
        >
          Log out
        </span>
      </div>
    </div>
  )
}

export default ProfileSideBar