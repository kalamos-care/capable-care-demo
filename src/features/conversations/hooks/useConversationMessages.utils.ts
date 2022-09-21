import { Message } from "@twilio/conversations";
import { Patient } from "models/patients/Patient.types";
import { User } from "models/users/User.types";
import { InfiniteMessagesData } from "./useConversationMessages.hook";
import { LOCAL_MESSAGE_PREFIX } from "./useSendMessage.hook";

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

export const removeLastMessage = (cacheContent: InfiniteMessagesData): InfiniteMessagesData => {
  const nextPages = cacheContent.pages.map((page, index) => {
    const lastPageIndex = cacheContent.pages.length - 1;
    if (index === lastPageIndex) {
      return page.filter((_, index) => index < page.length - 1);
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

export const replaceOrCreateMessage = (
  cacheContent: InfiniteMessagesData,
  messageMatcher: (message: Message) => boolean,
  message: Message
) => {
  const messageFound = findMessage(cacheContent, messageMatcher);

  if (messageFound.found) {
    return replaceMessageAtIndexes(cacheContent, messageFound, message);
  }

  return addMessage(cacheContent, message);
};

export const findMessage = (
  cacheContent: InfiniteMessagesData,
  messagePredicate: (message: Message) => boolean
): { pageIndex: number; messageIndex: number; found: boolean } => {
  let pageIndex = -1;
  let messageIndex = -1;

  pageIndex = cacheContent.pages.findIndex((page) => {
    messageIndex = page.findIndex((message) => messagePredicate(message));
    return messageIndex > -1;
  });

  return { pageIndex, messageIndex, found: pageIndex + messageIndex >= 0 };
};

export const replaceMessageAtIndexes = (
  cacheContent: InfiniteMessagesData,
  indexes: { pageIndex: number; messageIndex: number },
  message: Message
) => {
  return {
    ...cacheContent,
    pages: [
      ...cacheContent.pages.slice(0, indexes.pageIndex),
      [
        ...cacheContent.pages[indexes.pageIndex].slice(0, indexes.messageIndex),
        message,
        ...cacheContent.pages[indexes.pageIndex].slice(indexes.messageIndex + 1),
      ],
      ...cacheContent.pages.slice(indexes.pageIndex + 1),
    ],
  } as InfiniteMessagesData;
};

export const isLocalMessage = (message: Message) => {
  return message.sid.startsWith(LOCAL_MESSAGE_PREFIX);
};

export const isMessageSentByUser = (message: Message, user?: User) => {
  return (
    message.author === `${user?.id}@capable-chat.com` ||
    message.author === user?.email ||
    message.author === (user as Patient)?.phone_number?.number
  );
};
