// src/redux/slices/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  loading: true,
  user: null,
  error: null,
  updateSuccess: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loadedRequest: (state) => {
      state.loading = true;
    },
    loadedUserSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    loadUserFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    },

    // UPDATE USER
    updateUserRequest: (state) => {
      state.loading = true;
      state.updateSuccess = false;
    },

    updateUserSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.updateSuccess = true;
    },

    updateUserFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.updateSuccess = false;
    },

    clearError: (state) => {
      state.error = null;
    },

    clearUpdateSuccess: (state) => {
      state.updateSuccess = false;
    },
  },
});

export const {
  loadedRequest,
  loadedUserSuccess,
  loadUserFail,

  updateUserRequest,
  updateUserSuccess,
  updateUserFail,

  clearError,
  clearUpdateSuccess,
} = userSlice.actions;

export default userSlice.reducer;