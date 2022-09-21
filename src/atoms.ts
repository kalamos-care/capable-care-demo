import { Client, Conversation, Paginator, Message } from "@twilio/conversations";
import { ConversationClientType } from "features/conversations/hooks/useTwilioToken.hook";
import { atom } from "jotai";

import { CarePlan } from "models/index.types";

export const carePlanAtom = atom<CarePlan | undefined>(undefined);

export const twilioClientsAtom = atom<Record<ConversationClientType, Client | undefined>>({
  chat: undefined,
});

export const boundConversationsAtom = atom<
  Record<ConversationClientType, Record<string, Conversation>>
>({
  chat: {},
});

export const addBoundConversationAtom = atom(
  null,
  (get, set, update: { twilioConversation: Conversation; clientType: ConversationClientType }) => {
    const boundConversations = get(boundConversationsAtom);
    const { twilioConversation, clientType } = update;

    set(boundConversationsAtom, {
      ...boundConversations,
      [clientType]: {
        ...boundConversations[clientType],
        [twilioConversation.sid]: twilioConversation,
      },
    });
  }
);

export const boundMessagePaginatorsAtom = atom<Record<string, Paginator<Message>>>({});

export const setBoundMessagePaginatorAtom = atom(
  null,
  (
    get,
    set,
    update: {
      conversationSid: string;
      paginator: Paginator<Message>;
    }
  ) => {
    const boundPaginators = get(boundMessagePaginatorsAtom);
    const { conversationSid, paginator } = update;

    set(boundMessagePaginatorsAtom, {
      ...boundPaginators,
      [conversationSid]: paginator,
    });
  }
);
