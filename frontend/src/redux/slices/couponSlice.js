// src/redux/slices/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  //create coupon
  createCouponLoading: false,
  createCouponsuccess: false,
  createCouponError: null,
  coupon: null,

  // Get All Coupons
  getCouponsLoading: false,
  getCouponsSuccess: false,
  coupons: [],
  error: null,

  // Delete Coupon
  deleteLoading: false,
  deleteCouponSuccess: false,
  deleteError: null,
};

const couponSlice = createSlice({
  name: 'coupon-code',
  initialState,
  reducers: {
    //======================== Create Coupon ===================
    couponCreateRequest: (state) => {
      state.createCouponLoading = true;
    },
    couponCreateSuccess: (state, action) => {
      state.createCouponLoading = false;
      state.createCouponsuccess = true;
      state.coupon = action.payload;
    },
    couponCreateFail: (state, action) => {
      state.createCouponLoading = false;
      state.createCouponError = action.payload;
      state.createCouponsuccess = false;
    },

    //=========================== get all Pvents of shop =========================
    getAllCouponsShopRequest: (state) => {
      state.getCouponsLoading = true;
    },
    getAllCouponsShopSuccess: (state, action) => {
      state.getCouponsLoading = false;
      state.coupons = action.payload;
      state.getCouponsSuccess = true;
    },
    getAllCouponsShopFailed: (state, action) => {
      state.getCouponsLoading = false;
      state.error = action.payload;
      state.getCouponsSuccess = false;
    },

    //======================== delete a Coupon ======================
    deleteCouponRequest: (state) => {
      state.deleteLoading = true;
      state.deleteCouponSuccess = false;
      state.deleteError = null; // clear previous error
    },

    deleteCouponSuccess: (state, action) => {
      state.deleteLoading = false;
      state.deleteCouponSuccess = true;

      // Remove the deleted Coupon from the Coupons array immediately
      state.coupons = state.coupons.filter(
        (coupon) => coupon._id !== action.payload
      );

      state.deleteError = null; // clear error just in case
    },

    deleteCouponFailed: (state, action) => {
      state.deleteLoading = false;
      state.deleteCouponSuccess = false;
      state.deleteError = action.payload; // store error message
    },

    clearDeleteState: (state) => {
      state.deleteLoading = false;
      state.deleteCouponSuccess = false;
      state.deleteError = null;
    },

    //========================= clear error and succes ===================s
    clearCreateCoupon: (state) => {
      state.createCouponLoading = false;
      state.createCouponsuccess = false;
      state.coupon = null;
      state.createCouponError = null;
    },
  },
});

export const {
  couponCreateFail,
  couponCreateRequest,
  couponCreateSuccess,
  getAllCouponsShopFailed,
  getAllCouponsShopRequest,
  getAllCouponsShopSuccess,
  deleteCouponFailed,
  deleteCouponRequest,
  deleteCouponSuccess,
  clearDeleteState,
  clearCreateCoupon,
} = couponSlice.actions;

export default couponSlice.reducer;