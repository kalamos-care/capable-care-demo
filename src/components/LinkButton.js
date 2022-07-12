import { Link } from "@mui/material";

export default function LinkButton({ sx, ...props }) {
  return (
    <Link
      component="button"
      variant="subtitle"
      {...props}
      sx={{
        fontSize: "0.875rem",
        color: "link.default",
        fontWeight: 500,
        textDecoration: "none",
        ...sx,
      }}
    />
  );
}
