import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";
import { Message } from "@twilio/conversations";
import { useMemo } from "react";

import { ConversationClientType } from "./useTwilioToken.hook";
import { ReactQueryKeys } from "constants/keys";
import { useTwilioConversation } from "./useTwilioConversation.hook";
import { boundMessagePaginatorsAtom, setBoundMessagePaginatorAtom } from "atoms";
import { useAtom } from "jotai";

const PAGE_SIZE = 30;

export type InfiniteMessagesData = InfiniteData<Message[]>;

export const useConversationMessages = ({
  conversationSid,
  conversationClientType,
}: {
  conversationSid: string;
  conversationClientType: ConversationClientType;
}) => {
  const { data: twilioConversation, isError: isErrorTwilioConversation } = useTwilioConversation(
    conversationSid,
    conversationClientType
  );
  const [boundMessagePaginators] = useAtom(boundMessagePaginatorsAtom);
  const [, setBoundMessagePaginator] = useAtom(setBoundMessagePaginatorAtom);

  const getPaginator = async () => {
    let boundPaginator = boundMessagePaginators[conversationSid];
    let isFirstPage = false;

    if (!boundPaginator) {
      isFirstPage = true;
      const paginator = await twilioConversation?.getMessages(PAGE_SIZE);
      if (!paginator) {
        throw new Error("Could not get conversation messages");
      }
      setBoundMessagePaginator({
        conversationSid: conversationSid,
        paginator: paginator,
      });
      boundPaginator = paginator;
    }
    return { paginator: boundPaginator, isFirstPage: isFirstPage };
  };

  const queryKey = useMemo(() => [ReactQueryKeys.MESSAGES, conversationSid], [conversationSid]);

  const fetchConversationMessages = async () => {
    const { paginator, isFirstPage } = await getPaginator();
    let messages: Message[] = [];

    if (isFirstPage) {
      messages = paginator?.items;
    } else {
      if (paginator.hasPrevPage) {
        const prevPagePaginator = await paginator?.prevPage();
        messages = prevPagePaginator?.items ?? [];
        setBoundMessagePaginator({
          conversationSid: conversationSid,
          paginator: prevPagePaginator,
        });
      }
    }

    return messages;
  };

  const infiniteQuery = useInfiniteQuery(queryKey, () => fetchConversationMessages(), {
    getPreviousPageParam: () => {
      const paginator = boundMessagePaginators[conversationSid];
      return !!paginator?.hasPrevPage;
    },
    enabled: !!twilioConversation,
    staleTime: Infinity,
  });

  return {
    ...infiniteQuery,
    isError: infiniteQuery.isError || isErrorTwilioConversation,
  };
};
