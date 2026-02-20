// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import sellerReducer from './slices/sellerSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    seller: sellerReducer
    // Add other reducers here as your app grows
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // optional: disables warnings for non-serializable data like cookies
    }),
});

export default store;