import { Client, Conversation } from "@twilio/conversations";
import { useAtom } from "jotai";
import { useQuery } from "@tanstack/react-query";

import { ReactQueryKeys } from "constants/keys";
import { ConversationClientType, ConversationClientTypes } from "./useTwilioToken.hook";
import { useTwilioClient } from "./useTwilioClient.hook";
import { addBoundConversationAtom, boundConversationsAtom } from "atoms";

export const fetchTwilioConversation = async (
  client: Client | undefined,
  conversationSid: string
) => {
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

export const useGetConversation = () => {
  const [, addBoundConversation] = useAtom(addBoundConversationAtom);
  const [boundConversations] = useAtom(boundConversationsAtom);

  const initConversation = (
    twilioConversation: Conversation,
    conversationType: ConversationClientType
  ) => {
    addBoundConversation({
      twilioConversation: twilioConversation,
      clientType: conversationType,
    });
    return twilioConversation;
  };

  const getConversationBySid = async (
    conversationSid: string,
    conversationType: ConversationClientType,
    client: Client | undefined
  ) => {
    let boundConversation = boundConversations[conversationType][conversationSid];

    if (!boundConversation) {
      const twilioConversation = await fetchTwilioConversation(client, conversationSid);
      boundConversation = initConversation(twilioConversation, ConversationClientTypes.CHAT);
    }

    return boundConversation;
  };

  return { initConversation, getConversationBySid };
};

export const useTwilioConversation = (
  conversationSid: string,
  conversationClientType: ConversationClientType
) => {
  const { data: client } = useTwilioClient(conversationClientType);
  const { getConversationBySid } = useGetConversation();
  return useQuery(
    [ReactQueryKeys.TWILIO_CONVERSATION, conversationClientType, conversationSid],
    () => getConversationBySid(conversationSid, conversationClientType, client),
    {
      enabled: !!client && !!conversationSid,
      staleTime: Infinity,
    }
  );
};
