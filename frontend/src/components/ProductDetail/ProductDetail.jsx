import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from '../../styles/styles';
import { AiFillHeart, AiOutlineHeart, AiOutlineMessage, AiOutlineShoppingCart } from 'react-icons/ai';
import { BACKEND_URL, server } from '../../../server';

const ProductDetail = ({ data }) => {
    const [count, setCount] = useState(1);
    const [click, setClick] = useState(false);
    const [select, setSelect] = useState(0);
    const [shop, setShop] = useState(null);
    const navigate = useNavigate();

    const images = data?.images || [];

    // ✅ Always call hooks first, fetch shop dynamically
    useEffect(() => {
        if (!data?.shopId) return;

        const fetchShop = async () => {
            try {
                const res = await axios.get(`${server}/shop/find/${data.shopId}`);
                setShop(res.data.shop);
            } catch (err) {
                console.error("Error fetching shop:", err);
            }
        };

        fetchShop();
    }, [data?.shopId]);

    const setDecrement = () => count > 1 && setCount(count - 1);
    const setIncrement = () => setCount(count + 1);
    const handleMessageSubmit = () => navigate(`/inbox/product`);

    if (!data) return <div className="text-center p-10">Loading product...</div>;

    return (
        <div className='bg-white'>
            <div className={`${styles.section} w-[90%] md:w-[80%]`}>
                <div className='block md:flex w-full py-5 gap-6'>

                    {/* Left: Images */}
                    <div className='w-full md:w-[50%]'>
                        <img 
                            src={images[select] ? `${BACKEND_URL}/${images[select]}` : '/placeholder.png'} 
                            alt={data.name} 
                            className='w-full h-[400px] object-contain rounded-lg'
                        />
                        <div className='flex flex-wrap gap-2 mt-4'>
                            {images.slice(0, 6).map((img, index) => (
                                <div 
                                    key={index} 
                                    className={`cursor-pointer border-2 ${select === index ? 'border-red-500' : 'border-transparent'} rounded-lg`}
                                    onClick={() => setSelect(index)}
                                >
                                    <img 
                                        src={`${BACKEND_URL}/${img}`} 
                                        alt={`${data.name} ${index+1}`} 
                                        className='h-[80px] w-[80px] object-cover rounded-lg'
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right: Product Info */}
                    <div className='w-full md:w-[50%] flex flex-col justify-between'>
                        <div>
                            <h1 className={styles.productTitle}>{data.name}</h1>
                            <p className='pt-2 text-[15px] text-[#333]'>{data.description}</p>

                            <div className='flex items-center gap-4 pt-3'>
                                <h4 className={styles.productDiscountPrice}>{data.discountPrice} PKR</h4>
                                {data.originalPrice && (
                                    <h3 className={styles.price}>{data.originalPrice} PKR</h3>
                                )}
                            </div>

                            <div className={`${styles.noramlFlex} mt-6 justify-between`}>
                                <div className="flex items-center gap-2">
                                    <button className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold px-4 py-2 rounded-l" onClick={setDecrement}>-</button>
                                    <span className="px-4 py-2 bg-gray-200 font-medium">{count}</span>
                                    <button className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold px-4 py-2 rounded-r" onClick={setIncrement}>+</button>
                                </div>
                                <div>
                                    {click ? (
                                        <AiFillHeart size={24} className='cursor-pointer text-red-500' onClick={() => setClick(false)} />
                                    ) : (
                                        <AiOutlineHeart size={24} className='cursor-pointer text-gray-700' onClick={() => setClick(true)} />
                                    )}
                                </div>
                            </div>

                            <div className="mt-5">
                                <button className="bg-black text-white flex gap-2 items-center rounded px-4 py-2 hover:opacity-80 transition">
                                    Add to Cart <AiOutlineShoppingCart />
                                </button>
                            </div>
                        </div>

                        {/* Shop Info */}
                        {shop && (
                            <div className="flex items-center justify-between pt-8">
                                <div className='flex items-center'>
                                    <img 
                                        src={shop.avatar ? `${BACKEND_URL}/${shop.avatar}` : '/placeholder.png'} 
                                        alt={shop.name} 
                                        className='w-[50px] h-[50px] rounded-full mr-2 object-cover'
                                    />
                                    <div>
                                        <h3 className='text-blue-500 text-[15px]'>{shop.name}</h3>
                                        <h5 className='text-[14px]'>{shop.ratings || 0} Ratings</h5>
                                    </div>
                                </div>
                                <div>
                                    <button 
                                        onClick={handleMessageSubmit} 
                                        className="bg-purple-700 text-white flex gap-2 items-center rounded px-3 py-2 hover:opacity-80 transition"
                                    >
                                        Send Message <AiOutlineMessage />
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Product Tabs */}
                <div className='py-10'>
                    <ProductTabs data={data} shop={shop} />
                </div>
            </div>
        </div>
    );
}

// Tabs Component
const ProductTabs = ({ data, shop }) => {
    const [active, setActive] = useState(1);

    return (
        <div className='bg-[#f5f6fb] px-4 md:px-10 py-4 rounded min-h-[40vh]'>
            <div className='flex justify-between border-b pb-2'>
                {["Product Details", "Product Reviews", "Product Information"].map((tab, index) => (
                    <div key={index} className='relative w-[200px] text-center cursor-pointer'>
                        <h5 
                            className='text-[#000] text-[18px] md:text-[20px] font-[600]'
                            onClick={() => setActive(index + 1)}
                        >
                            {tab}
                        </h5>
                        {active === index + 1 && <div className={styles.active_indicator} />}
                    </div>
                ))}
            </div>

            <div className='pt-5'>
                {active === 1 && (
                    <div>
                        <p>{data.description}</p>
                        <p>{data.long_description || "No extra details available."}</p>
                    </div>
                )}
                {active === 2 && (
                    <div className='min-h-[40vh] flex items-center justify-center text-gray-500'>
                        No Reviews Yet
                    </div>
                )}
                {active === 3 && shop && (
                    <div className='md:flex gap-6'>
                        <div className='md:w-1/2'>
                            <div className='flex items-center pt-2 gap-2'>
                                <img src={shop.avatar ? `${BACKEND_URL}/${shop.avatar}` : '/placeholder.png'} alt={shop.name} className='w-[50px] h-[50px] rounded-full object-cover'/>
                                <div>
                                    <h3 className='text-blue-500 text-[15px]'>{shop.name}</h3>
                                    <h5 className='text-[14px]'>{shop.ratings} Ratings</h5>
                                </div>
                            </div>
                            <p className='pt-3'>{shop.description || "No shop info available."}</p>
                        </div>
                        <div className='md:w-1/2 flex flex-col gap-2 justify-start md:justify-end'>
                            <div><span className='font-[700]'>Joined On:</span> {shop.createdAt?.slice(0,10) || "N/A"}</div>
                            <div><span className='font-[700]'>Total Products:</span> {shop.totalProducts || 0}</div>
                            <div><span className='font-[700]'>Total Reviews:</span> {shop.totalReviews || 0}</div>
                            <button className="mt-4 bg-black text-white px-5 py-2 rounded hover:opacity-80 transition">Visit Shop</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ProductDetail;