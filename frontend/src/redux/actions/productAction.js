// src/redux/actions/userActions.js
import axios from 'axios';
import { server } from '../../../server';
import { productCreateFail, productCreateRequest, productCreateSuccess } from '../slices/productSlice';

export const createProduct = (newForm) => async (dispatch) => {
  try {
    dispatch(productCreateRequest());

    const config = {headers: {"Content-Type": "multipart/form-data"}};
    
    const res = await axios.post(
        `${server}/product/create-product`,
        newForm,
        config
    )

    dispatch(productCreateSuccess(res.data.product));
  } catch (err) {
    dispatch(productCreateFail(err.response?.data?.message || err.message));
  }
};