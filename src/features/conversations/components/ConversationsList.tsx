import { Conversation, Message } from "@twilio/conversations";
import { useEffect, useState, Fragment } from "react";
import Box from "@mui/material/Box";

import { BarnardConversation } from "models/conversations/BarnardConversation.types";
import { ConversationPreview } from "./ConversationPreview";
import { ConversationWithMessage } from "../hooks/useConversations.hook";
import { User } from "models/users/User.types";

export const ConversationsList = ({
  conversations,
  participants,
  zeroState = <Fragment />,
  newConversationButton = <Fragment />,
  pageSize = 5,
}: {
  conversations: ConversationWithMessage[];
  participants: Record<string, User>;
  zeroState?: JSX.Element;
  newConversationButton?: JSX.Element;
  pageSize?: number;
}) => {
  const [pageIndex, setPageIndex] = useState<number>(0);
  const [selectedConversations, setSelectedConversations] = useState<ConversationWithMessage[]>([]);

  useEffect(() => {
    const selectedConversations = conversations.slice(
      pageIndex * pageSize,
      (pageIndex + 1) * pageSize
    );
    setSelectedConversations(selectedConversations);
  }, [conversations, pageIndex, pageSize]);

  const conversationList = selectedConversations.map((selectedConversation, i) => {
    const {
      twilioConversation,
      barnardConversation,
      lastMessage,
    }: {
      twilioConversation: Conversation;
      barnardConversation: BarnardConversation;
      lastMessage: Message;
    } = selectedConversation;
    return (
      <ConversationPreview
        key={twilioConversation.sid}
        twilioConversation={twilioConversation}
        barnardConversation={barnardConversation}
        lastMessage={lastMessage}
        participants={participants}
        top={i === 0}
        bottom={i === Math.min(pageSize - 1, selectedConversations.length - 1)}
      />
    );
  });

  return (
    <>
      {selectedConversations.length > 0 ? (
        <Box sx={{ height: "100%", overflow: "auto" }}>{conversationList}</Box>
      ) : (
        zeroState
      )}
    </>
  );
};
