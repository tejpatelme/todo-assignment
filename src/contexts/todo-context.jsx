import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const TodoContext = createContext();

export default function TodoContextProvider({ children }) {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    (async function () {
      const { data } = await axios.get("http://localhost:5555/todos");
      setTodos(data);
    })();
  }, []);

  return (
    <TodoContext.Provider value={{ todos, setTodos }}>
      {children}
    </TodoContext.Provider>
  );
}

export const useTodos = () => useContext(TodoContext);
