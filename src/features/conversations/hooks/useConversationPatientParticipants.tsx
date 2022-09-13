import { useQuery } from "@tanstack/react-query";

import { BarnardConversation } from "models/conversations/BarnardConversation.types";
import { fetchUsersByIds } from "hooks/useUsers";
import { getAllUserIds } from "./useConversationsParticipants.utils";
import { ReactQueryKeys } from "constants/keys";
import { useBarnardConversation } from "./useBarnardConversation.hook";

const fetchConversationsPatientParticipants = (barnardConversations: BarnardConversation[]) => {
  return fetchUsersByIds(getAllUserIds(barnardConversations));
};

export const useConversationPatientParticipants = (conversationId: string) => {
  const { data: barnardConversation } = useBarnardConversation(conversationId);

  return useQuery(
    [ReactQueryKeys.CONVERSATION_PATIENT_PARTICIPANTS, conversationId],
    () => fetchConversationsPatientParticipants(barnardConversation ? [barnardConversation] : []),
    {
      enabled: !!barnardConversation,
    }
  );
};
