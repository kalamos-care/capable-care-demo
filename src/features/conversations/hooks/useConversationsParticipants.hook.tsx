import { fetchBarnardConversations } from "./useBarnardConversations";
import { fetchUsersByIds } from "../../../hooks/useUsers";
import { User } from "../../../models/users/User.types";
import {
  getAllUserIds,
  getParticipantsByAuthor,
} from "./useConversationsParticipants.utils";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ReactQueryKeys } from "../../../constants/keys";

export type ParticipantMap = Record<string, User>;

export const fetchConversationsParticipants = async (
  conversationIds?: string[],
  practitionersAndTenantAdminData?: Record<string, User>
) => {
  if (!conversationIds) {
    throw new Error("No conversation IDs provided to fetch participants");
  }

  const barnardConversation = await fetchBarnardConversations(conversationIds);
  const users = await fetchUsersByIds(getAllUserIds(barnardConversation));

  return {
    ...getParticipantsByAuthor(users),
    ...practitionersAndTenantAdminData,
  };
};

/**
 * Hook will only fetch if conversationIds is not undefined
 */
export const useConversationsParticipants = (conversationIds?: string[]) => {
  const client = useQueryClient();
  const practitionersAndTenantAdminData = client.getQueryData<
    Record<string, User> | undefined
  >([ReactQueryKeys.PRACTITIONERS_AND_TENANT_ADMINS_DATA]);

  return useQuery(
    [
      ReactQueryKeys.CONVERSATION_PARTICIPANTS,
      conversationIds?.reduce((prev, id) => `${prev}${id}`, ""),
    ],
    () =>
      fetchConversationsParticipants(
        conversationIds,
        practitionersAndTenantAdminData
      ),
    {
      enabled: !!conversationIds,
    }
  );
};
