import { useMutation, useQueryClient } from "@tanstack/react-query";

import { ReactQueryKeys } from "constants/keys";
import { Task } from "../models/Task";
import api from "capableApi/index";

export const updateTask = async ({ taskId, task }: { taskId: string; task }) => {
  const response = await api.client.Task.update(taskId, {
    body: {
      task,
    },
  });

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

export const useUpdateTask = () => {
  const queryClient = useQueryClient();

  return useMutation(updateTask, {
    onSuccess: () => {
      queryClient.invalidateQueries([ReactQueryKeys.TASKS]);
    },
  });
};
