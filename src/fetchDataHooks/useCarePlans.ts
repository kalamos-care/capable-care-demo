import useSWR from "swr";
import * as Sentry from "@sentry/react";

import fetcher from "./fetcher";
import { CarePlan } from "models/index.types";

// Fetch the patient's care plans.
export default function useCarePlans() {
  const { data, error } = useSWR(
    ["CarePlan", "list", { page: "1", size: "10", sortBy: ["-created_at"] }],
    fetcher
  );

  if (error) {
    Sentry.captureException(error);
  }

  return {
    carePlans: data as CarePlan[],
    isLoading: !error && !data,
    isError: error,
  };
}
