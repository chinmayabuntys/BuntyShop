import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orders: JSON.parse(localStorage.getItem("orders")) || [],
};

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    placeOrder: (state, action) => {
      state.orders.push({
        ...action.payload,
        status: "Placed",
        timeline: ["Order Placed"],
      });
      localStorage.setItem("orders", JSON.stringify(state.orders));
    },

    updateOrderStatus: (state, action) => {
      const order = state.orders.find(o => o.id === action.payload);
      if (order) {
        order.status = "Delivered";
        order.timeline.push("Out for Delivery", "Delivered");
      }
      localStorage.setItem("orders", JSON.stringify(state.orders));
    },
  },
});

export const { placeOrder, updateOrderStatus } = orderSlice.actions;
export default orderSlice.reducer;