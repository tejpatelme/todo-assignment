import Box from "@mui/system/Box";
import Typography from "@mui/material/Typography";
import grey from "@mui/material/colors/grey";
import green from "@mui/material/colors/green";
import CheckIcon from "@mui/icons-material/Check";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";
import axios from "axios";
import { useTodos } from "../../contexts/todo-context";

export default function TodoItem({ todo }) {
  const { todos, dispatch } = useTodos();
  const onDeleteButtonClick = async () => {
    const { status } = await axios.delete(
      `http://localhost:5555/todos/${todo.id}`
    );

    if (status === 200) {
      dispatch({ type: "DELETE_TODO", payload: { todoId: todo.id } });
    }
  };

  return (
    <Box
      sx={{
        borderRadius: 1,
        border: 1,
        borderColor: grey[500],
      }}
      p={1}
      mb={2}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant={"h6"} mb={1}>
          {todo.title}
        </Typography>
        <Box>
          <IconButton sx={{ marginRight: 1 }} size="small" color="success">
            <CheckIcon />
          </IconButton>
          <IconButton onClick={onDeleteButtonClick} size="small">
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
