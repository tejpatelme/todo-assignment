import { Box } from "@mui/material";

export default function ModalBg({ children }) {
  return (
    <Box
      sx={{
        zIndex: 10,
        width: "100%",
        height: "100vh",
        position: "fixed",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0, 0, 0, 0.8)",
      }}
    >
      {children}
    </Box>
  );
}
