import { CardMedia } from "@mui/material";

export default function OnlineIcon() {
  return (
    <CardMedia
      component="img"
      sx={{ width: "20px", objectFit: "fill", marginX: "auto" }}
      image={require("../../assets/icon-online.png")}
      alt="Online"
    />
  );
}
