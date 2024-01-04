import { configureStore, combineReducers, nanoid } from "@reduxjs/toolkit";
import itemsReducer from "../features/items/itemsSlice";
import { cartSlice } from "../features/shopping-cart/shoppingCartSlice";
import { persistMiddleware, getPersistedState } from "./persistMiddleware";
import { reset } from "./actions";
import { awesomeAPI } from "./api";


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
    getDefaultMiddleware({
      thunk: {
        extraArgument: awesomeAPI,
      },
    }).prepend(persistMiddleware.middleware),
  preloadedState: getPersistedState(),
});
