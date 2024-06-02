"use client";

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./Features/authSlice.js";
import loaderReducer from "./Features/loaderSlice.js";
import toastReducer from "./Features/toastSlice.js";
import loginSpinnerReducer from "./Features/loginSpinnerSlice.js";

const rootReducer = combineReducers({
  authSlice: authReducer,
  loaderSlice: loaderReducer,
  toastSlice: toastReducer,
  loginSpinner: loginSpinnerReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
