import Box from "@mui/material/Box/Box";

import ActionButton from "components/ActionButton";
import ConversationCreateContainer from "../components/ConversationCreateContainer";
import ConversationHeader from "../components/ConversationHeader";

const ConversationCreate = () => (
  <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
    <ActionButton type={"back"} route={`/chat`} sx={{ position: "absolute", zIndex: 100 }} />
    <ConversationHeader />
    <ConversationCreateContainer />
  </Box>
);

export default ConversationCreate;
