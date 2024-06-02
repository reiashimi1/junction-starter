"use client";

import { createSlice } from "@reduxjs/toolkit";

const LoginSpinnerSlice = createSlice({
  name: "loginSpinner",
  initialState: {
    show: false,
    message: "",
  },
  reducers: {
    showLoader: (state, action) => {
      state.show = true;
      state.message = action.payload;
    },
    hideLoader: (state) => {
      state.show = false;
      state.message = "";
    },
  },
});

export const { showLoginSpinner, hideLoginSpinner } = LoginSpinnerSlice.actions;

export default LoginSpinnerSlice.reducer;
