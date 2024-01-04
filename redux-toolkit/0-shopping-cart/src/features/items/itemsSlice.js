import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  { id: "1", name: "Running shoes", price: 120 },
  { id: "2", name: "A ball", price: 2 },
  { id: "3", name: "Awesome Bike", price: 600 },
];

export const itemsSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    addItem(state, action) {
      state.push(action.payload);
    },
  },
});

export default itemsSlice.reducer;
export const { addItem } = itemsSlice.actions;