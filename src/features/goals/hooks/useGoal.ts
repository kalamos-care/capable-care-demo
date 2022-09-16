import { useQuery } from "@tanstack/react-query";
import { ReactQueryKeys } from "constants/keys";
import api from "capableApi/index";
import { Goal } from "features/goals/models/Goal";

const fetchGoal = async (goalId: string) => {
  const response = await api.client.Goal.get(goalId);

  if (!response.ok) {
    const error = `Error retrieving Goal ${response.error}`;
    console.error(error);
    throw Error(error);
  }

  if (!response.body) {
    const error = `Error retrieving Goal: no goal returned`;
    console.error(error);
    throw Error(error);
  }

  return response.body as Goal;
};

// Fetch the patient's goal
export const useGoal = (goalId: string) => {
  return useQuery([ReactQueryKeys.GOAL, goalId], () => fetchGoal(goalId), { enabled: !!goalId });
};
