import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../styles/styles';
import { AiFillHeart, AiOutlineHeart, AiOutlineMessage, AiOutlineShoppingCart } from 'react-icons/ai';

const ProductDetail = ({ data }) => {
    const [count, setCount] = useState(1);
    const [click, setClick] = useState(false);
    const [select, setSelect] = useState(0);
    const navigate = useNavigate();

    const setDecreament = () => {
        if (count > 0) {
            setCount(count - 1)
        }
    }
    const setIncreament = () => {
        setCount(count + 1)
    }
    const handleMessageSubmit = () => {
        navigate(`/inbox/product  `)
    }
    return (
        <div className='bg-white'>
            {
                data && (
                    <div className={`${styles.section} w-[90%] md:w-[80%]`}>
                        <div className='w-full py-5'>
                            <div className='block md:flex w-full'>
                                <div className='w-full'>
                                    <img src={data?.image_Url[select].url} alt="" className='w-[80%]' />
                                    <div className='w-full flex mt-4'>
                                        <div className={`${select === 0 ? "border" : "null"} cursor-pointer`}>
                                            <img src={data?.image_Url[0].url} alt=""
                                                className='h-[200px] p-4'
                                                onClick={() => setSelect(0)}
                                            />
                                        </div>
                                        <div className={`${select === 1 ? "border" : "null"} cursor-pointer`}>
                                            <img src={data?.image_Url[1].url} alt=""
                                                className='h-[200px]'
                                                onClick={() => setSelect(1)}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className='w-full'>
                                    <h1 className={styles.productTitle}>
                                        {data.name}
                                    </h1>
                                    <p className={``}>
                                        {data.description}
                                    </p>
                                    <div className='flex pt-3'>
                                        <h4 className={styles.productDiscountPrice}>
                                            {data.discount_price}
                                        </h4>
                                        <h3 className={styles.price}>
                                            {data.price && data.price + "PRK"}
                                        </h3>
                                    </div>
                                    <div className={`${styles.noramlFlex} mt-12 justify-between pr-3`}>
                                        <div className="flex items-center mt-2 justify-between w-full">
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
                                    </div>
                                    <div className="mt-5">
                                        <button className="bg-black text-white flex gap-2 items-center rounded px-3 py-2">
                                            Add to Cart <AiOutlineShoppingCart />
                                        </button>
                                    </div>
                                    <div className="flex items-center pt-8 justify-between">
                                        <div className='flex items-center'>
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
                                            onClick={() => handleMessageSubmit}
                                        >
                                            <button onClick={handleMessageSubmit} className="bg-purple-700 text-white flex gap-2 items-center rounded px-3 py-2">
                                                Send Message <AiOutlineMessage />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='py-10'>
                            <ProductDetails data={data} />
                        </div>
                    </div>
                )
            }
        </div>
    )
}

const ProductDetails = ({ data }) => {
    const [active, setActive] = useState(1);
    return (
        <div className='bg-[#f5f6fb] px-3 md:px-10 py-2 rounded min-h-[40vh]'>
            <div className='w-full flex justify-between border-b pt-10 pb-2'>
                <div className="relative w-[200px] text-center">
                    <h5 className='text-[#000] text-[18px] px-1 font-[600] cursor-pointer md:text-[20px]'
                        onClick={() => setActive(1)}
                    >
                        Product Details
                    </h5>
                    {
                        active === 1 && (
                            <div className={styles.active_indicator} />
                        )
                    }
                </div>
                <div className="relative w-[200px] text-center">
                    <h5 className='text-[#000] text-[18px] px-1 font-[600] cursor-pointer md:text-[20px]'
                        onClick={() => setActive(2)}
                    >
                        Product Reviews
                    </h5>
                    {
                        active === 2 && (
                            <div className={styles.active_indicator} />
                        )
                    }
                </div>
                <div className="relative w-[200px] text-center">
                    <h5 className='text-[#000] text-[18px] px-1 font-[600] cursor-pointer md:text-[20px]'
                        onClick={() => setActive(3)}
                    >
                        Product Information
                    </h5>
                    {
                        active === 3 && (
                            <div className={styles.active_indicator} />
                        )
                    }
                </div>
            </div>
            <div>
                {
                    active === 1 && <div className='py-5'>
                        <p>
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Corrupti incidunt molestias alias officia recusandae? Atque accusantium quos veniam maxime molestias quidem ut nostrum laudantium voluptates debitis necessitatibus, labore ducimus magnam sint placeat illum temporibus velit? Praesentium adipisci laborum atque minima, pariatur qui delectus earum nam, impedit incidunt voluptate eaque nihil.
                        </p>
                        <p>
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Corrupti incidunt molestias alias officia recusandae? Atque accusantium quos veniam maxime molestias quidem ut nostrum laudantium voluptates debitis necessitatibus, labore ducimus magnam sint placeat illum temporibus velit? Praesentium adipisci laborum atque minima, pariatur qui delectus earum nam, impedit incidunt voluptate eaque nihil.
                        </p>
                        <p>
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Corrupti incidunt molestias alias officia recusandae? Atque accusantium quos veniam maxime molestias quidem ut nostrum laudantium voluptates debitis necessitatibus, labore ducimus magnam sint placeat illum temporibus velit? Praesentium adipisci laborum atque minima, pariatur qui delectus earum nam, impedit incidunt voluptate eaque nihil.
                        </p>
                    </div>
                }
                {
                    active === 2 && (
                        <div className='w-full justify-center min-h-[40vh] py-5'>
                            <div className='flex items-center'>
                                No Reviews Yet
                            </div>
                        </div>
                    )
                }
                {
                    active === 3 && (
                        <div className='w-full block md:flex p-5'>
                            <div className='w-full md:w-[50%]'>
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
                                <p className='pt-3'>
                                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ullam aliquam expedita officia suscipit magni illo ratione tempora nam, quisquam amet est animi perferendis iste aspernatur non fuga ab! Atque dolorem accusamus quibusdam veniam sint reiciendis commodi quasi natus consequatur repudiandae dolores deserunt explicabo magni, repellat aperiam vero? Facere, excepturi possimus.
                                </p>
                            </div>
                            <div className='w-full md:w-[50%]'>
                                <div className="flex items-center justify-start md:justify-end pt-2">
                                    <div className='flex flex-col gap-2'>
                                        <div>
                                            <span className='font-[700] pr-2'>Join On:</span>
                                            <span>18th May, 2025</span>
                                        </div>
                                        <div>
                                            <span className='font-[700] pr-2'>Total Products:</span>
                                            <span>1,345</span>
                                        </div>
                                        <div>
                                            <span className='font-[700] pr-2'>Total Reviews:</span>
                                            <span>2345</span>
                                        </div>
                                        <div
                                            className="mt-5"
                                            
                                        >
                                            <button className="bg-black text-white flex gap-2 items-center rounded px-5 py-2">
                                                Visit Shop
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default ProductDetail