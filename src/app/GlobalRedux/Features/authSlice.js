"use client";

import { createSlice } from "@reduxjs/toolkit";

const AuthSlice = createSlice({
  name: "auth",
  initialState: {
    accessToken:
      typeof window !== "undefined"
        ? JSON.parse(localStorage.getItem("giraffeVeAccessToken"))
        : null,
    refreshToken:
      typeof window !== "undefined"
        ? JSON.parse(localStorage.getItem("giraffeVeRefreshToken"))
        : null,
    user:
      typeof window !== "undefined"
        ? JSON.parse(localStorage.getItem("giraffeVeUser"))
        : {},
  },
  reducers: {
    login: (state, action) => {
      const accessToken = action.payload?.authentication?.accessToken;
      const refreshToken = action.payload?.authentication?.refreshToken;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
      const user = action.payload?.user;
      if (!!action.payload?.merchant) {
        state.role = "merchant";
      } else if (!!action.payload?.admin) {
        state.role = "admin";
      } else {
        state.role = "user";
      }
      state.user = user;
      if (typeof window !== "undefined") {
        localStorage.setItem(
          "giraffeVeAccessToken",
          JSON.stringify(accessToken),
        );
        localStorage.setItem(
          "giraffeVeRefreshToken",
          JSON.stringify(refreshToken),
        );
        localStorage.setItem("giraffeVeUser", JSON.stringify(user));
      }
    },
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      if (typeof window !== "undefined") {
        localStorage.removeItem("giraffeVeAccessToken");
        localStorage.removeItem("giraffeVeRefreshToken");
        localStorage.removeItem("giraffeVeUser");
      }
    },
    refreshUser: (state, action) => {
      state.user = {
        ...state.user,
        email: action.payload?.email,
        name: action.payload?.user?.name,
        // phone_number: action.payload?.phoneNumber,
      };
    },
  },
});

export const { login, logout, refreshUser } = AuthSlice.actions;

export default AuthSlice.reducer;
