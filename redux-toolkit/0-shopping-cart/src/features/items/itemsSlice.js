import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit";

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
        return { payload: { id, ...payload } };
      },
      (state, action) => {
        state.push(action.payload);
      }
    ),
  }),
  extraReducers: (builder) => {
    builder.addCase(getItems.fulfilled, (state, action) => {
      state.push(...action.payload);
    });
  },

});

export default itemsSlice.reducer;
export const { addItem } = itemsSlice.actions;

export const getItems = createAsyncThunk(
  "items/getItems",
  async (page, thunkAPI) => {
    console.log("getItems", page);
    const result = await thunkAPI.extra.fetchItems(page);
    console.log("getItems result", result);
    return result;
  }
);
