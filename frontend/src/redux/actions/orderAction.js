// src/redux/actions/orderActions.js
import axios from 'axios';
import { server } from '../../../server';
import {
  adminAllOrdersFailed,
  adminAllOrdersRequest,
  adminAllOrdersSuccess,
  createOrderFail,
  createOrderRequest,
  createOrderSuccess,
  getOrderDetailsFailed,
  getOrderDetailsRequest,
  getOrderDetailsSuccess,
  getShopOrdersFailed,
  getShopOrdersRequest,
  getShopOrdersSuccess,
  getUserOrdersFailed,
  getUserOrdersRequest,
  getUserOrdersSuccess,
  updateOrderStatusFailed,
  updateOrderStatusRequest,
  updateOrderStatusSuccess,
} from '../slices/orderSlice';

// Common Axios Config for JSON Requests
const jsonConfig = {
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
};

// ==========================================
// 1. CREATE NEW ORDER
// ==========================================
export const createOrder = (orderData) => async (dispatch) => {
  try {
    dispatch(createOrderRequest());

    const res = await axios.post(
      `${server}/order/create-order`,
      orderData,
      jsonConfig
    );

    dispatch(createOrderSuccess(res.data.order));
  } catch (err) {
    dispatch(createOrderFail(err.response?.data?.message || err.message));
  }
};

// ==========================================
// 2. GET ALL ORDERS OF LOGGED-IN CUSTOMER
// ==========================================
export const getUserOrders = () => async (dispatch) => {
  try {
    dispatch(getUserOrdersRequest());

    const res = await axios.get(
      `${server}/order/get-all-orders-of-customer`,
      { withCredentials: true }
    );

    dispatch(getUserOrdersSuccess(res.data.orders));
  } catch (err) {
    dispatch(getUserOrdersFailed(err.response?.data?.message || err.message));
  }
};

// ==========================================
// 3. GET ALL ORDERS OF SHOP / SELLER
// ==========================================
export const getShopOrders = () => async (dispatch) => {
  try {
    dispatch(getShopOrdersRequest());

    // Seller identity is securely read from cookie/session on the backend
    const res = await axios.get(
      `${server}/order/get-all-orders-of-shop`,
      { withCredentials: true }
    );

    dispatch(getShopOrdersSuccess(res.data.orders));
    console.log(res.data.orders);
  } catch (err) {
    dispatch(getShopOrdersFailed(err.response?.data?.message || err.message));
  }
};

// ==========================================
// 4. GET SINGLE ORDER DETAILS
// ==========================================
export const getOrderDetails = (orderId) => async (dispatch) => {
  try {
    dispatch(getOrderDetailsRequest());

    const res = await axios.get(
      `${server}/order/get-order-details/${orderId}`,
      { withCredentials: true }
    );

    dispatch(getOrderDetailsSuccess(res.data.order));
  } catch (err) {
    dispatch(getOrderDetailsFailed(err.response?.data?.message || err.message));
  }
};

// ==========================================
// 5. UPDATE ORDER STATUS (Seller Action)
// ==========================================
export const updateOrderStatus = (orderId, status) => async (dispatch) => {
  try {
    dispatch(updateOrderStatusRequest());

    const res = await axios.put(
      `${server}/order/update-order-status/${orderId}`,
      { status },
      jsonConfig
    );

    dispatch(updateOrderStatusSuccess(res.data.order));
  } catch (err) {
    dispatch(updateOrderStatusFailed(err.response?.data?.message || err.message));
  }
};

// ==========================================
// 6. CANCEL ORDER (Customer Action)
// ==========================================
export const cancelOrder = (orderId) => async (dispatch) => {
  try {
    dispatch(updateOrderStatusRequest());

    const res = await axios.put(
      `${server}/order/cancel-order/${orderId}`,
      {},
      { withCredentials: true }
    );

    dispatch(updateOrderStatusSuccess(res.data.order));
  } catch (err) {
    dispatch(updateOrderStatusFailed(err.response?.data?.message || err.message));
  }
};

// ==========================================
// 7. REQUEST RETURN / REFUND (Customer Action)
// ==========================================
export const requestReturn = (orderId, reason) => async (dispatch) => {
  try {
    dispatch(updateOrderStatusRequest());

    const res = await axios.put(
      `${server}/order/request-return/${orderId}`,
      { reason },
      jsonConfig
    );

    dispatch(updateOrderStatusSuccess(res.data.order));
  } catch (err) {
    dispatch(updateOrderStatusFailed(err.response?.data?.message || err.message));
  }
};

// ==========================================
// 8. GET ALL ORDERS (Admin Action)
// ==========================================
export const getAdminAllOrders = () => async (dispatch) => {
  try {
    dispatch(adminAllOrdersRequest());

    const res = await axios.get(
      `${server}/order/admin/all-orders`,
      { withCredentials: true }
    );

    dispatch(adminAllOrdersSuccess(res.data.orders));
  } catch (err) {
    dispatch(adminAllOrdersFailed(err.response?.data?.message || err.message));
  }
};