"use client";

import { createSlice } from "@reduxjs/toolkit";

const ShoppingCartSlice = createSlice({
  name: "shoppingCart",
  initialState: {
    cart:
      typeof window !== "undefined"
        ? JSON.parse(localStorage.getItem("shoppingCart")) || {}
        : {},
  },
  reducers: {
    updateCart: (state, action) => {
      const { product, quantity } = action.payload;
      const existingProduct = state.cart[product.id];

      if (existingProduct) {
        state.cart[product.id].quantity = quantity;
      } else {
        state.cart[product.id] = { ...product, quantity };
      }

      if (typeof window !== "undefined") {
        localStorage.setItem("shoppingCart", JSON.stringify(state.cart));
      }
    },
    emptyCart: (state) => {
      state.cart = {};
      if (typeof window !== "undefined") {
        localStorage.setItem("shoppingCart", JSON.stringify({}));
      }
    },
    removeProduct: (state, action) => {
      const productId = action.payload;
      if (state.cart[productId]) {
        // if (state.cart[productId].quantity > 1) {
        //   state.cart[productId].quantity -= 1;
        // } else {
        delete state.cart[productId];
        // }
      }
      if (typeof window !== "undefined") {
        localStorage.setItem("shoppingCart", JSON.stringify(state.cart));
      }
    },
  },
});

export const { updateCart, emptyCart, removeProduct } =
  ShoppingCartSlice.actions;

export default ShoppingCartSlice.reducer;
