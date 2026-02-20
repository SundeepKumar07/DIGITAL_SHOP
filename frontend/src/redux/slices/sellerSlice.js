// src/redux/slices/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isSellerAuthenticated: false,
  sellerLoading: true,
  seller: null,
  sellerError: null,
};

const sellerSlice = createSlice({
  name: 'seller',
  initialState,
  reducers: {
    loadedSellerRequest: (state) => {
      state.sellerLoading = true;
    },
    loadedSellerSuccess: (state, action) => {
      state.sellerLoading = false;
      state.isSellerAuthenticated = true;
      state.seller = action.payload;
    },
    loadSellerFail: (state, action) => {
      state.sellerLoading = false;
      state.sellerError = action.payload;
      state.isSellerAuthenticated = false;
    },
    clearSellerError: (state) => {
      state.sellerError = null;
    },
  },
});

export const {
  loadedSellerRequest,
  loadedSellerSuccess,
  loadSellerFail,
  clearSellerError,
} = sellerSlice.actions;

export default sellerSlice.reducer;