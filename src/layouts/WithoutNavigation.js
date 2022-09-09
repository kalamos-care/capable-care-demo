import { Box } from "@mui/material";
import { Outlet } from "react-router";

export const WithoutNavigation = () => {
  return (
    <Box
      sx={{
        flexGrow: 1,
        overflowY: "auto",
        backgroundColor: "background.default",
      }}
    >
      <Outlet />
    </Box>
  );
};
