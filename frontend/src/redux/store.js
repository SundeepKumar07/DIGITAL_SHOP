// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import sellerReducer from './slices/sellerSlice';
import productReducer from './slices/productSlice';
import eventReducer from './slices/eventSlice';
import couponRouter from './slices/couponSlice';
import wishlistReducer from './slices/wishListSlice';
import cartItemReducer from './slices/cartSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    seller: sellerReducer,
    product: productReducer,
    event: eventReducer,
    couponCode: couponRouter,
    wishlist: wishlistReducer,
    cart: cartItemReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // optional: disables warnings for non-serializable data like cookies
    }),
});

export default store;