// src/store/authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: JSON.parse(localStorage.getItem("users")) || [],
  user: JSON.parse(localStorage.getItem("currentUser")) || null,
  isAuthenticated: !!localStorage.getItem("currentUser"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signup: (state, action) => {
      const user = {
        ...action.payload,
        addresses: [],
        defaultAddress: null,
        isVerified: false,
      };
      state.users.push(user);
      localStorage.setItem("users", JSON.stringify(state.users));
      alert("Signup successful!");
    },

    login: (state, action) => {
      const user = state.users.find(
        u =>
          u.email === action.payload.email &&
          u.password === action.payload.password
      );

      if (!user) {
        alert("Invalid credentials");
        return;
      }

      state.user = user;
      state.isAuthenticated = true;
      localStorage.setItem("currentUser", JSON.stringify(user));
    },

    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem("currentUser");
    },

    addAddress: (state, action) => {
      state.user.addresses.push(action.payload);

      if (state.user.addresses.length === 1) {
        state.user.defaultAddress = 0;
      }

      localStorage.setItem("currentUser", JSON.stringify(state.user));
    },

    deleteAddress: (state, action) => {
      const index = action.payload;

      state.user.addresses.splice(index, 1);

      // fix default address index
      if (state.user.defaultAddress === index) {
        state.user.defaultAddress = null;
      } else if (state.user.defaultAddress > index) {
        state.user.defaultAddress--;
      }

      localStorage.setItem("currentUser", JSON.stringify(state.user));
    },

    setDefaultAddress: (state, action) => {
      state.user.defaultAddress = action.payload;
      localStorage.setItem("currentUser", JSON.stringify(state.user));
    },

    googleLogin: (state, action) => {
      const user = {
        name: action.payload.name,
        email: action.payload.email,
        addresses: [],
        defaultAddress: null,
        isVerified: true,
      };

      state.user = user;
      state.isAuthenticated = true;
      localStorage.setItem("currentUser", JSON.stringify(user));
    },
  },
});

export const {
  signup,
  login,
  logout,
  addAddress,
  deleteAddress,     // 👈 NEW
  setDefaultAddress,
  googleLogin,
} = authSlice.actions;

export default authSlice.reducer;