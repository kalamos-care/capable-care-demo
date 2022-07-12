import {
  Typography,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import { ForwardArrowIcon } from "../components/icons";

export default function IconListLink({ icon, text, onClick }) {
  return (
    <ListItem
      onClick={onClick}
      sx={{ cursor: "pointer", paddingY: 2 }}
      disablePadding
    >
      <ListItemIcon>{icon}</ListItemIcon>

      <ListItemText
        disableTypography
        primary={
          <Typography color="text.card" variant="h6">
            {text}
          </Typography>
        }
      />

      <ListItemIcon sx={{ display: "flex", justifyContent: "center" }}>
        <ForwardArrowIcon sx={{ color: "text.card", fontSize: "0.625rem" }} />
      </ListItemIcon>
    </ListItem>
  );
}
