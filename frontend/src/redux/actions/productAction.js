// src/redux/actions/userActions.js
import axios from 'axios';
import { server } from '../../../server';
import { deleteProductFailed, deleteProductRequest, deleteProductSuccess, getAllProductsFailed, getAllProductsRequest, getAllProductsShopFailed, getAllProductsShopRequest, getAllProductsShopSuccess, getAllProductsSuccess, productCreateFail, productCreateRequest, productCreateSuccess } from '../slices/productSlice';

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

//get all product of a shop
export const getShopAllProducts = (id) => async (dispatch) => {
  try {
    dispatch(getAllProductsShopRequest());

    const res = await axios.get(
      `${server}/product/get-all-products-shop/${id}`
    );
    dispatch(getAllProductsShopSuccess(res.data.products));

  } catch (err) {
    dispatch(
      getAllProductsShopFailed(
        err.response?.data?.message || err.message
      )
    );
  }
};

//delete a product
export const deleteShopProduct = (id) => async (dispatch) => {
  console.log(id);
  try {
    dispatch(deleteProductRequest());
    const res = await axios.delete(
      `${server}/product/delete-shop-product/${id}`,
      { withCredentials: true }
    );
    dispatch(deleteProductSuccess(res.data.message));
  } catch (error) {
    dispatch(deleteProductFailed(error.response?.data?.message || error.message));
  }
}

//get all product of all shops
export const getAllProducts = () => async (dispatch) => {
  try {
    dispatch(getAllProductsRequest());

    const res = await axios.get(
      `${server}/product/get-all-products`
    );
    dispatch(getAllProductsSuccess(res.data.products));

  } catch (err) {
    dispatch(
      getAllProductsFailed(
        err.response?.data?.message || err.message
      )
    );
  }
};