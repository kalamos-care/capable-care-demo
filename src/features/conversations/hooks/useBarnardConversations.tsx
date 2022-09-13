import { useQuery } from "@tanstack/react-query";

import {
  BarnardConversation,
  ConversationType,
} from "models/conversations/BarnardConversation.types";
import { Patient } from "models/patients/Patient.types";
import { ReactQueryKeys } from "constants/keys";
import api from "capableApi/index";

const fetchBarnardConversationsForPatient = async (
  patient?: Patient,
  conversationType?: ConversationType
) => {
  const conversationsResponse = await api.client.Conversation.list({
    byUserId: [patient?.id],
    byConversationType: [conversationType],
  });
  if (conversationsResponse.error) {
    throw new Error("Error retrieving conversations");
  }
  return conversationsResponse.body;
};

export const fetchBarnardConversations = async (conversationIds: string[]) => {
  const conversationsResponse = await api.client.Conversation.list({
    byId: conversationIds,
  });
  if (conversationsResponse.error) {
    throw new Error("Error retrieving conversations");
  }
  return conversationsResponse.body;
};

export const useBarnardConversationsForPatient = (
  patient?: Patient,
  conversationType?: ConversationType
) => {
  return useQuery(
    [ReactQueryKeys.PATIENT_BARNARD_CONVERSATIONS, patient?.id, conversationType],
    () =>
      fetchBarnardConversationsForPatient(patient, conversationType) as Promise<
        BarnardConversation[]
      >,
    { enabled: !!patient }
  );
};

export const useBarnardConversations = (conversationIds: string[]) => {
  return useQuery(
    [ReactQueryKeys.BARNARD_CONVERSATIONS, ...conversationIds],
    () => fetchBarnardConversations(conversationIds) as Promise<BarnardConversation[]>,
    { enabled: !!conversationIds?.length, staleTime: Infinity }
  );
};
