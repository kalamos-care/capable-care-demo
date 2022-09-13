import { Client } from "@twilio/conversations";
import { useQuery } from "@tanstack/react-query";

import { ReactQueryKeys } from "constants/keys";
import { ConversationClientType } from "./useTwilioToken.hook";
import { useTwilioClient } from "./useTwilioClient.hook";

const fetchChatConversation = async (client: Client | undefined, conversationSid: string) => {
  const conversation = await client?.getConversationBySid(conversationSid).catch((error) => {
    console.error(error);
    throw new Error(error);
  });
  if (!conversation) {
    console.error(`Error retrieving conversation ${conversationSid}`);
    throw new Error(`Could not find conversation with sid ${conversationSid}`);
  }
  return conversation;
};

export const useTwilioConversation = (
  conversationSid: string,
  conversationClientType: ConversationClientType
) => {
  const { data: client } = useTwilioClient(conversationClientType);
  return useQuery(
    [ReactQueryKeys.TWILIO_CONVERSATION, conversationClientType, conversationSid],
    () => fetchChatConversation(client, conversationSid),
    {
      enabled: !!client && !!conversationSid,
      staleTime: Infinity,
    }
  );
};
