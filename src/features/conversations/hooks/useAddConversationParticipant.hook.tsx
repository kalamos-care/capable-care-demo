import { useMutation } from "@tanstack/react-query";
import api from "capableApi/index";

interface AddConversationParticipantResponse {
  participant_sid: string;
}

export const addConversationParticipant = async (conversationSid: string) => {
  return (await api.client.Conversation.addChatParticipant({
    body: {
      conversation: {
        conversation_sid: conversationSid,
      },
    },
  })) as AddConversationParticipantResponse;
};

export const useAddConversationParticipant = () => {
  return useMutation(addConversationParticipant, {});
};
