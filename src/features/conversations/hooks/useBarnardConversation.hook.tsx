import { useQuery } from "@tanstack/react-query";

import { BarnardConversation } from "models/conversations/BarnardConversation.types";
import { ReactQueryKeys } from "constants/keys";
import api from "capableApi/index";

const fetchBarnardConversation = async (conversationId?: string) => {
  const response = await api.client.Conversation.list({
    byId: [conversationId],
  });
  if (!response.ok) {
    const error = `Error retrieving BarnardConversation ${response.error}`;
    console.error(error);
    throw Error(error);
  }

  if (!response.body[0]) {
    const error = `Error retrieving BarnardConversation no conversation returned`;
    console.error(error);
    throw Error(error);
  }

  return response.body[0] as BarnardConversation;
};

export const useBarnardConversation = (conversationId?: string) => {
  return useQuery(
    [ReactQueryKeys.BARNARD_CONVERSATION, conversationId],
    () => fetchBarnardConversation(conversationId),
    {
      enabled: !!conversationId,
      staleTime: Infinity,
    }
  );
};
