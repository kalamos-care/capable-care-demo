import { CardMedia } from "@mui/material";

export default function OfflineIcon() {
  return (
    <CardMedia
      component="img"
      sx={{ width: "20px", objectFit: "fill", marginX: "auto" }}
      image={require("../../assets/icon-offline.png")}
      alt="Offline"
    />
  );
}
