import { useQuery } from "@tanstack/react-query";

import { ReactQueryKeys } from "constants/keys";
import { Task } from "../models/Task";
import api from "capableApi/index";

export const fetchTasks = async () => {
  const response = await api.client.Task.list({});

  if (!response.ok) {
    const error = `Error retrieving Tasks ${response.error}`;
    console.error(error);
    throw Error(error);
  }

  if (!response.body) {
    const error = `Error retrieving Tasks: no tasks returned`;
    console.error(error);
    throw Error(error);
  }

  return response.body as Task[];
};

export const useTasks = () => {
  return useQuery([ReactQueryKeys.TASKS], () => fetchTasks());
};
