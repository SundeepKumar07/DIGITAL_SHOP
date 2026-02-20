// src/redux/slices/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  loading: true,
  user: null,
  error: null,
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
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  loadedRequest,
  loadedUserSuccess,
  loadUserFail,
  clearError,
} = userSlice.actions;

export default userSlice.reducer;