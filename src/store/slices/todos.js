import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TODO_LIST } from "../../utils/constants";

const initialState = {
  todos: [],
  isLoading: false,
  error: null,
};

export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
  const response = await fetch(TODO_LIST);

  if (response.ok) {
    return await response.json();
  } else return new Error("Ошибка получения задач");
});
export const createTodo = createAsyncThunk(
  "todos/createTodo",
  async (title) => {
    const newTodo = {
      title,
    };

    const response = await fetch(TODO_LIST, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTodo),
    });

    if (response.ok) {
      return await response.json();
    } else return new Error("Ошибка при создании задачи");
  }
);
export const deleteTodo = createAsyncThunk(
  "todos/deleteTodo",
  async (todoId) => {
    const response = await fetch(TODO_LIST + todoId, { method: "DELETE" });

    if (response.ok) {
      return await response.json();
    } else return new Error("Ошибка при удалении задачи");
  }
);
export const deleteManyTodo = createAsyncThunk(
  "todos/deleteManyTodo",
  async (arrId) => {
    const indexTodos = [];
    for (const id of arrId) {
      const response = await fetch(TODO_LIST + id, { method: "DELETE" });
      indexTodos.push(id);

      if (response.ok && arrId[arrId.length - 1] === id) {
        return indexTodos;
      }
    }
  }
);

const todosSlice = createSlice({
  name: "todos",
  initialState,
  extraReducers(builder) {
    builder.addCase(fetchTodos.fulfilled, (state, action) => {
      state.todos = action.payload;
      state.isLoading = false;
    });
    builder.addCase(fetchTodos.rejected, (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    });
    builder.addCase(fetchTodos.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(createTodo.fulfilled, (state, action) => {
      state.todos = [...state.todos, action.payload];
    });
    builder.addCase(createTodo.rejected, (state, action) => {
      state.error = action.payload;
    });

    builder.addCase(deleteTodo.fulfilled, (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload.id);
    });
    builder.addCase(deleteTodo.rejected, (state, action) => {
      state.error = action.payload;
    });

    builder.addCase(deleteManyTodo.fulfilled, (state, action) => {
      for (const id of action.payload) {
        state.todos = state.todos.filter((todo) => todo.id !== id);
      }
    });
    builder.addCase(deleteManyTodo.rejected, (state, action) => {
      state.error = action.payload;
    });
  },
});

export const todosReducer = todosSlice.reducer;

export const { setTodosInLocale } = todosSlice.actions;

export const selectTodos = (state) => state.todos;
