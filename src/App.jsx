import "./App.css";
import { useEffect } from "react";
import axios from "axios";
import {
  TodoModal,
  ModalBg,
  EmptyTodoList,
  Header,
  TodoListContainer,
} from "./components";
import { useTodos } from "./contexts/todo-context";
import Box from "@mui/system/Box";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import { grey } from "@mui/material/colors";

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
        <Header />
        <Button
          onClick={onCreateTaskClicked}
          variant="contained"
          startIcon={<AddIcon />}
        >
          Create Task
        </Button>
        <Typography
          mt={3}
          variant="h6"
          sx={{ fontWeight: 700 }}
          color={grey[700]}
        >
          YOUR TODO'S • {todos.length}
        </Typography>
        {todos.length > 0 ? <TodoListContainer /> : <EmptyTodoList />}
      </Box>
    </div>
  );
}

export default App;
