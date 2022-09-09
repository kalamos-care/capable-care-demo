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
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          overflowY: "auto",
          backgroundColor: "background.default",
        }}
      >
        <Outlet sx={{ flexGrow: 1 }} />
      </Box>

      {withCopyRight && <CopyrightFooter backgroundColor="#fafafa" />}

      <Navigation />
    </>
  );
};
