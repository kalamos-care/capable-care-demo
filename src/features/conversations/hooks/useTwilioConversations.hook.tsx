import { Client, Conversation, Message } from "@twilio/conversations";
import { useQueries } from "@tanstack/react-query";

import {
  BarnardConversation,
  ConversationTypes,
} from "models/conversations/BarnardConversation.types";
import { ConversationClientTypes } from "./useTwilioToken.hook";
import { ConversationWithMessage } from "./useConversations.hook";
import { ReactQueryKeys } from "constants/keys";
import { useTwilioClient } from "./useTwilioClient.hook";

const fetchTwilioConversation = async (
  barnardConversation: BarnardConversation,
  client?: Client
) => {
  const twilioConversation: Conversation | undefined = await client?.getConversationBySid(
    barnardConversation.twilio_sid
  );
  const lastMessageResponse = await twilioConversation?.getMessages(1).catch();
  const lastMessage: Message | undefined = lastMessageResponse?.items?.[0];
  return {
    twilioConversation,
    barnardConversation,
    lastMessage,
  };
};

export const useTwilioChatConversations = (barnardConversations: BarnardConversation[]) => {
  const { data: client, isLoading: clientLoading } = useTwilioClient(ConversationClientTypes.CHAT);

  const queries = barnardConversations
    .filter((conversation) => conversation.conversation_type === ConversationTypes.CHAT)
    .map((conversation) => ({
      queryKey: [ReactQueryKeys.TWILIO_CONVERSATION, conversation.id],
      queryFn: () => fetchTwilioConversation(conversation, client),
      enabled: Boolean(!!barnardConversations?.length && !clientLoading),
      staleTime: Infinity,
    }));

  return useQueries({ queries });
};

export const useTwilioConversations = (barnardConversations: BarnardConversation[]) => {
  const twilioChatConversationQueries = useTwilioChatConversations(barnardConversations);

  // Loading state
  const twilioConversationsLoading = twilioChatConversationQueries.some(
    (result) => result.isLoading
  );

  // Error state
  const twilioConversationsError = twilioChatConversationQueries.some((result) => result.isError);

  // Filter and extract data from chat queries
  const filteredTwilioChatConversations = twilioChatConversationQueries.filter((result) => {
    const data = result?.data as ConversationWithMessage | undefined;
    const conversation = data?.twilioConversation;
    const lastMessage = data?.lastMessage;
    return !result.isLoading && !result.isError && conversation && lastMessage;
  });

  const twilioChatConversations = filteredTwilioChatConversations?.map((c) => c.data);

  const twilioConversations = twilioChatConversations;

  return {
    data: twilioConversations,
    isLoading: twilioConversationsLoading,
    isError: twilioConversationsError,
  };
};
