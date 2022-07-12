import useSWR from "swr";
import * as Sentry from "@sentry/react";
import fetcher from "./fetcher";

// Fetch the patient's goals.
export default function useGoalsByWeek() {
  const { data, error } = useSWR(
    ["Goal", "list", { page: 1, size: 20 }],
    fetcher
  );

  if (error) {
    Sentry.captureException(error);
  }

  // Sort the goals by week tag
  const goals = {
    "week 1": [],
    "week 2": [],
    "week 3": [],
    "week 4": [],
  };
  if (data) {
    data.forEach((goal) => {
      goal.tag_list.forEach((tag) => {
        const lowerTag = tag.toLowerCase();
        if (lowerTag in goals) goals[lowerTag].push(goal);
      });
    });
  }

  return {
    goals,
    isLoading: !error && !data,
    isError: error,
  };
}
