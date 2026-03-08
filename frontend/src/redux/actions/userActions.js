// src/redux/actions/userActions.js
import axios from 'axios';
import { server } from '../../../server';
import {
  loadedRequest,
  loadedUserSuccess,
  loadUserFail,
  updateUserRequest,
  updateUserSuccess,
  updateUserFail,
} from '../slices/userSlice';
import {
  loadedSellerRequest,
  loadedSellerSuccess,
  loadSellerFail,
} from '../slices/sellerSlice';


// LOAD USER
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


// LOAD SELLER
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



// UPDATE USER INFO
export const updateUserInfo = (data) => async (dispatch) => {
  try {
    dispatch(updateUserRequest());

    const res = await axios.put(
      `${server}/user/update-user-info`,
      data,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    dispatch(updateUserSuccess(res.data.user));

  } catch (err) {
    dispatch(updateUserFail(err.response?.data?.message || err.message));
  }
};


//add addresses
export const AddAdress = (data) => async (dispatch) => {
  try {
    dispatch(updateUserRequest());

    const res = await axios.put(
      `${server}/user/add-address`,
      data,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    dispatch(updateUserSuccess(res.data.user));

  } catch (err) {
    dispatch(updateUserFail(err.response?.data?.message || err.message));
  }
};

// delete address
export const deleteAddress = (index) => async (dispatch) => {
  try {
    const res = await axios.delete(`${server}/user/delete-address/${index}`, { withCredentials: true });
    dispatch(updateUserSuccess(res.data.user));
  } catch (err) {
    console.log(err);
  }
};

//UPDATE USER AVATAR
export const updateUserAvatar = (formData) => async (dispatch) => {
  try {

    const res = await axios.put(
      `${server}/user/update-avatar`,
      formData,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    dispatch(loadedUserSuccess(res.data.user));

  } catch (error) {
    console.log(error);
  }
};