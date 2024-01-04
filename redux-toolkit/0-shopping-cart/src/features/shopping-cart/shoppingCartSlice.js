import { createSlice } from "@reduxjs/toolkit";
import { resetStore } from "../../app/action";

const initialState = {};
export const cartSlice = createSlice({
  name: "shopping-cart",
  initialState,
  reducers: {
    addItemToCart(state, action) {
      const { id } = action.payload;
      state[id] = state[id] ? state[id] + 1 : 1;
    },
    removeItemFromCart(state, action) {
      const { id } = action.payload;
      const currentQuantity = state[id] ?? 0;
      if (currentQuantity === 1) {
        delete state[id];
      } else if (currentQuantity > 1) {
        state[id] -= 1;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(resetStore, () => initialState);
  },
});

export const { addItemToCart, removeItemFromCart } = cartSlice.actions;
export default cartSlice.reducer;
