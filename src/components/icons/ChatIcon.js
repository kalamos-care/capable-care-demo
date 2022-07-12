import { SvgIcon } from "@mui/material";
import { ReactComponent as Icon } from "../../assets/icons/chat.svg";

export default function ChatIcon(props) {
  return <SvgIcon component={Icon} inheritViewBox {...props} />;
}
