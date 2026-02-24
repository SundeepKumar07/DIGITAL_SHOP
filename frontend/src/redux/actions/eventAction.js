// src/redux/actions/userActions.js
import axios from 'axios';
import { server } from '../../../server';
import { deleteEventFailed, deleteEventRequest, deleteEventSuccess, eventCreateFail, eventCreateRequest, eventCreateSuccess, getAllEventsShopFailed, getAllEventsShopRequest, getAllEventsShopSuccess } from '../slices/eventSlice';

export const createEvent = (newForm) => async (dispatch) => {
  try {
    dispatch(eventCreateRequest());

    const config = {headers: {"Content-Type": "multipart/form-data"}};
    const res = await axios.post(
        `${server}/event/create-event`,
        newForm,
        config
    )

    dispatch(eventCreateSuccess(res.data.product));
  } catch (err) {
    dispatch(eventCreateFail(err.response?.data?.message || err.message));
  }
};

//get all product of a shop
export const getShopAllEvents = (id) => async (dispatch) => {
  try {
    dispatch(getAllEventsShopRequest());

    const res = await axios.get(
      `${server}/event/get-all-events-shop/${id}`
    );
    dispatch(getAllEventsShopSuccess(res.data?.events));

  } catch (err) {
    dispatch(
      getAllEventsShopFailed(
        err.response?.data?.message || err.message
      )
    );
  }
};

//delete a product
export const deleteShopEvent = (id) => async (dispatch) => {
  try {
    dispatch(deleteEventRequest());
    const res = await axios.delete(
      `${server}/event/delete-shop-event/${id}`,
      { withCredentials: true }
    );
    dispatch(deleteEventSuccess(res.data.message));
  } catch (error) {
    dispatch(deleteEventFailed(error.response?.data?.message || error.message));
  }
}