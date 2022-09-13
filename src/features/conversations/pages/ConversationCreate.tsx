import Box from "@mui/material/Box/Box";

import ActionButton from "components/ActionButton";
import ConversationCreateContainer from "../components/ConversationCreateContainer";
import ConversationsHeader from "../components/ConversationsHeader";

const ConversationCreate = () => (
  <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
    <ActionButton
      type={"back"}
      route={`/chat`}
      sx={{ position: "absolute", zIndex: 100 }}
    />
    <ConversationsHeader />
    <ConversationCreateContainer />
  </Box>
);

export default ConversationCreate;
