import { useQuery } from "@tanstack/react-query";

import { ReactQueryKeys } from "constants/keys";
import { Task } from "../models/Task";
import api from "capableApi/index";

export const fetchTask = async (taskId: string) => {
  const response = await api.client.Task.get(taskId);

  if (!response.ok) {
    const error = `Error retrieving Task ${response.error}`;
    console.error(error);
    throw Error(error);
  }

  if (!response.body) {
    const error = `Error retrieving Task: no task returned`;
    console.error(error);
    throw Error(error);
  }

  return response.body as Task;
};

export const useTask = (taskId: string) => {
  return useQuery([ReactQueryKeys.TASK, taskId], () => fetchTask(taskId), {
    enabled: !!taskId,
  });
};
