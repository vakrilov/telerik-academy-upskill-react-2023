import { createSlice, nanoid } from "@reduxjs/toolkit";
import { reset } from "../../app/actions";

const initialState = [
  { id: "1", name: "Running shoes", price: 120 },
  { id: "2", name: "A ball", price: 2 },
  { id: "3", name: "Awesome Bike", price: 600 },
];

export const itemsSlice = createSlice({
  name: "items",
  initialState,
  reducers: (create) => ({
    addItem: create.preparedReducer(
      (payload) => {
        const id = nanoid();
        return { payload: { ...payload, id } };
      },
      (state, action) => {
        state.push(action.payload);
      }
    ),
  }),
  extraReducers: (builder) => builder.addCase(reset, () => initialState),
});

export default itemsSlice.reducer;
export const { addItem } = itemsSlice.actions;
