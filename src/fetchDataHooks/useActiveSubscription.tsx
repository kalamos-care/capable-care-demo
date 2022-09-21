import { useQuery } from "@tanstack/react-query";
import { ReactQueryKeys } from "constants/keys";
import api from "../capableApi";
import { Subscription } from "models/subscriptions/Subscription.types";

const findCurrentActiveSubscriptions = (subscriptions: Subscription[]) => {
  return (
    subscriptions?.filter((subscription) => {
      return ["active", "trialing"].includes(subscription.status);
    }) ?? []
  );
};

const fetchPatientActiveSubscriptions = async (patientId: string | null) => {
  const subscriptionResponse = await api.client.Subscription.list({
    patientId: patientId,
  });

  if (subscriptionResponse.error) {
    throw new Error("Failed to fetch patient's capable subscriptions");
  }

  return findCurrentActiveSubscriptions(subscriptionResponse.body);
};

// Fetch the patient's active subscription
export default function useActiveSubscription(patientId: string | null) {
  return useQuery(
    [ReactQueryKeys.PATIENT_ACTIVE_SUBSCRIPTION, patientId],
    () => fetchPatientActiveSubscriptions(patientId),
    { enabled: !!patientId }
  );
}
