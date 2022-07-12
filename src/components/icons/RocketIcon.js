import { SvgIcon } from "@mui/material";
import { ReactComponent as Icon } from "../../assets/icons/rocket.svg";

export default function RocketIcon() {
  return <SvgIcon fontSize="medium" component={Icon} inheritViewBox />;
}
