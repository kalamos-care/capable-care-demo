import { useQuery } from "@tanstack/react-query";

import { ReactQueryKeys } from "constants/keys";
import api from "capableApi";

export const ConversationClientTypes = {
  CHAT: "chat",
} as const;

export type ConversationClientType =
  typeof ConversationClientTypes[keyof typeof ConversationClientTypes];

type TokenType = `${ConversationClientType}Token`;

export const fetchTwilioToken = async (type: ConversationClientType) => {
  if (!type) {
    throw new Error(`Must use valid token type. Type given: ${type}`);
  }
  const tokenType = (type + "Token") as TokenType;

  const response = await api.client.Conversation[tokenType]();
  if (!response?.ok) {
    throw new Error(`Error retrieving twilio token for ${tokenType}`);
  }

  return response.body;
};

export const useTwilioToken = (type: ConversationClientType) => {
  return useQuery([ReactQueryKeys.TWILIO_TOKEN, type], () => fetchTwilioToken(type), {
    staleTime: Infinity,
  });
};
