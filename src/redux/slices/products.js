import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../../axios'

export const fetchProducts = createAsyncThunk("items/fetchProducts", async () => {
  const { data } = await axios.get("/items")
  return data;
})

const initialState = {
  products: {
    items: [],
    status: 'loading',
  }
}

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.products.status = 'loading'
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products.items = action.payload;
        state.products.status = 'loaded'
      })
      .addDefaultCase(() => {})
  }
})

export const productsReducer = productsSlice.reducer