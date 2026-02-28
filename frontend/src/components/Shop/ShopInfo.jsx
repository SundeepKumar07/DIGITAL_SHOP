import { useSelector } from 'react-redux'
import { BACKEND_URL, server } from '../../../server';
import styles from '../../styles/styles';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ShopInfo = ({ isOwner, seller, products }) => {
    const navigate = useNavigate();

    const logoutHandler = () => {
        axios.get(`${server}/shop/logout-shop`, { withCredentials: true }).then((res) => {
            toast.success(res.data.message)
            navigate('/login-shop');
            window.location.reload(true);
        }).catch((err) => {
            console.log(err.response.data.message);
        })
    };


    return (
        <div>
            <div className='w-full py-5'>
                <div className="w-full flex items-center justify-center flex-col">
                    <img src={`${BACKEND_URL}/${seller?.avatar}`} alt=""
                        className='w-[150px] h-[150px] rounded-full object-cover'
                    />
                    <h3 className="text-center px-2 text-[20px]">
                        {seller?.name}
                    </h3>
                    <p className='text-[16px] text-[#000000a6] p-[10px] flex items-center'>
                        {seller?.description}
                    </p>
                </div>
            </div>
            <div className="p-3">
                <h5 className='font-[600]'>Address</h5>
                <h4 className='text-[#000000a6'>{seller?.address}</h4>
            </div>
            <div className="p-3">
                <h5 className='font-[600]'>Phone Number</h5>
                <h4 className='text-[#000000a6'>{seller?.phoneNumber}</h4>
            </div>
            <div className="p-3">
                <h5 className='font-[600]'>Total Products</h5>
                <h4 className='text-[#000000a6'>{products?.length}</h4>
            </div>
            <div className="p-3">
                <h5 className='font-[600]'>Shop Ratings</h5>
                <h4 className='text-[#000000a6'>{seller?.ratings /5}</h4>
            </div>
            <div className="p-3">
                <h5 className='font-[600]'>Joined On</h5>
                <h4 className='text-[#000000a6'>{seller?.createdAt?.slice(0, 10)}</h4>
            </div>
            {isOwner && (
                <div className="py-3 px-4">
                    <div className={`${styles.button} !w-full !h-[42px] !rounded-[5px]`}>Edit Shop</div>
                    <div className={`${styles.button} !w-full !h-[42px] !rounded-[5px]`} onClick={logoutHandler}>Log Out</div>
                </div>
            )}
        </div>
    )
}

export default ShopInfo