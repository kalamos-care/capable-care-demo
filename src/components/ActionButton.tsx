import { useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import { Add, ArrowBackIosRounded } from "@mui/icons-material";

const icons = {
  back: (
    <ArrowBackIosRounded
      sx={{
        color: "black",
        fontSize: "1rem",
        stroke: "black",
        strokeWidth: 2,
      }}
    />
  ),
  add: (
    <Add
      sx={{
        color: "black",
        fontSize: "1rem",
        stroke: "black",
        strokeWidth: 2,
      }}
    />
  ),
};

type ActionIconKey = keyof typeof icons;

const ActionButton = ({
  type,
  route,
  params,
  size = "small",
  sx,
  onClick,
}: {
  type: ActionIconKey;
  route?: string | -1; // -1 is used to navigate to the previous page
  params?;
  size?: "small" | "medium" | "large";
  sx?: React.CSSProperties;
  onClick?: () => void;
}) => {
  const navigate = useNavigate();

  const changePage = (route, params) => {
    navigate(route, { state: params });
  };

  return (
    <IconButton
      size={size}
      sx={{
        backgroundColor: "background.paper",
        margin: 2,
        "&:hover": {
          backgroundColor: "background.paper", // reverse the mui default hover
        },
        ...sx,
      }}
      onClick={() => (onClick ? onClick() : changePage(route, params))}
    >
      {icons[type]}
    </IconButton>
  );
};

export default ActionButton;
