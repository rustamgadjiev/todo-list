import { configureStore } from "@reduxjs/toolkit";
import { todosReducer } from "./slices/todos";

export const store = configureStore({
    reducer: {
        todos: todosReducer
    }
});