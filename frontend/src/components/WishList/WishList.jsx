import { RxCross1 } from "react-icons/rx";
import { IoHeartOutline } from "react-icons/io5";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addToCart } from "../../redux/slices/cartSlice";
import { removeFromWishlist } from "../../redux/slices/wishListSlice";
import { BACKEND_URL } from "../../../server";

const WishList = ({ setOpenWishList }) => {
  const wishlistItems = useSelector((state) => state.wishlist?.wishlistItems || []);
  const cartItems = useSelector((state) => state.cart?.cartItems || []);
  const dispatch = useDispatch();

  // Add item to cart
  const handleAddToCart = (data) => {
    const isItemExist = cartItems.find((i) => i._id === data._id);
    if (isItemExist) {
      toast.error("Product already in Cart");
      return;
    }
    dispatch(addToCart({ ...data, qty: 1 }));
    dispatch(removeFromWishlist(data._id));
    toast.success("Item added to cart!");
  };

  return (
    <div className="fixed top-0 left-0 w-full h-screen bg-[#0000006b] z-50">
      <div className="fixed top-0 right-0 h-full w-[80%] sm:w-[400px] bg-white flex flex-col shadow-xl">

        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-2">
            <IoHeartOutline size={24} />
            <h2 className="text-lg font-semibold">Wishlist ({wishlistItems.length})</h2>
          </div>
          <RxCross1 size={22} className="cursor-pointer" onClick={() => setOpenWishList(false)} />
        </div>

        {/* Wishlist Items */}
        <div className="flex-1 overflow-y-auto">
          {wishlistItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center px-6">
              <IoHeartOutline size={70} className="text-gray-400 mb-4" />
              <h2 className="text-xl font-semibold text-gray-700">Your wishlist is empty</h2>
              <p className="text-gray-500 mt-2">Looks like you haven't added anything yet.</p>
              <button
                className="mt-6 bg-black text-white px-6 py-2 rounded-md"
                onClick={() => setOpenWishList(false)}
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            wishlistItems.map((item) => (
              <WishSingle key={item._id} data={item} dispatch={dispatch} handleAddToCart={handleAddToCart} />
            ))
          )}
        </div>

      </div>
    </div>
  );
};

const WishSingle = ({ data, dispatch, handleAddToCart }) => {
  return (
    <div className="border-b p-4 flex items-center relative">

      {/* Remove from Wishlist */}
      <RxCross1
        size={18}
        className="cursor-pointer absolute right-3 top-3 text-gray-500"
        onClick={() => dispatch(removeFromWishlist(data._id))}
      />

      {/* Product Image */}
      <img
        src={data.images?.[0] ? `${BACKEND_URL}/${data.images[0]}` : "https://m.media-amazon.com/images/I/6156hdPOXqL._AC_SX679_.jpg"}
        alt={data.name}
        className="w-[70px] h-[70px] object-cover mr-3 rounded"
      />

      {/* Product Info */}
      <div className="flex-1">
        <h1 className="text-sm font-medium">{data.name}</h1>
        <h4 className="text-red-500 font-semibold mt-1">US${data.discountPrice || data.price}</h4>
      </div>

      {/* Move to Cart */}
      <AiOutlineShoppingCart
        size={28}
        className="cursor-pointer text-green-600"
        onClick={() => handleAddToCart(data)}
      />
    </div>
  );
};

export default WishList;