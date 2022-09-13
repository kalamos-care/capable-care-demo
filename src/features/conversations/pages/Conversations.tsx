import Box from "@mui/material/Box/Box";

import ConversationsHeader from "../components/ConversationsHeader";
import ConversationsContainer from "../components/ConversationsContainer";
import ActionButton from "components/ActionButton";

const Conversations = () => (
  <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
    <ActionButton
      type={"add"}
      route={`/chat/create`}
      sx={{ position: "absolute", right: "0px", zIndex: 100 }}
    />
    <ConversationsHeader />
    <ConversationsContainer />
  </Box>
);

export default Conversations;
