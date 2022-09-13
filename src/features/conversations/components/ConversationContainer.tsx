import { Box } from "@mui/system";
import { Card, Divider, Skeleton, Typography } from "@mui/material";
import { useParams } from "react-router-dom";

import { colors } from "styles/colors";
import { ConversationMessagesContainer } from "./ConversationMessagesContainer";
import { ConversationTypes } from "models/conversations/BarnardConversation.types";
import { useBarnardConversation } from "../hooks/useBarnardConversation.hook";
import { useSendMessageByConversationSid } from "../hooks/useSendMessage.hook";
import { useTwilioConversation } from "../hooks/useTwilioConversation.hook";
import ImageUpload from "./ImageUpload";
import MessageSendBar from "./MessageSendBar";

const ConversationContainer = () => {
  const { conversationId } = useParams<{
    conversationId: string;
  }>();

  const { data: barnardConversation } = useBarnardConversation(
    conversationId ?? ""
  );

  const { data: twilioConversation, isLoading: twilioConversationLoading } =
    useTwilioConversation(
      barnardConversation?.twilio_sid ?? "",
      ConversationTypes.CHAT
    );

  const { mutate: sendMessage } = useSendMessageByConversationSid(
    barnardConversation?.twilio_sid ?? "",
    ConversationTypes.CHAT
  );

  const Subject = () => {
    if (twilioConversationLoading) {
      return (
        <Skeleton
          style={{ display: "flex" }}
          animation="wave"
          height={20}
          width={300}
        />
      );
    }
    if (twilioConversation) {
      return (
        <Box
          sx={{
            marginX: (theme) => theme.spacing(3),
            marginTop: (theme) => theme.spacing(1),
          }}
        >
          <Typography
            sx={{
              textAlign: "center",
              marginBottom: (theme) => theme.spacing(1),
            }}
          >
            <b>{twilioConversation.friendlyName}</b>
          </Typography>
          <Divider />
        </Box>
      );
    }
    return null;
  };

  return (
    <Card
      sx={{
        border: 1,
        borderRadius: "4px",
        borderColor: colors.lightGrey3,
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Subject />
      <ConversationMessagesContainer />
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "end",
          borderTop: 1,
          borderColor: colors.lightGrey3,
        }}
      >
        <ImageUpload conversation={twilioConversation} />
        <MessageSendBar
          onSend={(message) => {
            sendMessage(message);
          }}
          sx={{ borderTop: 0 }}
        />
      </Box>
    </Card>
  );
};

export default ConversationContainer;
