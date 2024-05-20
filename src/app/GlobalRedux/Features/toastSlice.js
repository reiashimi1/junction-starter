"use client";

import { createSlice } from "@reduxjs/toolkit";

const ToastSlice = createSlice({
  name: "toast",
  initialState: {
    show: false,
    message: "",
    success: false,
  },
  reducers: {
    showSuccessToast: (state, action) => {
      state.show = true;
      state.message = action.payload;
      state.success = true;
    },
    showErrorToast: (state, action) => {
      state.show = true;
      state.message = action.payload;
      state.success = false;
    },
    hideToast: (state) => {
      state.show = false;
      state.message = "";
      state.success = false;
    },
  },
});

export const { showSuccessToast, showErrorToast, hideToast } =
  ToastSlice.actions;

export default ToastSlice.reducer;
