import { Box } from "@mui/material";
import { Navigation } from "../components";
import { Outlet } from "react-router";

export const WithNavigation = () => {
  return (
    <>
      {/* Main content box */}
      <Box
        sx={{
          flexGrow: 1,
          overflowY: "scroll",
          backgroundColor: "background.default",
        }}
      >
        <Outlet />
      </Box>

      <Navigation />
    </>
  );
};
