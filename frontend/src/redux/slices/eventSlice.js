// src/redux/slices/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  //create Event
  createEventLoading: false,
  createEventsuccess: false,
  createEventError: null,
  event: null,

  // Get All Events
  getEventsLoading: false,
  getEventsSuccess: false,
  events: [],
  error: null,

  // Delete Event
  deleteLoading: false,
  deleteEventSuccess: false,
  deleteError: null,
};

const eventSlice = createSlice({
  name: 'event',
  initialState,
  reducers: {
    //======================== Create event ===================
    eventCreateRequest: (state) => {
      state.createEventLoading = true;
    },
    eventCreateSuccess: (state, action) => {
      state.createEventLoading = false;
      state.createEventsuccess = true;
      state.event = action.payload;
    },
    eventCreateFail: (state, action) => {
      state.createEventLoading = false;
      state.createEventError = action.payload;
      state.createEventsuccess = false;
    },

    //=========================== get all Pvents of shop =========================
    getAllEventsShopRequest: (state) => {
      state.getEventsLoading = true;
    },
    getAllEventsShopSuccess: (state, action) => {
      state.getEventsLoading = false;
      state.events = action.payload;
      state.getEventsSuccess = true;
    },
    getAllEventsShopFailed: (state, action) => {
      state.getEventsLoading = false;
      state.error = action.payload;
      state.getEventsSuccess = false;
    },

    //======================== delete a Event ======================
    deleteEventRequest: (state) => {
      state.deleteLoading = true;
      state.deleteEventSuccess = false;
      state.deleteError = null; // clear previous error
    },

    deleteEventSuccess: (state, action) => {
      state.deleteLoading = false;
      state.deleteEventSuccess = true;

      // Remove the deleted Event from the Events array immediately
      state.events = state.events.filter(
        (event) => event._id !== action.payload
      );

      state.deleteError = null; // clear error just in case
    },

    deleteEventFailed: (state, action) => {
      state.deleteLoading = false;
      state.deleteEventSuccess = false;
      state.deleteError = action.payload; // store error message
    },

    clearDeleteState: (state) => {
      state.deleteLoading = false;
      state.deleteEventSuccess = false;
      state.deleteError = null;
    },

    //========================= clear error and succes ===================s
    clearCreateEvent: (state) => {
      state.createEventLoading = false;
      state.createEventsuccess = false;
      state.event = null;
      state.createEventError = null;
    },
  },
});

export const {
  eventCreateFail,
  eventCreateRequest,
  eventCreateSuccess,
  getAllEventsShopFailed,
  getAllEventsShopRequest,
  getAllEventsShopSuccess,
  deleteEventFailed,
  deleteEventRequest,
  deleteEventSuccess,
  clearDeleteState,
  clearCreateEvent,
} = eventSlice.actions;

export default eventSlice.reducer;