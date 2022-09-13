import ChatIcon from "components/icons/ChatIcon";
import PrimaryHeader from "components/PrimaryHeader";
import Typography from "@mui/material/Typography/Typography";

const ConversationHeader = () => (
  <PrimaryHeader sx={{ height: "8rem", paddingTop: "0.5rem", position: "relative" }}>
    <ChatIcon
      sx={{
        fontSize: "6rem",
        color: "light.main",
        marginBottom: "-1rem",
      }}
    />
    <Typography marginBottom={0.2} color="common.white" variant="h5" component="h1">
      Chat
    </Typography>
  </PrimaryHeader>
);

export default ConversationHeader;
