import { Typography } from "@mui/material";
import grey from "@mui/material/colors/grey";
import { Box } from "@mui/system";

export default function EmptyTodoList() {
  return (
    <Box
      p={2}
      mt={2}
      sx={{
        borderRadius: 1,
        border: 1,
        borderColor: grey[500],
        backgroundColor: grey[100],
      }}
    >
      <Typography variant="body1">
        You currently have no items in your todo list
      </Typography>
    </Box>
  );
}
