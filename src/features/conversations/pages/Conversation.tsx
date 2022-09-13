import Box from "@mui/material/Box/Box";

import ActionButton from "components/ActionButton";
import ConversationContainer from "../components/ConversationContainer";
import ConversationHeader from "../components/ConversationHeader";

const Conversation = () => (
  <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
    <ActionButton type={"back"} route={`/chat`} sx={{ position: "absolute", zIndex: 100 }} />
    <ConversationHeader />
    <ConversationContainer />
  </Box>
);

export default Conversation;
