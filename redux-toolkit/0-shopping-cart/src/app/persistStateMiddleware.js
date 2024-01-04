import { createListenerMiddleware, isAnyOf } from "@reduxjs/toolkit";
import { cartSlice } from "../features/shopping-cart/shoppingCartSlice";
import { resetStore } from "./action";

const key = "_AppState_";

export const getPersistedState = () => {
  const persistedState = localStorage.getItem(key);
  return persistedState ? JSON.parse(persistedState) : undefined;
};

export const persistStateMiddleware = createListenerMiddleware();

persistStateMiddleware.startListening({
  matcher: (action) =>
    isAnyOf(action.type.startsWith(cartSlice.name), resetStore),
  effect: (action, listenerAPI) => {
    const cart = listenerAPI.getState().cart;

    localStorage.setItem(key, JSON.stringify({ cart }));
  },
});
