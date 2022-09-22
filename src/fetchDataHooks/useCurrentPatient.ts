import useSWR from "swr";
import * as Sentry from "@sentry/react";
import fetcher from "./fetcher";
import Patient from "models/patients/Patient";
import { Patient as PatientInterface } from "models/index.types";

export interface CurrentPatient extends PatientInterface {
  joinedAt: number;
  name: string;
}

// Fetch the current patient.
export default function useCurrentPatient() {
  const { data, error } = useSWR(["Patient", "me"], fetcher);

  if (error) {
    Sentry.captureException(error);
  }

  return {
    currentPatient: new Patient(data) as unknown as CurrentPatient,
    isLoading: !error && !data,
    isError: error as Error,
  };
}
