import { TextField } from "@mui/material";
import TextareaAutosize from "@mui/core/TextareaAutosize";
import { Box } from "@mui/system";
import { Button } from "@mui/material";
import { useState } from "react";
import { useTodos } from "../../contexts/todo-context";
import axios from "axios";

export default function TodoModal() {
  const [todo, setTodo] = useState({
    title: "",
    description: "",
  });
  const { dispatch } = useTodos();

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
    setTodo({ title: "", description: "" });
  };

  return (
    <Box sx={{ backgroundColor: "white", borderRadius: 1 }} p={1}>
      <TextField
        onChange={(e) => setTodo({ ...todo, title: e.target.value })}
        value={todo.title}
        sx={{ display: "block" }}
        fullWidth
        variant="filled"
        label="Enter task title"
      />
      <TextareaAutosize
        onChange={(e) => setTodo({ ...todo, description: e.target.value })}
        value={todo.description}
        style={{
          padding: "1rem",
          fontFamily: "inherit",
          outline: "none",
          border: "none",
          fontSize: "1rem",
        }}
        placeholder="Enter todo description"
        maxRows={4}
      />

      <Box pt={2} sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button onClick={onCreateTodoClicked} variant="contained" size="small">
          Create
        </Button>
      </Box>
    </Box>
  );
}
