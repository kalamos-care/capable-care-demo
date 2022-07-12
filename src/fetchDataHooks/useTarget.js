import useSWR from "swr";
import * as Sentry from "@sentry/react";
import fetcher from "./fetcher";

// Fetch a target by id.
export default function useTarget(id) {
  const { data, error } = useSWR(["Target", "get", id], fetcher);

  if (error) {
    Sentry.captureException(error);
  }

  return {
    targetData: data,
    isLoading: !error && !data,
    isError: error,
  };
}
