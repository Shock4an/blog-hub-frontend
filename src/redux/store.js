import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slices/auth";
// import { postsReducer } from "./slices/posts";

const initialState = {
  status: 'idle',
  data: JSON.parse(localStorage.getItem('userData')) || null
}

const store = configureStore({
    reducer: {
      auth: authReducer,
        // posts: postsReducer,
    },
    initialState: initialState,
})

export default store; 