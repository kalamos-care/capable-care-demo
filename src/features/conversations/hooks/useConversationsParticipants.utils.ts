import { BarnardConversation } from "models/conversations/BarnardConversation.types";
import { isPatient } from "utils/patients";
import { User } from "models/users/User.types";

export const getParticipantsByAuthor = (usersData?: User[]) =>
  usersData?.reduce((obj: Record<string, User>, user: User) => {
    obj[`${user.id}@capable-chat.com`] = user;
    if (user.email) obj[user.email] = user;
    if (isPatient(user)) {
      obj[user.phone_number?.number] = user;
    }
    return obj;
  }, {} as Record<string, User>);

export const getAllUserIds = (barnardConversationsData: BarnardConversation[] | undefined) => {
  const allUserIds =
    barnardConversationsData?.reduce((arr, c) => {
      arr.push(...c.user_ids);
      return arr;
    }, [] as string[]) ?? [];

  return [...Array.from(new Set(allUserIds))];
};
