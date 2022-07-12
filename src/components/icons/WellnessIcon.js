import { SvgIcon } from "@mui/material";
import { ReactComponent as Icon } from "../../assets/icons/profile-wellness.svg";

export default function WellnessIcon() {
  return <SvgIcon component={Icon} inheritViewBox fontSize="large" />;
}
