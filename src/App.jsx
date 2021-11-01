import "./App.css";
import { useEffect } from "react";
import axios from "axios";
import { TodoItem, TodoModal, ModalBg } from "./components";
import { useTodos } from "./contexts/todo-context";
import Box from "@mui/system/Box";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";

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

      <Box p={2} sx={{ maxWidth: "650px", margin: "auto" }}>
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
