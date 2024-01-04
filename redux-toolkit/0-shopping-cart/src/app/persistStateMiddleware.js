import { createListenerMiddleware } from "@reduxjs/toolkit";
import { cartSlice } from "../features/shopping-cart/shoppingCartSlice";

const key = "_AppState_";

export const getPersistedState = () => {
  const persistedState = localStorage.getItem(key);
  return persistedState ? JSON.parse(persistedState) : undefined;
};

export const persistStateMiddleware = createListenerMiddleware();

persistStateMiddleware.startListening({
  matcher: (action) => action.type.startsWith(cartSlice.name),
  effect: (action, listenerAPI) => {
    console.log("persistStateMiddleware", action);
    const cart = listenerAPI.getState().cart;

    localStorage.setItem(key, JSON.stringify({ cart }));
  },
});
