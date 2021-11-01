import { useState } from "react";
import axios from "axios";
import { Box } from "@mui/system";
import { Button } from "@mui/material";
import { IconButton, TextField } from "@mui/material";
import { useTodos } from "../../contexts/todo-context";
import CloseIcon from "@mui/icons-material/Close";

export default function TodoModal() {
  const [todo, setTodo] = useState({
    title: "",
    description: "",
  });
  const { dispatch, openTodoCreateModal } = useTodos();

  const onCreateTodoClicked = async () => {
    if (todo.title.trim() === "") {
      return alert("Title cannot be empty");
    }

    if (todo.description.trim() === "") {
      return alert("Description cannot be empty");
    }

    const { data } = await axios.post(
      "http://localhost:5555/todos",
      { ...todo, completed: false },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    dispatch({ type: "ADD_TODO", payload: { todo: data } });
    dispatch({
      type: "SHOW_TODO_CREATE_MODAL",
      payload: openTodoCreateModal,
    });
  };

  const onCloseModalClicked = () => {
    dispatch({
      type: "SHOW_TODO_CREATE_MODAL",
      payload: openTodoCreateModal,
    });
  };

  return (
    <Box sx={{ backgroundColor: "white", borderRadius: 1 }} p={1}>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <IconButton size="small" onClick={onCloseModalClicked}>
          <CloseIcon />
        </IconButton>
      </Box>

      <TextField
        variant="outlined"
        onChange={(e) => setTodo({ ...todo, title: e.target.value })}
        value={todo.title}
        sx={{ display: "block", marginBottom: "1rem" }}
        fullWidth
        label="Enter task title"
      />
      <TextField
        variant="outlined"
        onChange={(e) => setTodo({ ...todo, description: e.target.value })}
        value={todo.description}
        sx={{ display: "block" }}
        label="Enter todo description"
        fullWidth
        multiline
        rows={4}
      />

      <Box pt={2} sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button onClick={onCreateTodoClicked} variant="contained" size="small">
          Create
        </Button>
      </Box>
    </Box>
  );
}
