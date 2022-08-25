import {
  InfiniteData,
  useInfiniteQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { Message, Paginator } from "@twilio/conversations";
import { useEffect, useMemo, useState } from "react";

import {
  addMessage,
  generateEmptyConversationMessages,
} from "./useConversationMessages.utils";
import { ConversationClientType } from "./useTwilioToken.hook";
import { ReactQueryKeys } from "../../../constants/keys";
import { useTwilioConversation } from "./useTwilioConversation.hook";

const PAGE_SIZE = 30;

export type InfiniteMessagesData = InfiniteData<Message[]>;

export const useConversationMessages = ({
  conversationSid,
  onMessageAdded,
  conversationClientType,
}: {
  conversationSid: string;
  onMessageAdded?: () => void;
  conversationClientType: ConversationClientType;
}) => {
  const { data: twilioConversation, isError: isErrorTwilioConversation } =
    useTwilioConversation(conversationSid, conversationClientType);
  const queryClient = useQueryClient();

  const [paginator, setPaginator] = useState<Paginator<Message> | undefined>();
  const [isSubscribed, setIsSubscribed] = useState(false);
  const queryKey = useMemo(
    () => [ReactQueryKeys.MESSAGES, conversationSid],
    [conversationSid]
  );

  useEffect(() => {
    //Reset cache and get the first page of messages on mount
    setPaginator(undefined);
    queryClient.resetQueries(queryKey, { exact: true });
  }, [queryClient, queryKey]);

  const fetchConversationMessages = async () => {
    if (!paginator) {
      const paginator = await twilioConversation?.getMessages(PAGE_SIZE);
      setPaginator(paginator);
      return paginator?.items ?? [];
    }

    const prevPagePaginator = await paginator?.prevPage();
    setPaginator(prevPagePaginator);
    const messages = prevPagePaginator?.items ?? [];

    return messages;
  };

  const infiniteQuery = useInfiniteQuery(
    queryKey,
    () => fetchConversationMessages(),
    {
      getPreviousPageParam: () => {
        return !!paginator?.hasPrevPage;
      },
      enabled: !!twilioConversation,
      staleTime: Infinity,
    }
  );

  useEffect(() => {
    if (!twilioConversation) {
      return;
    }

    if (isSubscribed) {
      return;
    }

    twilioConversation.on("messageAdded", (message) => {
      const currentCache =
        queryClient.getQueryData<InfiniteMessagesData>(queryKey) ??
        generateEmptyConversationMessages();

      //FIXME: Make sure that the message is not added twice if twilio subscriptions is not removed properly
      const lastPage = currentCache.pages[currentCache.pages.length - 1];
      const lastMessage = lastPage[lastPage.length - 1];
      if (!(lastMessage?.sid === message?.sid)) {
        queryClient.setQueryData(queryKey, addMessage(currentCache, message));
      }

      if (onMessageAdded) {
        onMessageAdded();
      }
    });

    setIsSubscribed(true);
    return () => {
      twilioConversation._unsubscribe();
    };
  }, [
    twilioConversation,
    onMessageAdded,
    queryClient,
    queryKey,
    infiniteQuery,
    isSubscribed,
  ]);

  return {
    ...infiniteQuery,
    onNewMessage: onMessageAdded,
    isError: infiniteQuery.isError || isErrorTwilioConversation,
  };
};
