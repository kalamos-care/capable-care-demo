import { Alert, Snackbar } from "@mui/material";

// Component that shows a generic error message at the bottom of the screen.
export default function ErrorMessage({ show }) {
  return (
    <Snackbar open={show} anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
      <Alert severity="error" sx={{ width: "100%" }}>
        Something went wrong! Please try again.
      </Alert>
    </Snackbar>
  );
}
