import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  adminInfo: localStorage.getItem("adminInfo")
    ? JSON.parse(localStorage.getItem("adminInfo"))
    : null,
  adminToken: localStorage.getItem("adminToken")
    ? localStorage.getItem("adminToken")
    : null,
    isAdmin: localStorage.getItem("isAdmin")
    ? localStorage.getItem("isAdmin")
    : null,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.adminInfo = action.payload;
      state.isAdmin = action.payload.isAdmin;
      localStorage.setItem("adminInfo", JSON.stringify(action.payload));
      localStorage.setItem("adminToken", action.payload.token);
      localStorage.setItem("isAdmin", action.payload.isAdmin);
    },
    logout: (state) => {
      state.userInfo = null;
      state.isAdmin = null;
      localStorage.removeItem("adminInfo");
      localStorage.removeItem("isAdmin");
      localStorage.removeItem("adminToken");
    },
  },
});

export const { setCredentials, logout } = adminSlice.actions;

export default adminSlice.reducer;
