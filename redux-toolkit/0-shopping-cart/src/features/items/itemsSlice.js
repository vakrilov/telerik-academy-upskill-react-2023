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
        return { payload: { ...payload, id } };
      },
      (state, action) => {
        state.push(action.payload);
      }
    ),
  }),
  extraReducers: (builder) => {
    builder.addCase(fetchItemsFromAPI.fulfilled, (state, action) => {
      state.push(...action.payload);
    });
  },
});

export default itemsSlice.reducer;

export const fetchItemsFromAPI = createAsyncThunk(
  "items/fetchItemFromAPI",
  async (page, thunkAPI) => {
    console.log("fetchItemsFromAPI", page);
    const response = await thunkAPI.extra.fetchItems(page);
    console.log("API returned", response);
    return response;
  }
);

export const { addItem } = itemsSlice.actions;
