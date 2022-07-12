import useSWR from "swr";
import * as Sentry from "@sentry/react";
import fetcher from "./fetcher";
import Appointment from "../dataModels/Appointment";

// Fetch the patient's appointments.
export default function useAppointments(page = 1, size = 100) {
  const today = new Date();
  // round time to the nearest hour to prevent SWR from polling every second.
  const date = roundToNearestHour(today).toISOString();
  // retrieve upcoming appointments.
  // NOTE: the scheduled_after filter is inclusive.
  const { data, error } = useSWR(
    ["Appointment", "list", { page: page, size: size, scheduledAfter: date }],
    fetcher
  );

  if (error) {
    Sentry.captureException(error);
  }

  let appointments = [];
  if (data) {
    // sort by start time, soonest first.
    appointments = data.sort(
      (prevApp, currentApp) =>
        new Date(prevApp.start) - new Date(currentApp.start)
    );
    // initialize model
    appointments = appointments.map(
      (appointment) => new Appointment(appointment)
    );
  }

  return {
    appointments,
    isLoading: !error && !data,
    isError: error,
  };
}

function roundToNearestHour(date) {
  date.setMinutes(date.getMinutes() + 30);
  date.setMinutes(0, 0, 0);

  return date;
}
