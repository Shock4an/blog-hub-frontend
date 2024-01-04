import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../../axios'

export const fetchOrders = createAsyncThunk("items/fetchOrders", async () => {
  const { data } = await axios.get("/items/orders")
  return data;
})

export const fetchRemoveOrders = createAsyncThunk("items/fetchRemoveOrders", async (id) => {
  await axios.delete(`/items/order/${id}`)
})

const initialState = {
  orders: {
    items: [],
    status: 'loading',
  }
}

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.orders.status = 'loading'
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.orders.items = action.payload;
        state.orders.status = 'loaded'
      })
      .addCase(fetchRemoveOrders.pending, (state, action) => {
        state.orders.items = state.orders.items.filter(obj => obj._id !== action.meta.arg);
      })
      .addDefaultCase(() => {})
  }
})

export const ordersReducers = ordersSlice.reducer