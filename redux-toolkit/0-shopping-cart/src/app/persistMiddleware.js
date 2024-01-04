import { createListenerMiddleware } from "@reduxjs/toolkit";
import { cartSlice } from "../features/shopping-cart/shoppingCartSlice";

const LocalStoreKey = "cart";

export const persistMiddleware = createListenerMiddleware();

persistMiddleware.startListening({
  matcher: (action) => action.type.startsWith(cartSlice.name),
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
