import useSWR from "swr";
import * as Sentry from "@sentry/react";
import fetcher from "./fetcher";
import Patient from "../dataModels/Patient";

// Fetch the current patient.
export default function useCurrentPatient() {
  const { data, error } = useSWR(["Patient", "me"], fetcher);

  if (error) {
    Sentry.captureException(error);
  }

  return {
    currentPatient: new Patient(data),
    isLoading: !error && !data,
    isError: error,
  };
}
