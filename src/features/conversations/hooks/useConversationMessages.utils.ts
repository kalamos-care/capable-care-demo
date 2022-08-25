import { Message } from "@twilio/conversations";
import { InfiniteMessagesData } from "./useConversationMessages.hook";

export const addMessage = (
  cacheContent: InfiniteMessagesData,
  messageToAdd: Message
): InfiniteMessagesData => {
  const nextPages = cacheContent.pages.map((page, index) => {
    const lastPageIndex = cacheContent.pages.length - 1;
    if (index === lastPageIndex) {
      return [...page, messageToAdd];
    }
    return page;
  });
  return {
    ...cacheContent,
    pages: [...nextPages],
  };
};

export const generateEmptyConversationMessages = (): InfiniteMessagesData => {
  return {
    pages: [],
    pageParams: [],
  };
};
