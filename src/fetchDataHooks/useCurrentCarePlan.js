import useSWR from "swr";
import * as Sentry from "@sentry/react";
import fetcher from "./fetcher";

// Fetch the patient's current care plan.
export default function useCurrentCarePlan() {
  const { data, error } = useSWR(
    ["CarePlan", "list", { page: "1", size: "10", sortBy: ["-created_at"] }],
    fetcher
  );

  if (error) {
    Sentry.captureException(error);
  }

  const mostRecentActiveCarePlan = data
    ? data.find((carePlan) => carePlan.status === "active")
    : undefined;

  return {
    currentPlan: mostRecentActiveCarePlan,
    isLoading: !error && !data,
    isError: error,
  };
}
