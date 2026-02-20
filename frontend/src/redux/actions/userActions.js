// src/redux/actions/userActions.js
import axios from 'axios';
import { server } from '../../../server';
import {
  loadedRequest,
  loadedUserSuccess,
  loadUserFail,
} from '../slices/userSlice';
import {
  loadedSellerRequest,
  loadedSellerSuccess,
  loadSellerFail,
} from '../slices/sellerSlice';

export const loadUser = () => async (dispatch) => {
  try {
    dispatch(loadedRequest());

    const res = await axios.get(`${server}/user/getuser`, {
      withCredentials: true,
    });

    dispatch(loadedUserSuccess(res.data.user));
  } catch (err) {
    dispatch(loadUserFail(err.response?.data?.message || err.message));
  }
};

export const loadSeller = () => async (dispatch) => {
  try {
    dispatch(loadedSellerRequest());

    const res = await axios.get(`${server}/shop/getseller`, {
      withCredentials: true,
    });

    dispatch(loadedSellerSuccess(res.data.user));
  } catch (err) {
    dispatch(loadSellerFail(err.response?.data?.message || err.message));
  }
};