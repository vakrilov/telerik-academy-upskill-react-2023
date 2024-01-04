import { createListenerMiddleware, isAnyOf } from "@reduxjs/toolkit";
import { cartSlice } from "../features/shopping-cart/shoppingCartSlice";
import { reset } from "./actions";

const LocalStoreKey = "cart";

export const persistMiddleware = createListenerMiddleware();

persistMiddleware.startListening({
  matcher: isAnyOf((action) => action.type.startsWith(cartSlice.name), reset),
  effect: (action, listenerApi) => {
    console.log("persistMiddleware", action);
    localStorage.setItem(
      LocalStoreKey,
      JSON.stringify(listenerApi.getState().cart)
    );
  },
});

export const getPersistedState = () => {
  const cart = JSON.parse(localStorage.getItem(LocalStoreKey));
  return cart ? { cart } : undefined;
};
