import { Card } from "@mui/material";

export default function StyledCard(props) {
  return (
    <Card
      {...props}
      sx={{
        boxShadow: [
          "0px 1px 1px rgba(0, 0, 0, 0.07), 0px 2px 8px rgba(0, 0, 0, 0.06)",
        ],
        color: "text.card",
        paddingY: 1.5,
        paddingX: 2,
        marginY: 1,
        borderRadius: "0.5rem",
        ...props.sx,
      }}
    />
  );
}
