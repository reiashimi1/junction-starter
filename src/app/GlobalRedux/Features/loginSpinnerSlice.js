"use client";

import { createSlice } from "@reduxjs/toolkit";

const LoginSpinnerSlice = createSlice({
  name: "loginSpinner",
  initialState: {
    show: false,
    message: "",
  },
  reducers: {
    showLoginSpinner: (state, action) => {
      state.show = true;
      state.message = action.payload;
    },
    hideLoginSpinner: (state) => {
      state.show = false;
      state.message = "";
    },
  },
});

export const { showLoginSpinner, hideLoginSpinner } = LoginSpinnerSlice.actions;

export default LoginSpinnerSlice.reducer;
