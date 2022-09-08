import { useQuery } from "@tanstack/react-query";
import { ReactQueryKeys } from "constants/keys";
import api from "../capableApi";

const findPaymentMethodFromSetupIntent = (setupIntents) => {
  return (
    setupIntents.find((intent) => {
      return (
        intent.payment_method &&
        intent.status === "succeeded" &&
        intent.payment_method.startsWith("pm_")
      );
    })?.payment_method ?? null
  );
};

const fetchPaymentMethodFromSetupIntents = async (patientId) => {
  const setupIntentResponse = await api.client.SetupIntent.list({
    patientId: patientId,
  });

  if (setupIntentResponse.error) {
    throw new Error("Failed to fetch patient's capable setup intents");
  }

  return findPaymentMethodFromSetupIntent(setupIntentResponse.body);
};

// Fetch the patient's setup intents and return payment method id if
// one is available.
export default function useFindExistingPaymentMethod(patientId) {
  return useQuery(
    [ReactQueryKeys.PATIENT_PAYMENT_METHOD, patientId],
    () => fetchPaymentMethodFromSetupIntents(patientId),
    { enabled: !!patientId }
  );
}
