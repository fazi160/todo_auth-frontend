// store.js
import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "../reducers/todoSlice"; // Create this file later

export const store = configureStore({
  reducer: {
    todos: todoReducer,
  },
});


