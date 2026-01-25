// src/store/cartSlice.js
import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    discount: 0,
  },
  reducers: {
    addToCart: (state, action) => {
      const item = state.items.find(i => i.id === action.payload.id);
      if (item) item.qty += 1;
      else state.items.push({ ...action.payload, qty: 1 });
    },

    removeFromCart: (state, action) => {
      state.items = state.items.filter(i => i.id !== action.payload);
    },

    increaseQty: (state, action) => {
      const item = state.items.find(i => i.id === action.payload);
      if (item) item.qty += 1;
    },

    decreaseQty: (state, action) => {
      const item = state.items.find(i => i.id === action.payload);
      if (item && item.qty > 1) item.qty -= 1;
    },

    clearCart: state => {
      state.items = [];
      state.discount = 0;
    },

    applyCoupon: (state, action) => {
      if (action.payload === "SAVE10") state.discount = 0.1;
      else if (action.payload === "SAVE20") state.discount = 0.2;
      else {
        alert("Invalid Coupon");
        state.discount = 0;
      }
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQty,
  decreaseQty,
  clearCart,
  applyCoupon,
} = cartSlice.actions;

export default cartSlice.reducer;