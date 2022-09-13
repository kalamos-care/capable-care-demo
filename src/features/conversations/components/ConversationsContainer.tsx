import Box from "@mui/material/Box/Box";
import CircularProgress from "@mui/material/CircularProgress/CircularProgress";

import { ConversationsList } from "./ConversationsList";
import { Patient } from "models/patients/Patient.types";
import { useConversations } from "features/conversations/hooks/useConversations.hook";
import useCurrentPatient from "fetchDataHooks/useCurrentPatient";

const ConversationsContainer = () => {
  const { currentPatient: patient } = useCurrentPatient();

  const { conversations, participants, isLoading, isError } = useConversations(patient as Patient);

  if (isLoading) {
    return (
      <Box
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return null;
  }

  return (
    <ConversationsList
      conversations={conversations ?? []}
      participants={participants ?? {}}
      pageSize={100}
    />
  );
};

export default ConversationsContainer;
