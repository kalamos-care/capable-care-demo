import useSWR from "swr";
import * as Sentry from "@sentry/react";
import fetcher from "./fetcher";

// Fetch the patient's observations, filtered by goal & sorted by most recent observed_date.
export default function useObservations(
  goalId,
  targetId,
  page = 1,
  size = 100
) {
  const { data, error } = useSWR(
    [
      "Observation",
      "list",
      {
        byGoalId: [goalId],
        page: page,
        size: size,
        sortBy: ["-observed_date"],
      },
    ],
    fetcher
  );

  if (error) {
    Sentry.captureException(error);
  }

  // select the observations for the target
  let observations;
  if (data) {
    observations = data.filter(
      (observation) => observation.target_id == targetId
    );
    observations = observations.sort(
      (o1, o2) => new Date(o2.observed_date) - new Date(o1.observed_date)
    );
  }

  return {
    observations,
    isLoading: !error && !data,
    isError: error,
  };
}
