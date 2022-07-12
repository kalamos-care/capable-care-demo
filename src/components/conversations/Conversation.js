import { useState, useEffect, useRef } from "react";
import * as Sentry from "@sentry/react";
import { Box, Skeleton, Typography } from "@mui/material";
import useCurrentPatient from "../../fetchDataHooks/useCurrentPatient";
import PreviousMessages from "./PreviousMessages";
import ConversationInput from "./ConversationInput";

// Renders a prompt to send a message.
function StartConversationPrompt() {
  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography textAlign={"center"} marginY={"auto"}>
        Start this conversation by sending a message
      </Typography>
    </Box>
  );
}

function Conversation({ conversation }) {
  const scrollableContainerRef = useRef(null);
  const { currentPatient } = useCurrentPatient();

  const [messages, setMessages] = useState([]);
  const [paginator, setPaginator] = useState();
  const [loadingMessages, setLoadingMessages] = useState(true);

  useEffect(async () => {
    // Fetch the messages on component mount
    try {
      setLoadingMessages(true);
      const messagePaginator = await conversation.getMessages();
      setMessages(messagePaginator.items);
      setPaginator(messagePaginator);
      setLoadingMessages(false);
    } catch (error) {
      Sentry.captureException(error);
      console.error("Couldn't fetch messages", error);
    }

    // Add a listener to the conversation for new messages.
    conversation.on("messageAdded", messageAdded);
  }, []);

  // Adds a new message to the local state and scrolls the conversation to
  // the bottom of the conversation.
  const messageAdded = (newMessage) => {
    // Add the new message to the state
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    // Scroll to the bottom of the InfiniteScroll to show the new message.
    scrollableContainerRef.current?.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Function to fetch the next page of messages and then
  // add them to local state.
  const loadMoreMessages = async () => {
    if (paginator.hasPrevPage) {
      try {
        setLoadingMessages(true);
        const prevPaginator = await paginator.prevPage();
        setMessages((moreRecentMessages) => [
          ...prevPaginator.items,
          ...moreRecentMessages,
        ]);
        setPaginator(prevPaginator);
        scrollableContainerRef.current?.scrollIntoView({
          block: "end",
          inline: "nearest",
        });
        setLoadingMessages(false);
      } catch (error) {
        Sentry.captureException(error);
        console.error("Couldn't fetch messages", error);
      }
    }
  };

  // Function to render the correct messages.
  // If there are messages render them.
  // If not and the app is loading messages render a skeleton.
  // Otherwise render the prompt for starting the conversations.
  const renderMessages = (messages) => {
    if (messages.length > 0) {
      return (
        <Box sx={{ flex: "1 0 auto", position: "relative" }}>
          <PreviousMessages
            messages={messages}
            user={currentPatient}
            loadMoreMessages={loadMoreMessages}
            moreMessagesToLoad={!loadingMessages && paginator?.hasPrevPage}
            scrollableContainerRef={scrollableContainerRef}
          />
        </Box>
      );
    }

    if (loadingMessages) {
      return <Skeleton variant="rectangular" height="100%" animation="wave" />;
    }

    return <StartConversationPrompt />;
  };

  return (
    <>
      {renderMessages(messages)}
      <ConversationInput conversation={conversation} />
    </>
  );
}

export default Conversation;
