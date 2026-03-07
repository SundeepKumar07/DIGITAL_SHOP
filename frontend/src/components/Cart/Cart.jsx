import { RxCross1 } from "react-icons/rx";
import { IoBagHandleOutline } from "react-icons/io5";
import { HiOutlineMinus, HiPlus } from "react-icons/hi";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, updateCartQuantity } from "../../redux/slices/cartSlice";
import { BACKEND_URL } from "../../../server";

const Cart = ({ setOpenCart }) => {
    const cartItems = useSelector((state) => state.cart?.cartItems || []);

    const totalPrice = cartItems.reduce(
        (acc, item) => acc + item.discountPrice * item.qty,
        0
    );

    return (
        <div className="fixed top-0 left-0 w-full h-screen bg-[#0000006b] z-50">
            <div className="fixed top-0 right-0 h-full w-[80%] sm:w-[420px] bg-white flex flex-col shadow-xl">

                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b">
                    <div className="flex items-center gap-2">
                        <IoBagHandleOutline size={24} />
                        <h2 className="text-lg font-semibold">
                            Cart ({cartItems.length})
                        </h2>
                    </div>

                    <RxCross1
                        size={22}
                        className="cursor-pointer"
                        onClick={() => setOpenCart(false)}
                    />
                </div>

                {/* Cart Items Section */}
                <div className="flex-1 overflow-y-auto">

                    {cartItems.length === 0 ? (

                        /* Empty Cart UI */
                        <div className="flex flex-col items-center justify-center h-full text-center px-6">
                            <IoBagHandleOutline size={70} className="text-gray-400 mb-4" />

                            <h2 className="text-xl font-semibold text-gray-700">
                                Your cart is empty
                            </h2>

                            <p className="text-gray-500 mt-2">
                                Looks like you haven't added anything yet.
                            </p>

                            <button
                                className="mt-6 bg-black text-white px-6 py-2 rounded-md"
                                onClick={() => setOpenCart(false)}
                            >
                                Continue Shopping
                            </button>
                        </div>

                    ) : (

                        <div>
                            {cartItems.map((item) => (
                                <CartSingle key={item._id} data={item} />
                            ))}
                        </div>

                    )}

                </div>

                {/* Checkout Section */}
                {cartItems.length > 0 && (
                    <div className="p-4 border-t">
                        <Link to="/checkout">
                            <div className="h-[45px] flex items-center justify-center w-full bg-red-500 rounded">
                                <h1 className="text-white text-[18px] font-semibold">
                                    Checkout Now ${totalPrice}
                                </h1>
                            </div>
                        </Link>
                    </div>
                )}

            </div>
        </div>
    );
};

const CartSingle = ({ data }) => {
    const [value, setValue] = useState(data.qty);
    const dispatch = useDispatch();

    return (
        <div className="border-b p-4 flex items-center">

            {/* Quantity */}
            <div className="flex flex-col items-center mr-3">

                <button
                    className="bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                    onClick={() => {
                        const newQty = value + 1;
                        setValue(newQty);
                        dispatch(updateCartQuantity({ id: data._id, qty: newQty }));
                    }}
                >
                    <HiPlus size={14} />
                </button>

                <span className="text-sm my-1">{value}</span>

                <button
                    className="bg-gray-300 rounded-full w-6 h-6 flex items-center justify-center"
                    onClick={() => {
                        if (value === 1) return;

                        const newQty = value - 1;
                        setValue(newQty);
                        dispatch(updateCartQuantity({ id: data._id, qty: newQty }));
                    }}
                >
                    <HiOutlineMinus size={14} />
                </button>

            </div>

            {/* Product Image */}
            <img
                src={`${BACKEND_URL}/${data.images[0]}`}
                alt=""
                className="w-[70px] h-[70px] object-cover mr-3"
            />

            {/* Product Info */}
            <div className="flex-1">
                <h1 className="text-sm font-medium">{data.name}</h1>

                <h4 className="text-sm text-gray-600">
                    ${data.discountPrice} × {value}
                </h4>

                <h4 className="text-red-500 font-semibold">
                    ${data.discountPrice * value}
                </h4>
            </div>

            {/* Remove Button */}
            <RxCross1
                size={18}
                className="cursor-pointer ml-2"
                onClick={() => dispatch(removeFromCart(data._id))}
            />
        </div>
    );
};

export default Cart;