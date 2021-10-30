import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Box from "@mui/system/Box";
import TodoItem from "./components/TodoItem/TodoItem";
import TodoModal from "./components/TodoModal/TodoModal";
import ModalBg from "./components/ModalBg/ModalBg";
import { useTodos } from "./contexts/todo-context";
import AddIcon from "@mui/icons-material/Add";
import { Button } from "@mui/material";

function App() {
  const { todos, dispatch, openTodoCreateModal } = useTodos();

  const onCreateTaskClicked = () =>
    dispatch({
      type: "SHOW_TODO_CREATE_MODAL",
      payload: openTodoCreateModal,
    });

  useEffect(() => {
    (async function () {
      const { data } = await axios.get("http://localhost:5555/todos");

      if (data) {
        dispatch({ type: "SET_TODOS", payload: { todos: data } });
      }
    })();
  }, []);

  return (
    <div className="App">
      {openTodoCreateModal && (
        <ModalBg>
          <TodoModal />
        </ModalBg>
      )}

      <Box p={2}>
        <Button
          onClick={onCreateTaskClicked}
          variant="contained"
          startIcon={<AddIcon />}
        >
          Create Task
        </Button>

        {todos.length > 0 && (
          <Box mt={2}>
            {[...todos]
              .sort((a, b) => b.id - a.id)
              .map((todo) => (
                <TodoItem key={todo.id} todo={todo} />
              ))}
          </Box>
        )}
      </Box>
    </div>
  );
}

export default App;
