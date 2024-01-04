import { configureStore } from "@reduxjs/toolkit";
import itemsReducer from "../features/items/itemsSlice";
import { cartSlice } from "../features/shopping-cart/shoppingCartSlice";
import { persistMiddleware, getPersistedState } from "./persistMiddleware";

export const store = configureStore({
  reducer: {
    items: itemsReducer,
    cart: cartSlice.reducer,
  },
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(persistMiddleware.middleware),
  preloadedState: getPersistedState(),
});
