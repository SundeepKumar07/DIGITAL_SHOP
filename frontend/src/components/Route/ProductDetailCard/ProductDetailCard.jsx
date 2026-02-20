import { useState } from "react"
import { RxCross1 } from 'react-icons/rx'
import styles from "../../../styles/styles";
import { AiFillHeart, AiOutlineHeart, AiOutlineMessage, AiOutlineShoppingCart } from "react-icons/ai";
const ProductDetailCard = ({ open, setOpen, data }) => {
    const [count, setCount] = useState(0);
    const [click, setClick] = useState(false);
    const [select, setSelect] = useState(false);

    const setDecreament = () => {
        if (count > 0) {
            setCount(count - 1)
        }
    }
    const setIncreament = () => {
        setCount(count + 1)
    }
    return (
        <div className='bg-[#fff]'>
            <div className={`fixed w-full h-screen top-0 left-0 bg-[#00000030] z-40 flex items-center justify-center`}>
                <div className={`w-[90%] lg:w-[60%] h-[90vh] overflow-y-scroll md:h-[75vh] bg-white rounded-md p-4 relative `}>
                    <RxCross1
                        size={25}
                        className={`absolute right-3 top-3 z-50`}
                        onClick={() => setOpen(false)}
                    />

                    <div className={`block w-full md:flex`}>
                        <div className={`w-full md:w-[40%]`}>
                            <img src={data.image_Url[0].url} alt="" />
                            <div className="flex items-center pt-2">
                                <img
                                    src={data.shop.shop_avatar.url} alt=""
                                    className={`w-[50px] h-[50px] rounded-full mr-2`}
                                />
                                <div>
                                    <h3 className={`text-blue-400 text-[15px]`}>{data.shop.name}</h3>
                                    <h5 className={`text-[15px]`}>({data.shop.ratings}) Ratings</h5>
                                </div>
                            </div>
                            <div
                                className="mt-5"
                                onClick={() => handleMessageSubmit}
                            >
                                <button className="bg-black text-white flex gap-2 items-center rounded px-3 py-2">
                                    Send Message <AiOutlineMessage />
                                </button>
                            </div>
                            <h3 className={`text-[16px] text-[red] mt-5`}>
                                ({data.total_sell}) sold out
                            </h3>
                        </div>
                        <div className='w-full md:w-[60%] pt-5 pr-[3px]'>
                            <h1 className={`${styles.productTitle} text-[16px]`}>
                                {data.name}
                            </h1>
                            <p>
                                {data.description}
                            </p>
                            <div className="flex mt-5">
                                <h3 className={styles.productDiscountPrice}>
                                    {data.discount_price}
                                </h3>
                                <h4 className={styles.price}>
                                    {data.price && data.price + "PKR"}
                                </h4>
                            </div>
                            <div className="flex items-center justify-between mt-2 pr-3 w-full">
                                <div>
                                    <button
                                        className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-r px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                                        onClick={() => setDecreament()}
                                    >
                                        -
                                    </button>
                                    <button className="bg-gray-200 text-gray-800 px-4 py-[11px] font-medium">
                                        {count}
                                    </button>
                                    <button
                                        className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                                        onClick={() => setIncreament()}
                                    >
                                        +
                                    </button>
                                </div>
                                {
                                    click ?
                                        <AiFillHeart
                                            size={22}
                                            onClick={() => setClick(false)}
                                            className={`cursor-pointer`}
                                            color={click ? "red" : "#333"}
                                            title="Remove from wish list"
                                        />
                                        : <AiOutlineHeart
                                            size={22}
                                            onClick={() => setClick(true)}
                                            className={`cursor-pointer`}
                                            color={click ? "red" : "#333"}
                                            title="Add in to wish list"
                                        />
                                }
                            </div>
                            <div className="mt-3">
                                <button className="bg-black text-white flex gap-2 items-center rounded px-3 py-2">
                                    Add to Cart <AiOutlineShoppingCart />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetailCard