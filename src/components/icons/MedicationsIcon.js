import { SvgIcon } from "@mui/material";
import { ReactComponent as Icon } from "../../assets/icons/profile-medications.svg";

export default function MedicationsIcon() {
  return <SvgIcon component={Icon} inheritViewBox fontSize="large" />;
}
