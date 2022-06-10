import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: JSON.parse(localStorage.getItem("todos")) || [],
};

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    createTodo(state, action) {
      const newTodo = {
        id: state.data[state.data.length - 1]?.id + 1 || state.data.length + 1,
        title: action.payload,
      };

      const updatedTodos = [...state.data, newTodo];

      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      state.data = updatedTodos;
    },
    deleteTodo(state, action) {
      const updatedTodos = state.data.filter(
        (task) => task.id !== action.payload
      );

      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      state.data = updatedTodos;
    },
    multipleDeletionTodo(state, action) {
      for (const id of action.payload) {
        const updatedTodos = state.data.filter((task) => task.id !== id);

        localStorage.setItem("todos", JSON.stringify(updatedTodos));
        state.data = updatedTodos;
      }
    },
  },
});

export const todosReducer = todosSlice.reducer;

export const { createTodo, deleteTodo, multipleDeletionTodo } =
  todosSlice.actions;

export const selectTodos = (state) => state.todos.data;
