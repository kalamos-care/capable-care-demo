import useSWR from "swr";
import * as Sentry from "@sentry/react";

import fetcher from "./fetcher";
import Appointment from "../dataModels/Appointment";

// Fetch the patient's appointments.
export default function useAppointments() {
  // retrieve upcoming appointments.
  const { data, error } = useSWR(["Appointment", "list", {}], fetcher);

  if (error) {
    Sentry.captureException(error);
  }

  const appointments = {
    past: [],
    upcoming: [],
  };

  if (data) {
    // sort by start time, soonest first.
    const sortedAppointments = data.sort((prevApp, currentApp) => {
      return new Date(prevApp.start) - new Date(currentApp.start);
    });

    sortedAppointments.forEach((appointment) => {
      const today = new Date();

      if (new Date(appointment.start) < today) {
        appointments.past.push(new Appointment(appointment));
      } else {
        appointments.upcoming.push(new Appointment(appointment));
      }
    });
  }

  return {
    appointments,
    isLoading: !error && !data,
    isError: error,
  };
}
