import { useEffect, useState } from "react";
import { Alert, Box, Skeleton, Snackbar, Typography } from "@mui/material";
import { Client as ConversationsClient } from "@twilio/conversations";
import * as Sentry from "@sentry/react";
import api from "../capableApi";
import useCurrentChatToken from "../fetchDataHooks/useCurrentChatToken";
import useCurrentPatient from "../fetchDataHooks/useCurrentPatient";
import ChatIcon from "../components/icons/ChatIcon";
import Conversation from "../components/conversations/Conversation";
import PrimaryHeader from "../components/PrimaryHeader";

// Chat page header shows the Chat icon and the conversation state.
function Header({ chatState }) {
  const setConnectionState = (state) => {
    switch (state) {
      case "connecting":
        return "Connecting...";
      case "connected":
        return "Connected";
      case "disconnecting":
        return "Disconnecting...";
      case "disconnected":
        return "Disconnected";
      case "denied":
        return "Failed to connect";
    }
  };

  return (
    <PrimaryHeader sx={{ height: "8rem", paddingTop: "0.5rem" }}>
      <ChatIcon
        sx={{
          fontSize: "6rem",
          color: "light.main",
          marginBottom: "-1rem",
        }}
      />

      <Typography
        marginBottom={0.2}
        color="common.white"
        variant="h5"
        component="h1"
      >
        Chat
      </Typography>

      <Typography variant="small" component="small">
        {setConnectionState(chatState)}
      </Typography>
    </PrimaryHeader>
  );
}

export default function Chat() {
  const { currentChatToken, isError: tokenError } = useCurrentChatToken();
  const { currentPatient, isError: patientError } = useCurrentPatient();

  const [connectionState, setConnectionState] = useState("disconnected");
  const [conversation, setConversation] = useState(null);
  const [requestError, setRequestError] = useState(false);
  const [noExistingConv, setNoExistingConv] = useState(false);

  if (tokenError || patientError) setRequestError(true);

  // Function to perform all the common error methods.
  const reportError = (error, consoleMessage) => {
    setRequestError(true);
    Sentry.captureException(error);
    console.error(consoleMessage, error);
  };

  // Effect connect to a conversation if one exists.
  useEffect(async () => {
    if (!currentChatToken) return;

    // Function which checks with Twilio for any existing conversations.
    const checkForExistingConversations = async (client) => {
      try {
        const conversations = await client.getSubscribedConversations();
        setNoExistingConv(conversations.items.length === 0);
      } catch (e) {
        reportError(e, "Couldn't check for an existing conversation");
      }
    };

    try {
      const client = await new ConversationsClient(currentChatToken);
      client.on("connectionStateChanged", setConnectionState);
      client.on("conversationJoined", setConversation);
      await checkForExistingConversations(client);
    } catch (e) {
      reportError(e, "Couldn't create conversation client");
    }
  }, [currentChatToken]);

  // Effect to create a conversation if one doesn't exist.
  useEffect(async () => {
    if (!currentPatient || !noExistingConv || conversation) return;

    try {
      // NOTE: We have a race condition here. We only ever want to create
      //       one new conversation. So we preemptively call
      //       setNoExistingConv(false) and roll that back if the
      //       POST request fails.
      setNoExistingConv(false);
      await api.client.Conversation.createGroupChat({
        body: { conversation: { user_ids: [currentPatient.id] } },
      });
    } catch (e) {
      setNoExistingConv(true);
      reportError(e, "Create conversation failed!");
    }
  }, [currentPatient, noExistingConv, conversation]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <Header chatState={connectionState} />

      {!conversation || requestError ? (
        <Skeleton variant="rectangular" height="100%" animation="wave" />
      ) : (
        <Conversation conversation={conversation} />
      )}

      <Snackbar
        open={requestError}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        // Adding a little margin to raise the alert over the Nav bar
        sx={{ marginBottom: "3.5rem" }}
      >
        <Alert severity="error" sx={{ width: "100%" }}>
          Conversation couldn't be loaded. Please reload.
        </Alert>
      </Snackbar>
    </Box>
  );
}
