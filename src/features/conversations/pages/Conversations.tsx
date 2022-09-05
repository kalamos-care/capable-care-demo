import Box from "@mui/material/Box/Box";

import ConversationsHeader from "../components/ConversationsHeader";
import ConversationsContainer from "../components/ConversationsContainer";

const Conversations = () => (
  <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
    <ConversationsHeader />
    <ConversationsContainer />
  </Box>
);

export default Conversations;
