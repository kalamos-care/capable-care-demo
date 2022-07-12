import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

export default function ForwardArrowIcon({ sx }) {
  return (
    <ArrowForwardIosIcon
      sx={{
        color: "black",
        fontSize: "0.8rem",
        stroke: "black",
        strokeWidth: 2,
        ...sx,
      }}
    />
  );
}
