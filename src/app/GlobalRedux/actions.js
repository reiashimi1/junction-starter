import { createSelector } from "@reduxjs/toolkit";
import { store } from "@/app/GlobalRedux/store";
import _ from "lodash";

export const user = store.getState().authSlice?.user
// export const selectUser = (state) => state.authSlice?.user;

// const updateUser = () => {
//   const state = store.getState();
//   user = selectUser(state);
// };
// // Subscribe to changes in the Redux store
// store.subscribe(updateUser);
// // Initialize the user variable
// let user = selectUser(store.getState());
// store.subscribe(updateUser);
//
// export { user };

export const getCartProducts = () =>
  createSelector(
    (state) => state.shoppingCartSlice?.cart,
    (shoppingCart) => Object.values(shoppingCart),
  );

export const calculateTotal = () =>
  createSelector(
    (state) => state.shoppingCartSlice?.cart,
    (shoppingCart) =>
      Object.values(shoppingCart).reduce((total, product) => {
        const productTotal =
          product.discount_price > 0
            ? product.quantity * product.discount_price
            : product.quantity * product.price;
        return total + productTotal;
      }, 0),
  );

export const isProductInCart = (productId) =>
  createSelector(
    (state) => state.shoppingCartSlice?.cart,
    (cart) => !!cart[productId],
  );

const selectShoppingCart = (state) => state?.shoppingCartSlice;

export const getTotalQuantity = createSelector(
  [selectShoppingCart],
  (shoppingCart) => {
    return !!shoppingCart?.cart
      ? Object.values(shoppingCart.cart).reduce(
          (totalQuantity, product) => totalQuantity + product.quantity,
          0,
        )
      : 0;
  },
);

export const selectProductById = (productId) =>
  createSelector(
    [selectShoppingCart],
    (shoppingCart) => shoppingCart.cart[productId],
  );
