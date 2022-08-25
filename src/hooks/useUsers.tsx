import { useQuery } from "@tanstack/react-query";

import { ReactQueryKeys } from "../constants/keys";
import { User } from "../models/users/User.types";
import api from "../capableApi/index";

export const fetchUsersByIds = async (userIds: string[]) => {
  const usersResponse = await api.client.User.list({
    byId: userIds,
  });
  if (usersResponse.error) {
    throw new Error("Error retrieving users");
  }
  return usersResponse.body as User[];
};

export const useGetUsersByIds = (userIds: string[] = []) => {
  return useQuery(
    [ReactQueryKeys.USERS, ...userIds],
    () => fetchUsersByIds(userIds) as Promise<User[]>,
    {
      enabled: !!userIds.length,
    }
  );
};
