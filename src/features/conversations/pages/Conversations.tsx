import Box from "@mui/material/Box/Box";
import ChatHeader from "../components/ChatHeader";
import ConversationsContainer from "../components/ConversationsContainer";

const Conversations = () => (
  <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
    <ChatHeader />
    <ConversationsContainer />
  </Box>
);

export default Conversations;
