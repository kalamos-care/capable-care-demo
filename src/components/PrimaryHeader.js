import { Box } from "@mui/material";

export default function PrimaryHeader({ children, sx }) {
  const style = {
    display: "flex",
    paddingTop: 6,
    paddingBottom: 3,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "primary.main",
    width: "100%",
    color: "primary.contrastText",
    ...sx,
  };

  return <Box sx={style}>{children}</Box>;
}
