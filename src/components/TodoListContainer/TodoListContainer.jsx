import { Box } from "@mui/system";
import { TodoItem } from "..";
import { useTodos } from "../../contexts/todo-context";

export default function TodoListContainer() {
  const { todos } = useTodos();

  return (
    <Box mt={2}>
      {[...todos]
        .sort((a, b) => b.id - a.id)
        .map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
    </Box>
  );
}
