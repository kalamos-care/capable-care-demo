import useSWR from "swr";
import * as Sentry from "@sentry/react";
import fetcher from "./fetcher";

// Fetch a survey by id.
export default function useSurvey(id) {
  const { data: survey, error } = useSWR(["Survey", "get", id], fetcher);

  if (error) {
    Sentry.captureException(error);
  }

  return {
    survey,
    isLoading: !error && !survey,
    isError: error,
  };
}
