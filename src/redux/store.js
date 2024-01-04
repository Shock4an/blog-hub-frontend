import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slices/auth";
import { productsReducer } from "./slices/products";
import { ordersReducers } from "./slices/order";

const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productsReducer,
    orders: ordersReducers,
  }
})

export default store; 