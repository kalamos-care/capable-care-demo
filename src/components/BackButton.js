import { useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import { ArrowBackIosRounded } from "@mui/icons-material";

export default function BackButton({ route, params, sx, onClick }) {
  const navigate = useNavigate();

  const changePage = (route, params) => {
    navigate(route, { state: params });
  };

  return (
    <IconButton
      size="small"
      sx={{
        backgroundColor: "background.paper",
        margin: 2,
        "&:hover": {
          backgroundColor: "background.paper", // reverse the mui default hover
        },
        ...sx,
      }}
      onClick={() => onClick ? onClick() : changePage(route, params)}
    >
      <ArrowBackIosRounded
        sx={{
          color: "black",
          fontSize: "1rem",
          stroke: "black",
          strokeWidth: 2,
        }}
      />
    </IconButton>
  );
}
