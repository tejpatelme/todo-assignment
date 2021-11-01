import axios from "axios";
import Box from "@mui/system/Box";
import { useTodos } from "../../contexts/todo-context";
import { grey, green } from "@mui/material/colors";
import { CheckIcon, DeleteIcon } from "@mui/icons-material";
import { IconButton, Typography } from "@mui/material";

export default function TodoItem({ todo }) {
  const { dispatch } = useTodos();

  const onDeleteButtonClick = async () => {
    const { status } = await axios.delete(
      `http://localhost:5555/todos/${todo.id}`
    );

    if (status === 200) {
      dispatch({ type: "DELETE_TODO", payload: { todoId: todo.id } });
    }
  };

  const onTodoCompleteClick = async () => {
    const { status, data } = await axios.patch(
      `http://localhost:5555/todos/${todo.id}`,
      { completed: !todo.completed },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (status === 200) {
      dispatch({
        type: "UPDATE_TODO",
        payload: { todoId: todo.id, updatedTodo: data },
      });
    }
  };

  return (
    <Box
      sx={{
        borderRadius: 1,
        border: 1,
        borderColor: grey[500],
        textDecoration: todo.completed ? "line-through" : "none",
      }}
      p={1}
      mb={2}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant={"h6"} mb={1}>
          {todo.title}
        </Typography>

        <Box>
          <IconButton
            onClick={onTodoCompleteClick}
            sx={{
              marginRight: 1,
              backgroundColor: todo.completed && green[200],
            }}
            size="small"
            color="success"
          >
            <CheckIcon />
          </IconButton>
          <IconButton onClick={onDeleteButtonClick} size="small" color="error">
            <DeleteIcon />
          </IconButton>
        </Box>
      </Box>

      <Typography variant={"body1"} color={grey[800]}>
        {todo.description}
      </Typography>
    </Box>
  );
}
