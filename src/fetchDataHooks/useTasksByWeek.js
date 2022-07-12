import useSWR from "swr";
import * as Sentry from "@sentry/react";
import fetcher from "./fetcher";

// Fetch the patient's tasks by week. Takes a tag as an argument.
export default function useTasksByWeek(tagFilter) {
  const { data, error } = useSWR(
    ["Task", "list", { page: 1, size: 10 }],
    fetcher
  );

  if (error) {
    Sentry.captureException(error);
  }

  // Filter the tasks by the requested tag and sort by created_at
  let filteredTasks = [];
  if (data) {
    filteredTasks = data
      .filter((task) =>
        task.tag_list
          .map((t) => t.toLowerCase())
          .includes(tagFilter.toLowerCase())
      )
      .sort((t1, t2) => new Date(t2.created_at) - new Date(t1.created_at));
  }

  return {
    tasks: filteredTasks,
    isLoading: !error && !data,
    isError: error,
  };
}
