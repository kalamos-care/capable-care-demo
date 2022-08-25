import { Conversation } from "@twilio/conversations";
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";

import { addConversationParticipant } from "./useAddConversationParticipant.hook";
import { formatError } from "../../../utils/strings";
import { useTwilioClient } from "./useTwilioClient.hook";
import { ConversationType } from "../../../models/conversations/BarnardConversation.types";

export const sendMessage =
  (conversation?: Conversation) => async (message: string) => {
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
          .catch(() => {});
        if (conversationResponse) setConversation(conversationResponse);
      }
    })();
  }, [conversationSid, twilioClient]);

  const send = async (message: string) => {
    if (conversation) {
      return sendMessage(conversation)(message);
    } else {
      await addConversationParticipant(conversationSid);
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
