"use client";

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./Features/authSlice.js";
import loaderReducer from "./Features/loaderSlice.js";
import toastReducer from "./Features/toastSlice.js";
import shoppingCartReducer from "./Features/shoppingCartSlice.js";

const rootReducer = combineReducers({
  authSlice: authReducer,
  loaderSlice: loaderReducer,
  toastSlice: toastReducer,
  shoppingCartSlice: shoppingCartReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
