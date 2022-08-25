import { Conversation, Message } from "@twilio/conversations";

import {
  BarnardConversation,
  ConversationType,
} from "../../../models/conversations/BarnardConversation.types";
import { Patient } from "../../../models/patients/Patient.types";
import { useBarnardConversationsForPatient } from "./useBarnardConversations";
import { useConversationsParticipants } from ".//useConversationsParticipants.hook";
import { useTwilioConversations } from "./useTwilioConversations.hook";

export type ConversationWithMessage = {
  twilioConversation: Conversation;
  barnardConversation: BarnardConversation;
  lastMessage: Message;
};

export const useConversations = (
  patient?: Patient,
  conversationType?: ConversationType
) => {
  // Retrieve conversations in which given patient is a member
  const {
    data: barnardConversationsData,
    isLoading: barnardConversationsLoading,
    isError: barnardConversationsError,
  } = useBarnardConversationsForPatient(patient, conversationType);
  const barnardConversationsDataBody: BarnardConversation[] =
    barnardConversationsData ?? [];

  // Retrieve user objects of all participants in any conversations retrieved
  const {
    data: participants,
    isLoading: participantsLoading,
    isError: participantsError,
  } = useConversationsParticipants(
    barnardConversationsDataBody?.map((c) => c.id) ?? []
  );

  // Retrieve twilio conversation objects from barnard metadata
  const {
    data: twilioConversations,
    isLoading: twilioConversationsLoading,
    isError: twilioConversationsError,
  } = useTwilioConversations(barnardConversationsDataBody);

  const sortedConversations = twilioConversations.sort((a, b) => {
    const dateA =
      a?.twilioConversation?.lastMessage?.dateCreated ||
      a?.lastMessage?.dateCreated ||
      a?.twilioConversation?.dateCreated;
    const dateB =
      b?.twilioConversation?.lastMessage?.dateCreated ||
      b?.lastMessage?.dateCreated ||
      b?.twilioConversation?.dateCreated;
    return dateB.getTime() - dateA.getTime();
  });

  return {
    conversations: sortedConversations as ConversationWithMessage[] | undefined,
    participants,
    isLoading:
      barnardConversationsLoading ||
      twilioConversationsLoading ||
      participantsLoading,
    isError:
      barnardConversationsError ||
      twilioConversationsError ||
      participantsError,
  };
};
