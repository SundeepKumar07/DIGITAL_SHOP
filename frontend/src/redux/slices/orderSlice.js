// src/redux/slices/orderSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  // Create Order
  createOrderLoading: false,
  createOrderSuccess: false,
  createOrderError: null,
  order: null,

  // Get All Orders of Customer
  getUserOrdersLoading: false,
  getUserOrdersSuccess: false,
  userOrders: [],
  userOrdersError: null,

  // Get All Orders of Shop
  getShopOrdersLoading: false,
  getShopOrdersSuccess: false,
  shopOrders: [],
  shopOrdersError: null,

  // Get Single Order Details / Track Order
  getOrderDetailsLoading: false,
  getOrderDetailsSuccess: false,
  orderDetails: null,
  orderDetailsError: null,

  // Update / Cancel / Return Order Status
  updateOrderLoading: false,
  updateOrderSuccess: false,
  updateOrderError: null,

  // Admin All Orders
  adminOrdersLoading: false,
  adminOrdersSuccess: false,
  adminOrders: [],
  adminOrdersError: null,
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    //======================== Create Order ===================
    createOrderRequest: (state) => {
      state.createOrderLoading = true;
      state.createOrderSuccess = false;
      state.createOrderError = null;
    },
    createOrderSuccess: (state, action) => {
      state.createOrderLoading = false;
      state.createOrderSuccess = true;
      state.order = action.payload;
      state.createOrderError = null;
    },
    createOrderFail: (state, action) => {
      state.createOrderLoading = false;
      state.createOrderSuccess = false;
      state.createOrderError = action.payload;
    },

    //======================== Get Customer Orders ===================
    getUserOrdersRequest: (state) => {
      state.getUserOrdersLoading = true;
      state.userOrdersError = null;
    },
    getUserOrdersSuccess: (state, action) => {
      state.getUserOrdersLoading = false;
      state.userOrders = action.payload;
      state.getUserOrdersSuccess = true;
      state.userOrdersError = null;
    },
    getUserOrdersFailed: (state, action) => {
      state.getUserOrdersLoading = false;
      state.getUserOrdersSuccess = false;
      state.userOrdersError = action.payload;
    },

    //======================== Get Shop/Seller Orders ===================
    getShopOrdersRequest: (state) => {
      state.getShopOrdersLoading = true;
      state.shopOrdersError = null;
    },
    getShopOrdersSuccess: (state, action) => {
      state.getShopOrdersLoading = false;
      state.shopOrders = action.payload;
      state.getShopOrdersSuccess = true;
      state.shopOrdersError = null;
    },
    getShopOrdersFailed: (state, action) => {
      state.getShopOrdersLoading = false;
      state.getShopOrdersSuccess = false;
      state.shopOrdersError = action.payload;
    },

    //======================== Get Order Details / Track ===================
    getOrderDetailsRequest: (state) => {
      state.getOrderDetailsLoading = true;
      state.orderDetailsError = null;
    },
    getOrderDetailsSuccess: (state, action) => {
      state.getOrderDetailsLoading = false;
      state.orderDetails = action.payload;
      state.getOrderDetailsSuccess = true;
      state.orderDetailsError = null;
    },
    getOrderDetailsFailed: (state, action) => {
      state.getOrderDetailsLoading = false;
      state.getOrderDetailsSuccess = false;
      state.orderDetailsError = action.payload;
    },

    //======================== Update Order Status / Cancel / Return ===================
    updateOrderStatusRequest: (state) => {
      state.updateOrderLoading = true;
      state.updateOrderSuccess = false;
      state.updateOrderError = null;
    },
    updateOrderStatusSuccess: (state, action) => {
      state.updateOrderLoading = false;
      state.updateOrderSuccess = true;
      state.updateOrderError = null;

      // Update order in shopOrders array if present
      state.shopOrders = state.shopOrders.map((ord) =>
        ord._id === action.payload._id ? action.payload : ord
      );

      // Update order in userOrders array if present
      state.userOrders = state.userOrders.map((ord) =>
        ord._id === action.payload._id ? action.payload : ord
      );
    },
    updateOrderStatusFailed: (state, action) => {
      state.updateOrderLoading = false;
      state.updateOrderSuccess = false;
      state.updateOrderError = action.payload;
    },

    //======================== Admin Get All Orders ===================
    adminAllOrdersRequest: (state) => {
      state.adminOrdersLoading = true;
      state.adminOrdersError = null;
    },
    adminAllOrdersSuccess: (state, action) => {
      state.adminOrdersLoading = false;
      state.adminOrders = action.payload;
      state.adminOrdersSuccess = true;
      state.adminOrdersError = null;
    },
    adminAllOrdersFailed: (state, action) => {
      state.adminOrdersLoading = false;
      state.adminOrdersSuccess = false;
      state.adminOrdersError = action.payload;
    },

    //======================== State Clear Helpers ===================
    clearCreateOrderState: (state) => {
      state.createOrderLoading = false;
      state.createOrderSuccess = false;
      state.createOrderError = null;
      state.order = null;
    },
    clearUpdateOrderState: (state) => {
      state.updateOrderLoading = false;
      state.updateOrderSuccess = false;
      state.updateOrderError = null;
    },
    clearOrderErrors: (state) => {
      state.createOrderError = null;
      state.userOrdersError = null;
      state.shopOrdersError = null;
      state.orderDetailsError = null;
      state.updateOrderError = null;
      state.adminOrdersError = null;
    },
  },
});

export const {
  createOrderRequest,
  createOrderSuccess,
  createOrderFail,
  getUserOrdersRequest,
  getUserOrdersSuccess,
  getUserOrdersFailed,
  getShopOrdersRequest,
  getShopOrdersSuccess,
  getShopOrdersFailed,
  getOrderDetailsRequest,
  getOrderDetailsSuccess,
  getOrderDetailsFailed,
  updateOrderStatusRequest,
  updateOrderStatusSuccess,
  updateOrderStatusFailed,
  adminAllOrdersRequest,
  adminAllOrdersSuccess,
  adminAllOrdersFailed,
  clearCreateOrderState,
  clearUpdateOrderState,
  clearOrderErrors,
} = orderSlice.actions;

export default orderSlice.reducer;