import { Box, Modal, DialogActions, Button } from "@mui/material";
import { RocketIcon } from "./icons";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  borderRadius: "0.25rem",
  transform: "translate(-50%, -50%)",
  width: "325px",
  bgcolor: "background.paper",
  boxShadow: 24,
  padding: 2,
  ":focus-visible": {
    outline: "none",
  },
};
export default function BasicModal(props) {
  return (
    <Modal
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby={props.ariaLabel || "Modal"}
      aria-describedby={props.ariaDescription || "Modal"}
    >
      <Box sx={style}>
        <DialogActions
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <RocketIcon />
        </DialogActions>

        {props.children}

        <DialogActions
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <Button
            sx={{ width: "40%", paddingY: "0.25rem" }}
            variant="contained"
            onClick={props.handleClose}
          >
            OK
          </Button>
        </DialogActions>
      </Box>
    </Modal>
  );
}
