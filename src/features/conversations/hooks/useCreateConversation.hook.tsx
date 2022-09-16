import { useMutation, useQueryClient } from "@tanstack/react-query";

import { ReactQueryKeys } from "constants/keys";
import api from "capableApi";

type ConversationUserIds = string[];

interface ChatConversationBody {
  body: {
    conversation: {
      user_ids: ConversationUserIds;
      name?: string;
    };
  };
}

interface CreateChatConversationResponse {
  id: string;
  conversation_sid: string;
  conversation_name?: string;
}

export const createChatConversation = async ({
  userIds,
  name,
}: {
  userIds: string[];
  name?: string;
}) => {
  const response = await api.client.Conversation.createGroupChat({
    body: {
      conversation: {
        user_ids: userIds,
        name,
      },
    },
  } as ChatConversationBody);

  if (response?.body) {
    return response.body as CreateChatConversationResponse;
  }
  throw new Error("An unknown error occurred creating a conversation");
};

export const useCreateConversation = () => {
  const queryClient = useQueryClient();

  return useMutation(createChatConversation, {
    onSuccess: () => {
      queryClient.invalidateQueries([ReactQueryKeys.PATIENT_BARNARD_CONVERSATIONS]);
    },
  });
};
