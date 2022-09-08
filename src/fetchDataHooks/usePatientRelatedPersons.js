import useSWR from "swr";
import * as Sentry from "@sentry/react";
import fetcher from "./fetcher";

// Fetch the patient's related persons.
export default function usePatientRelatedPersons() {
  const { data, error } = useSWR(
    [
      "PatientRelatedPerson",
      "list",
      { page: "1", size: "10", sortBy: ["-created_at"] },
    ],
    fetcher
  );

  if (error) {
    Sentry.captureException(error);
  }

  return {
    patientRelatedPersons: data,
    isLoading: !error && !data,
    isError: error,
  };
}
