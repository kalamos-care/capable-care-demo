import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { useEffect, useMemo, useRef, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import { colors } from "styles/colors";
import { ConversationMessagesLoader } from "./ConversationMessagesLoader";
import { useBarnardConversation } from "../hooks/useBarnardConversation.hook";
import { useConversationMessages } from "../hooks/useConversationMessages.hook";
import { useConversationsParticipants } from "../hooks/useConversationsParticipants.hook";
import {
  ConversationType,
  ConversationTypes,
} from "models/conversations/BarnardConversation.types";
import Message from "./Message";
import useCurrentPatient from "fetchDataHooks/useCurrentPatient";

const MessagePlaceholder = ({ text }: { text: string }) => {
  return (
    <Box
      sx={{
        height: "calc(100% - 50px)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography textAlign={"center"} marginY={"auto"} color={colors.lightGrey5}>
        {text}
      </Typography>
    </Box>
  );
};
export const ConversationMessagesContainer = ({
  conversationId: passedConversationId,
  conversationType: passedConversationType,
}: {
  conversationId?: string;
  conversationType?: ConversationType;
}) => {
  const { conversationId: conversationIdParam } = useParams<{
    conversationId?: string;
  }>();

  const { currentPatient: currentUser } = useCurrentPatient();
  const messagesBoxRef = useRef<HTMLDivElement>(null);
  const [scrollToBottom, setScrollToBottom] = useState(false);

  const conversationId = passedConversationId ?? conversationIdParam;

  const { data: barnardConversation } = useBarnardConversation(conversationId);

  const {
    data: participants,
    isLoading: participantsIsLoading,
    isError: participantsIsError,
  } = useConversationsParticipants(barnardConversation?.id ? [barnardConversation?.id] : undefined);

  const { data, isLoading, fetchPreviousPage, isFetchingPreviousPage, hasPreviousPage, isError } =
    useConversationMessages({
      conversationSid: barnardConversation?.twilio_sid ?? "",
      onMessageAdded: () => {
        setScrollToBottom(true);
      },
      // Don't have a good default case for this function, didn't want to make the param optional though
      conversationClientType: ConversationTypes.CHAT,
    });

  useEffect(() => {
    if (scrollToBottom && !isLoading) {
      setScrollToBottom(false);
      messagesBoxRef?.current?.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }, [isLoading, scrollToBottom]);

  const messages = useMemo(() => {
    const messages = data?.pages.flatMap((message) => message) ?? [];
    return messages;
  }, [data]);

  if (isError || participantsIsError) {
    return <MessagePlaceholder text="Error... no conversation was found" />;
  }

  if (isLoading || participantsIsLoading) {
    return <ConversationMessagesLoader />;
  }

  if (data?.pages[0].length === 0) {
    return <MessagePlaceholder text="Start this conversation by sending a message" />;
  }

  return (
    <Box
      id="scrollableBox"
      ref={messagesBoxRef}
      sx={{
        height: "calc(100% - 50px)",
        marginLeft: (theme) => theme.spacing(1),
        marginRight: (theme) => theme.spacing(3),
        marginBottom: (theme) => theme.spacing(1),
        overflowY: "auto",
        display: "flex",
        flexDirection: "column-reverse",
        scrollBehavior: "smooth",
      }}
    >
      <InfiniteScroll
        dataLength={messages.length}
        next={fetchPreviousPage}
        hasMore={!isFetchingPreviousPage && !!hasPreviousPage}
        loader={<h4>Loading... </h4>}
        style={{
          display: "flex",
          flexDirection: "column-reverse",
          overflow: "hidden",
        }}
        inverse={true}
        scrollableTarget="scrollableBox"
        scrollThreshold="50px"
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: (theme) => theme.spacing(2),
          }}
        >
          {messages.map((message) => {
            const author = participants && message?.author ? participants[message?.author] : null;

            const key = message.sid + message?.dateCreated?.getTime();
            return (
              <Message
                key={key}
                author={author}
                message={message}
                sentByMe={
                  message.author === currentUser?.email ||
                  message.author === `${currentUser?.id}@capable-chat.com`
                }
              />
            );
          })}
        </Box>
      </InfiniteScroll>
    </Box>
  );
};
