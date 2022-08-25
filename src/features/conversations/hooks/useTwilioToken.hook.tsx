import { useQuery } from "@tanstack/react-query";

import { ConversationType } from "../../../models/conversations/BarnardConversation.types";
import { ReactQueryKeys } from "../../../constants/keys";
import api from "../../../capableApi";

export const getOwnerClientType = (conversationType: ConversationType) => {
  return (conversationType + "Owner") as ConversationClientType;
};

export const ConversationClientTypes = {
  SMS: "sms",
  SMS_OWNER: "smsOwner",
  CHAT: "chat",
  CHAT_OWNER: "chatOwner",
} as const;

export type ConversationClientType =
  typeof ConversationClientTypes[keyof typeof ConversationClientTypes];

type TokenType = `${ConversationClientType}Token`;

const fetcher = async (type: ConversationClientType) => {
  const tokenType = (type + "Token") as TokenType;
  return api.client.Conversation[tokenType]();
};

export const useTwilioToken = (type: ConversationClientType) => {
  return useQuery([ReactQueryKeys.TWILIO_TOKEN, type], () => fetcher(type), {
    staleTime: Infinity,
  });
};
