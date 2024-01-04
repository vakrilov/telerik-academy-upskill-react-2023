import { configureStore, combineReducers } from "@reduxjs/toolkit";
import itemsReducer from "../features/items/itemsSlice";
import cartReducer from "../features/shopping-cart/shoppingCartSlice";
import {
  getPersistedState,
  persistStateMiddleware,
} from "./persistStateMiddleware";
import { resetStore } from "./action";
import { awesomeApi } from "./api";

const rootReducer = combineReducers({
  items: itemsReducer,
  cart: cartReducer,
});

const resettableReducer = (state, action) =>
  resetStore.match(action)
    ? rootReducer(undefined, action)
    : rootReducer(state, action);

export const store = configureStore({
  reducer: resettableReducer,
  devTools: true,
  preloadedState: getPersistedState(),

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: awesomeApi,
      }
    }).concat(persistStateMiddleware.middleware),
});
