// src/redux/slices/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  success: false,
  product: null,
  products: null,
  error: null,
  allProducts: null,
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    //======================== Create Product ===================
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

    //=========================== get all products of shop =========================
    getAllProductsShopRequest: (state) => {
      state.isLoading = true;
    },
    getAllProductsShopSuccess: (state, action) => {
      state.isLoading = false;
      state.products = action.payload;
      state.getProductsSuccess = true;
    },
    getAllProductsShopFailed: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.getProductsSuccess = false;
    },

    //======================== delete a product ======================
    // Redux slice improvements
    deleteProductRequest: (state) => {
      state.deleteLoading = true;
      state.deleteProSuccess = false;
      state.deleteError = null; // clear previous error
    },

    deleteProductSuccess: (state, action) => {
      state.deleteLoading = false;
      state.deleteProSuccess = true;

      // Remove the deleted product from the products array immediately
      state.products = state.products.filter(
        (product) => product._id !== action.payload
      );

      state.deleteError = null; // clear error just in case
    },

    deleteProductFailed: (state, action) => {
      state.deleteLoading = false;
      state.deleteProSuccess = false;
      state.deleteError = action.payload; // store error message
    },

    clearDeleteState: (state) => {
      state.deleteLoading = false;
      state.deleteProSuccess = false;
      state.deleteError = null;
    },

    //=========================== get all productsp =========================
    getAllProductsRequest: (state) => {
      state.isLoading = true;
      state.getProductsSuccess = false;
      state.error = null;
    },

    getAllProductsSuccess: (state, action) => {
      state.isLoading = false;
      state.allProducts = action.payload;
      state.getProductsSuccess = true;
    },

    getAllProductsFailed: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.getProductsSuccess = false;
    },

    //========================= clear error and succes ===================s
    clearProductErrors: (state) => {
      state.error = null;
      state.isLoading = false;
    },
    clearProductSuccess: (state) => {
      state.success = false;
      state.isLoading = false;
    },
  },
});

export const {
  productCreateFail,
  productCreateRequest,
  productCreateSuccess,
  getAllProductsShopFailed,
  getAllProductsShopRequest,
  getAllProductsShopSuccess,
  deleteProductFailed,
  deleteProductRequest,
  deleteProductSuccess,
  getAllProductsFailed,
  getAllProductsRequest,
  getAllProductsSuccess,
  clearDeleteState,
  clearProductErrors,
  clearProductSuccess,
} = productSlice.actions;

export default productSlice.reducer;