// todoSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  todos: [],
  selectedTodo: null,
  showModal: false,
  createModal: false,
  userData: null,
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    setTodos: (state, action) => {
      state.todos = action.payload;
    },
    setSelectedTodo: (state, action) => {
      state.selectedTodo = action.payload;
    },
    setShowModal: (state, action) => {
      state.showModal = action.payload;
    },
    setCreateModal: (state, action) => {
      state.createModal = action.payload;
    },
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    // Add an updateTodo reducer
    updateTodo: (state, action) => {
      const updatedTodo = action.payload;
      // Find the index of the updatedTodo in the todos array
      const index = state.todos.findIndex((todo) => todo.id === updatedTodo.id);
      if (index !== -1) {
        // Replace the old todo with the updatedTodo
        state.todos[index] = updatedTodo;
      }
    },
    // Add a createTodo reducer
    createTodo: (state, action) => {
      const newTodo = action.payload;
      // Add the newTodo to the todos array
      state.todos.push(newTodo);
    },
    // Add more reducers for other actions if needed
  },
});

export const {
  setTodos,
  setSelectedTodo,
  setShowModal,
  setCreateModal,
  setUserData,
  updateTodo,
  createTodo, // Export createTodo action
} = todoSlice.actions;

export default todoSlice.reducer;
