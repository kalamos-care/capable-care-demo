import useSWR from "swr";
import * as Sentry from "@sentry/react";
import fetcher from "./fetcher";

// Fetch the patient's subscription plans, filtered by goal & sorted by most recent observed_date.
export default function useSubscriptionPlans(page = 1, size = 100) {
  const { data: subscriptionPlans, error } = useSWR(
    ["SubscriptionPlan", "subscriptionPlansGet"],
    fetcher
  );

  if (error) {
    Sentry.captureException(error);
  }

  const sortedSubscriptionPlans = subscriptionPlans?.sort((a, b) => a.unit_amount - b.unit_amount);

  return {
    subscriptionPlans: sortedSubscriptionPlans,
    isLoading: !error && !subscriptionPlans,
    isError: error,
  };
}
