import { CircularProgress, Input } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

import { useCreateConversationAndSendMessage } from "../hooks/useCreateConversationAndSendMessage.hook";
import MessageSendBar from "./MessageSendBar";
import useCurrentPatient from "fetchDataHooks/useCurrentPatient";
import { colors } from "styles/colors";

const ConversationCreateContainer = () => {
  const { currentPatient: patient } = useCurrentPatient();
  const { mutate: create, isLoading } = useCreateConversationAndSendMessage();
  const navigate = useNavigate();
  const [subject, setSubject] = useState<string>("");
  const subjectIsValid = Boolean(subject.trim());

  const onSendFirstMessage = (message: string) => {
    create(
      {
        userIds: [patient.id],
        name: subject,
        firstMessage: message,
      },
      {
        onSuccess: (data) => {
          navigate(`/chat/${data?.id}`);
        },
        onError: () => {
          console.error("Could not create chat conversation");
        },
      }
    );
  };

  if (isLoading) {
    return (
      <Card
        sx={{
          border: 1,
          borderRadius: "4px",
          borderColor: colors.lightGrey3,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress />
      </Card>
    );
  }

  return (
    <Card
      sx={{
        border: 1,
        borderRadius: "4px",
        borderColor: colors.lightGrey3,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            padding: (theme) => theme.spacing(2),
            gap: (theme) => theme.spacing(2),
          }}
        >
          <Typography sx={{ flexBasis: "content" }}>Subject:</Typography>
          <Input
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Required..."
            disableUnderline
            sx={{ flexGrow: 1 }}
          />
        </Box>
        <Divider />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "end",
          borderTop: 1,
          borderColor: colors.lightGrey3,
        }}
      >
        <MessageSendBar
          onSend={onSendFirstMessage}
          sendDisabled={!subjectIsValid}
        />
      </Box>
    </Card>
  );
};

export default ConversationCreateContainer;
