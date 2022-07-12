import { SvgIcon } from "@mui/material";
import { ReactComponent as Icon } from "../../assets/icons/profile-vitals.svg";

export default function VitalsIcon() {
  return <SvgIcon component={Icon} inheritViewBox fontSize="large" />;
}
