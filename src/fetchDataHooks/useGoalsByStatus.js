import useSWR from "swr";
import * as Sentry from "@sentry/react";
import fetcher from "./fetcher";

// Fetch the patient's goals.
export default function useGoalsByStatus() {
  const { data, error } = useSWR(
    ["Goal", "list", { page: 1, size: 20 }],
    fetcher
  );

  if (error) {
    Sentry.captureException(error);
  }

  // Divide the goals by achievement_status
  const goals = {
    open: [],
    completed: [],
  };

  if (data) {
    data.forEach((goal) => {
      if (
        goal.achievement_status === "achieved" ||
        goal.achievement_status === "not_attainable"
      ) {
        goals.completed.push(goal);
      } else {
        goals.open.push(goal);
      }
    });
  }
  for (const dividedGoals in goals) {
    // You can sort by a date string rather than an actual Date object:
    // https://stackoverflow.com/questions/10123953/how-to-sort-an-object-array-by-date-property
    goals[dividedGoals] = goals[dividedGoals].sort((a, b) => {
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
    goals,
    isLoading: !error && !data,
    isError: error,
  };
}
