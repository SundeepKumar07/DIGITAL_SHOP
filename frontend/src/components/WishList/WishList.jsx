import {RxCross1} from 'react-icons/rx';
import { IoHeartOutline} from 'react-icons/io5'
import { AiOutlineShoppingCart } from 'react-icons/ai';

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

const WishList = ({setOpenWishList}) => {
  return (
    <div className='fixed top-0 left-0 w-full h-screen bg-[#0000006b] z-10'>
        <div className='fixed top-0 right-0 min-h-full w-[70%] sm:w-[25% bg-white flex flex-col justify-center'>
            <div>
                <div className='flex w-full justify-start pt-5 pr-5'>
                    <RxCross1
                        size={25}
                        className='cursor-pointer fixed top-1 right-2'
                        onClick={() => setOpenWishList(false)}
                    />
                </div>
                {/* items length  */}
                <div className='flex gap-2 items-center mb-4 pl-4 font-[600]'>
                    <IoHeartOutline size={25} />
                    <h5 className="text-[25px]">
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
            </div>
        </div>
    </div>
  )
}

const CartSingle = ({data}) => {
    
    return (
        <div className='border-b p-4'>
            <div className='w-full flex items-center'>
                <img src={`https://m.media-amazon.com/images/I/6156hdPOXqL._AC_SX679_.jpg`} alt=""
                    className='w-[70px] h-[70px] pl-5 mr-2'
                />
                <div className='pl-1'>
                    <h1 className='text-sm'>{data.name}</h1>
                    <h4 className='font-[600] text-[#d02222] pt-[3px] font-[Roboto'>US${data.price}</h4>
                </div>
                <AiOutlineShoppingCart size={40} className='cursor-pointer ml-1'/>
            </div>
        </div>
    )
}

export default WishList