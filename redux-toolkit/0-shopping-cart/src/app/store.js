import { configureStore } from "@reduxjs/toolkit";
import itemsReducer from "../features/items/itemsSlice";
import cartReducer from "../features/shopping-cart/shoppingCartSlice";

export const store = configureStore({
  reducer: {
    items: itemsReducer,
    cart: cartReducer,
  },
  devTools: true,
});
