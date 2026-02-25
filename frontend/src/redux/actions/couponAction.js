// src/redux/actions/userActions.js
import axios from 'axios';
import { server } from '../../../server';
import { deleteCouponFailed, deleteCouponRequest, deleteCouponSuccess, couponCreateFail, couponCreateRequest, couponCreateSuccess, getAllCouponsShopFailed, getAllCouponsShopRequest, getAllCouponsShopSuccess } from '../slices/couponSlice';

export const createCouponCode = (newForm) => async (dispatch) => {
  try {
    dispatch(couponCreateRequest());

    const res = await axios.post(
      `${server}/coupon-code/create-coupon-code`,
      newForm,
      { withCredentials: true }
    );

    dispatch(couponCreateSuccess(res.data.newCouponCode));

  } catch (err) {
    dispatch(couponCreateFail(err.response?.data?.message || err.message));
  }
};

//get all product of a shop
export const getShopAllCoupons = (id) => async (dispatch) => {
  try {
    dispatch(getAllCouponsShopRequest());

    const res = await axios.get(
      `${server}/coupon-code/get-all-coupon-code-shop/${id}`
    );
    dispatch(getAllCouponsShopSuccess(res.data?.coupons));

  } catch (err) {
    dispatch(
      getAllCouponsShopFailed(
        err.response?.data?.message || err.message
      )
    );
  }
};

//delete a product
export const deleteShopCoupon = (id) => async (dispatch) => {
  try {
    dispatch(deleteCouponRequest());
    const res = await axios.delete(
      `${server}/coupon-code/delete-shop-coupon-code/${id}`,
      { withCredentials: true }
    );
    dispatch(deleteCouponSuccess(res.data.message));
  } catch (error) {
    dispatch(deleteCouponFailed(error.response?.data?.message || error.message));
  }
}