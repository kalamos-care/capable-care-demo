import Box from "@mui/material/Box/Box";

import BackButton from "components/BackButton";
import ConversationContainer from "../components/ConversationContainer";
import ConversationsHeader from "../components/ConversationsHeader";

const Conversation = () => (
  <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
    <BackButton route={`/chat`} sx={{ position: "absolute", zIndex: 100 }} />
    <ConversationsHeader />
    <ConversationContainer />
  </Box>
);

export default Conversation;
