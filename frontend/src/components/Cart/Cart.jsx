import {RxCross1} from 'react-icons/rx';
import {IoBagHandleOutline} from 'react-icons/io5'
import {HiOutlineMinus, HiPlus} from 'react-icons/hi'
import { useState } from 'react';
import styles from '../../styles/styles';
import { Link } from 'react-router-dom';

const cartData = [
    {
        name: "iphone 17pro max 256 gb ssd and 8 gb ram silver color",
        description: "",
        price: 500,
    },
    {
        name: "iphone 17pro max 256 gb ssd and 8 gb ram silver color",
        description: "",
        price: 500,
    },
    {
        name: "iphone 17pro max 256 gb ssd and 8 gb ram silver color",
        description: "",
        price: 500,
    },
];

const Cart = ({setOpenCart}) => {
  return (
    <div className='fixed top-0 left-0 w-full h-screen bg-[#0000006b] z-10'>
        <div className='fixed top-0 right-0 min-h-full w-[70%] sm:w-[25%] bg-white flex flex-col justify-center'>
            <div>
                <div className='flex w-full justify-start pt-5 pr-5'>
                    <RxCross1
                        size={25}
                        className='cursor-pointer fixed top-1 right-2'
                        onClick={() => setOpenCart(false)}
                    />
                </div>
                {/* items length  */}
                <div className='flex gap-2 items-center mb-4 pl-4 font-[600]'>
                    <IoBagHandleOutline size={25} />
                    <h5 className="pl-2 text-[25px]">
                        3 items
                    </h5>
                </div>

                {/* cart single item  */}
                <div className='w-full border-1'>
                    {
                        cartData && cartData.map((i, index) => (
                            <CartSingle key={index} data={i}/>
                        ))
                    }
                </div>

                <div className='px-5 mb-3 mt-1'>
                    <Link to={`/checkout`}>
                        <div className='h-[45px] flex items-center justify-center w-[100%] bg-red-500 rounded'>
                            <h1 className='text-white text-[18px] font-[600]'>
                                Checkout out Now USD$1000
                            </h1>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    </div>
  )
}

const CartSingle = ({data}) => {
    const [value, setValue] = useState(1);
    
    return (
        <div className='border-b p-4'>
            <div className='w-full flex items-center'>
                <div>
                    <div className={`bg-red-500 border border-[#e4434373] rounded-full w-[25px] h-[25px] ${styles.noramlFlex} justify-center cursor-pointer`}
                        onClick={() => setValue(value+1)}
                    >
                        <HiPlus size={25} color='#fff'/>
                    </div>
                    <span className='pl-2'>
                        {value}
                    </span>
                    <div className='bg-gray-400 rounded-full w-[25px] h-[25px] flex justify-center items-center cursor-pointer'
                        onClick={() => {value === 1 ? setValue(1): setValue(value-1)}}
                    >
                        <HiOutlineMinus size={25} color='#7d879c'/>
                    </div>
                </div>
                <img src={`https://m.media-amazon.com/images/I/6156hdPOXqL._AC_SX679_.jpg`} alt=""
                    className='w-[70px] h-[70px] pl-5 mr-2'
                />
                <div className='pl-1'>
                    <h1 className='text-sm'>{data.name}</h1>
                    <h4 className='font-[400] text-sm text-black'>${data.price} * {value}</h4>
                    <h4 className='font-[600] text-[#d02222] pt-[3px] font-[Roboto'>US${data.price * value}</h4>
                </div>
                <RxCross1 size={20} className='cursor-pointer w-5 h-5'/>
            </div>
        </div>
    )
}

export default Cart