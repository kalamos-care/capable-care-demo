import { useQuery } from "@tanstack/react-query";
import { ReactQueryKeys } from "constants/keys";
import api from "../capableApi";

const findCurrentActiveSubscription = (subscriptions) => {
  return subscriptions.find((subscription) => {
    return ["active", "trialing"].includes(subscription.status);
  }) ?? null;
};

const fetchPatientActiveSubscription = async (patientId) => {
  const subscriptionResponse = await api.client.Subscription.list({
    patientId: patientId
  })

  if (subscriptionResponse.error) {
    throw new Error("Failed to fetch patient's capable subscriptions")
  }

  return findCurrentActiveSubscription(subscriptionResponse.body)
}

// Fetch the patient's active subscription
export default function useActiveSubscription(patientId) {
  return useQuery(
    [ReactQueryKeys.PATIENT_ACTIVE_SUBSCRIPTION, patientId],
    () => fetchPatientActiveSubscription(patientId),
    { enabled: !!patientId }
  )
}
