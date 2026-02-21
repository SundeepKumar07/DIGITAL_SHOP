// src/redux/slices/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLoading: false,
    success: false,
    product: null,
    error: null,
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    productCreateRequest: (state) => {
      state.isLoading = true;
    },
    productCreateSuccess: (state, action) => {
      state.isLoading = false;
      state.success = true;
      state.product = action.payload;
    },
    productCreateFail: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.success = false;
    },
    clearProductErrors: (state) => {
      state.error = null;
    },
    clearProductSuccess: (state) => {
      state.success = false;
    },
  },
});

export const {
    productCreateFail,
    productCreateRequest,
    productCreateSuccess,
    clearProductErrors,
    clearProductSuccess
} = productSlice.actions;

export default productSlice.reducer;