import {
  Typography,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import { ForwardArrowIcon } from "../components/icons";

export default function ListLink({ onClick, text, textColor }) {
  return (
    <ListItem
      onClick={onClick}
      sx={{ cursor: "pointer", paddingY: 1 }}
      disablePadding
    >
      <ListItemText
        sx={{ marginLeft: 1 }}
        disableTypography
        primary={
          <Typography color={textColor || "text.card"} variant="h6">
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
