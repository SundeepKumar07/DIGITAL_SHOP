// src/redux/slices/cartSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,

  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;

      const existItem = state.cartItems.find(
        (i) => i._id === item._id
      );

      if (existItem) {
        state.cartItems = state.cartItems.map((i) =>
          i._id === existItem._id ? item : i
        );
      } else {
        state.cartItems.push(item);
      }

      localStorage.setItem(
        "cartItems",
        JSON.stringify(state.cartItems)
      );
    },

    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (i) => i._id !== action.payload
      );

      localStorage.setItem(
        "cartItems",
        JSON.stringify(state.cartItems)
      );
    },

    updateCartQuantity: (state, action) => {
      const { id, qty } = action.payload;

      const item = state.cartItems.find((i) => i._id === id);

      if (item) {
        item.qty = qty;
      }

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    clearCart: (state) => {
      state.cartItems = [];
      localStorage.removeItem("cartItems");
    },
  },
});

export const { addToCart, removeFromCart, clearCart, updateCartQuantity } =
  cartSlice.actions;

export default cartSlice.reducer;