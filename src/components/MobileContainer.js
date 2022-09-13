// Contain content inside a sort-of mobile container (375px wide)
import Box from "@mui/material/Box";
import { use100vh } from "react-div-100vh";

export default function MobileContainer({ children }) {
  const height = use100vh();
  // If we're on a desktop browser, wrap the whole page in a grey container,
  // otherwise give the full viewport to the app.
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );

  if (isMobile) {
    return (
      <Box
        sx={{
          display: "flex",
          width: "100%",
          flexDirection: "column",
          bgcolor: "background.paper",
          height: height,
        }}
      >
        {children}
      </Box>
    );
  } else {
    return (
      <Box
        sx={{
          bgcolor: "grey.200",
          width: 1,
          height: height,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            bgcolor: "background.paper",
            width: "375px",
            margin: "0 auto",
            height: height,
          }}
        >
          {children}
        </Box>
      </Box>
    );
  }
}
