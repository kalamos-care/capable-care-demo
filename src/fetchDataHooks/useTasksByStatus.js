import useSWR from "swr";
import * as Sentry from "@sentry/react";
import fetcher from "./fetcher";

// Fetch the patient's tasks by week. Takes a tag as an argument.
export default function useTasksByStatus() {
  const { data, error } = useSWR(
    ["Task", "list", { page: 1, size: 10 }],
    fetcher
  );

  if (error) {
    Sentry.captureException(error);
  }

  // Divide the tasks by achievement_status
  const tasks = {
    open: [],
    completed: [],
  };

  if (data) {
    data.forEach((task) => {
      if (task.achievement_status === "cancelled") {
        return;
      } else if (task.achievement_status === "completed") {
        tasks.completed.push(task);
      } else {
        tasks.open.push(task);
      }
    });
  }
  for (const dividedTasks in tasks) {
    // You can sort by a date string rather than an actual Date object:
    // https://stackoverflow.com/questions/10123953/how-to-sort-an-object-array-by-date-property
    tasks[dividedTasks] = tasks[dividedTasks].sort((a, b) => {
      if (a.due_on === null && b.due_on === null) {
        return 0;
      } else if (a.due_on === null) {
        return 1;
      } else if (b.due_on === null) {
        return -1;
      } else {
        return a.due_on - b.due_on;
      }
    });
  }

  return {
    tasks,
    isLoading: !error && !data,
    isError: error,
  };
}
