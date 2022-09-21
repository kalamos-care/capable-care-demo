import { Conversation } from "@twilio/conversations";
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";

import { ConversationType } from "models/conversations/BarnardConversation.types";
import { formatError } from "utils/strings";
import { useTwilioClient } from "./useTwilioClient.hook";

export const LOCAL_MESSAGE_PREFIX = "LOCAL_MESSAGE";

export const sendMessage = (conversation?: Conversation) => async (message: string) => {
  if (!conversation) {
    throw new Error("Conversation not found");
  }
  return conversation.prepareMessage().setBody(message).build().send();
};

export const useSendMessageByConversationSid = (
  conversationSid: string,
  conversationType: ConversationType
) => {
  const { data: twilioClient } = useTwilioClient(conversationType);
  const [conversation, setConversation] = useState<Conversation>();

  useEffect(() => {
    (async () => {
      if (twilioClient && conversationSid) {
        // We expect to catch an error here if the user is not yet part of the conversation,
        // but it should be silent
        const conversationResponse = await twilioClient
          ?.getConversationBySid(conversationSid)
          .catch();
        if (conversationResponse) setConversation(conversationResponse);
      }
    })();
  }, [conversationSid, twilioClient]);

  const send = async (message: string) => {
    if (conversation) {
      return sendMessage(conversation)(message);
    } else {
      const conversationResponse = await twilioClient
        ?.getConversationBySid(conversationSid)
        .catch((e) => console.error(formatError(e)));

      if (!conversationResponse) throw new Error("Error joining conversation");
      setConversation(conversationResponse);
      return sendMessage(conversationResponse)(message);
    }
  };

  return useMutation(send, {});
};

export const useSendMessageByConversation = (conversation: Conversation) => {
  return useMutation(sendMessage(conversation), {});
};
