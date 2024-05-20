"use client";

import { createSlice } from "@reduxjs/toolkit";

const AuthSlice = createSlice({
  name: "auth",
  initialState: {
    accessToken:
      typeof window !== "undefined"
        ? JSON.parse(localStorage.getItem("cloudTenAccessToken"))
        : null,
    refreshToken:
      typeof window !== "undefined"
        ? JSON.parse(localStorage.getItem("cloudTenRefreshToken"))
        : null,
    user:
      typeof window !== "undefined"
        ? JSON.parse(localStorage.getItem("cloudTenUser"))
        : {},
  },
  reducers: {
    login: (state, action) => {
      const accessToken = action.payload?.authentication?.access_token;
      const refreshToken = action.payload?.authentication?.refresh_token;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
      const user = action.payload?.user;
      user.role = user?.roles[0]?.title?.toLowerCase();
      state.user = user;
      if (typeof window !== "undefined") {
        localStorage.setItem(
          "cloudTenAccessToken",
          JSON.stringify(accessToken),
        );
        localStorage.setItem(
          "cloudTenRefreshToken",
          JSON.stringify(refreshToken),
        );
        localStorage.setItem("cloudTenUser", JSON.stringify(user));
      }
    },
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      if (typeof window !== "undefined") {
        localStorage.removeItem("cloudTenAccessToken");
        localStorage.removeItem("cloudTenRefreshToken");
        localStorage.removeItem("cloudTenUser");
      }
    },
    refreshUser: (state, action) => {
      state.user = {
        ...state.user,
        email: action.payload?.email,
        name: action.payload?.name,
        phone_number: action.payload?.phoneNumber,
      };
    },
  },
});

export const { login, logout, refreshUser } = AuthSlice.actions;

export default AuthSlice.reducer;
