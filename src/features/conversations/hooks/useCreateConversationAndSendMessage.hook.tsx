import { Client } from "@twilio/conversations";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createChatConversation } from "./useCreateConversation.hook";
import { formatError } from "utils/strings";
import { ReactQueryKeys } from "constants/keys";
import { sendMessage } from "./useSendMessage.hook";
import { useTwilioClient } from "./useTwilioClient.hook";
import { ConversationClientTypes } from "./useTwilioToken.hook";

const createConversationAndSendMessage =
  (twilioClient?: Client) =>
  async ({
    userIds,
    name,
    firstMessage,
  }: {
    userIds: string[];
    name?: string;
    firstMessage: string;
  }) => {
    try {
      const createdConversation = await createChatConversation({
        userIds,
        name,
      });
      const conversationSid = createdConversation.conversation_sid;

      const conversation = await twilioClient?.getConversationBySid(conversationSid);

      await sendMessage(conversation)(firstMessage);
      return createdConversation;
    } catch (e) {
      console.error(formatError(e));
      throw new Error("Error creating conversation");
    }
  };

export const useCreateConversationAndSendMessage = () => {
  const queryClient = useQueryClient();
  const { data: twilioClient } = useTwilioClient(ConversationClientTypes.CHAT);

  return useMutation(createConversationAndSendMessage(twilioClient), {
    onSuccess: () => {
      queryClient.invalidateQueries([ReactQueryKeys.PATIENT_BARNARD_CONVERSATIONS]);
    },
  });
};
