import { Box } from "@mui/material";
import { Navigation } from "../components";
import { Outlet } from "react-router";

import { CopyrightFooter } from "../components";

export const WithNavigation = ({ withCopyRight }) => {
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

      {withCopyRight && <CopyrightFooter backgroundColor="#fafafa" />}

      <Navigation />
    </>
  );
};
