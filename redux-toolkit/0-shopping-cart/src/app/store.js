import { configureStore, combineReducers } from "@reduxjs/toolkit";
import itemsReducer from "../features/items/itemsSlice";
import { cartSlice } from "../features/shopping-cart/shoppingCartSlice";
import { persistMiddleware, getPersistedState } from "./persistMiddleware";
import { reset } from "./actions";


const rootReducer = combineReducers({
  items: itemsReducer,
  cart: cartSlice.reducer,
});

const rootResettableReducer = (state, action) =>
  action.type === reset.type
    ? rootReducer(undefined, action)
    : rootReducer(state, action);

export const store = configureStore({
  reducer: rootResettableReducer,
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(persistMiddleware.middleware),
  preloadedState: getPersistedState(),
});
