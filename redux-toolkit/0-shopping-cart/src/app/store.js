import { configureStore } from "@reduxjs/toolkit";
import itemsReducer from "../features/items/itemsSlice";
import cartReducer from "../features/shopping-cart/shoppingCartSlice";
import {
  getPersistedState,
  persistStateMiddleware,
} from "./persistStateMiddleware";

export const store = configureStore({
  reducer: {
    items: itemsReducer,
    cart: cartReducer,
  },
  devTools: true,
  preloadedState: getPersistedState(),

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(persistStateMiddleware.middleware),
});
