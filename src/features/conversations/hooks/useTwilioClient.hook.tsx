import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Client, Message } from "@twilio/conversations";
import { useAtom } from "jotai";

import {
  ConversationClientType,
  ConversationClientTypes,
  fetchTwilioToken,
  useTwilioToken,
} from "./useTwilioToken.hook";
import {
  generateEmptyConversationMessages,
  addMessage,
  isLocalMessage,
  isMessageSentByUser,
  replaceOrCreateMessage,
} from "./useConversationMessages.utils";
import { InfiniteMessagesData } from "./useConversationMessages.hook";
import { ReactQueryKeys } from "constants/keys";
import { twilioClientsAtom } from "atoms";
import { useCurrentPatient } from "fetchDataHooks";

export const useTwilioClient = (type: ConversationClientType) => {
  const queryClient = useQueryClient();
  const { currentPatient: currentUser } = useCurrentPatient();
  const { data: twilioTokenData, isError: isErrorTwilioToken } = useTwilioToken(type);
  const [twilioClients, setTwilioClients] = useAtom(twilioClientsAtom);

  const getClient = async () => {
    if (twilioClients[type]) {
      return twilioClients[type];
    }

    const token = twilioTokenData.twilio_auth_token;
    const client = new Client(token);

    client.on("messageAdded", (message) => {
      const conversationSid = message.conversation.sid;
      const queryKey = [ReactQueryKeys.MESSAGES, conversationSid];

      const currentCache =
        queryClient.getQueryData<InfiniteMessagesData>(queryKey) ??
        generateEmptyConversationMessages();

      if (isMessageSentByUser(message, currentUser ?? undefined)) {
        queryClient.setQueryData(
          queryKey,
          replaceOrCreateMessage(
            currentCache,
            (message: Message) => isLocalMessage(message),
            message
          )
        );
      } else {
        queryClient.setQueryData(queryKey, addMessage(currentCache, message));
      }
    });

    client.on("tokenAboutToExpire", async () => {
      const fetchTokenResponse = await fetchTwilioToken(type);
      const newToken = fetchTokenResponse?.twilio_auth_token;
      client.updateToken(newToken);
    });

    client.on("tokenExpired", async () => {
      const fetchTokenResponse = await fetchTwilioToken(type);
      const newToken = fetchTokenResponse?.twilio_auth_token;
      client.updateToken(newToken);
    });

    setTwilioClients({ ...twilioClients, [type]: client });

    return client;
  };

  const query = useQuery([ReactQueryKeys.TWILIO_CLIENT, type], getClient, {
    staleTime: Infinity,
    enabled: !!twilioTokenData?.twilio_auth_token,
  });

  return { ...query, isError: query.isError || isErrorTwilioToken };
};

export const useInitializeTwilioClients = () => {
  useTwilioClient(ConversationClientTypes.CHAT);
};
