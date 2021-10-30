import axios from "axios";
import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import todoReducer from "../reducers/todo-reducer";

const TodoContext = createContext();

export default function TodoContextProvider({ children }) {
  const [{ todos, openTodoCreateModal }, dispatch] = useReducer(todoReducer, {
    openTodoCreateModal: false,
    todos: [],
  });

  return (
    <TodoContext.Provider value={{ todos, openTodoCreateModal, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
}

export const useTodos = () => useContext(TodoContext);
