import { SvgIcon } from "@mui/material";
import { ReactComponent as Icon } from "../../assets/icons/credit-card.svg";

export default function CreditCardIcon() {
  return <SvgIcon component={Icon} inheritViewBox sx={{ width: "36px" }} />;
}
