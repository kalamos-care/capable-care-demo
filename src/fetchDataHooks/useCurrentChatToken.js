import useSWR from "swr";
import * as Sentry from "@sentry/react";
import fetcher from "./fetcher";

// Fetch the patient's current conversation.
export default function useCurrentChatToken() {
  const { data, error } = useSWR(["Conversation", "chatToken"], fetcher);

  if (error) Sentry.captureException(error);

  return {
    currentChatToken: data?.twilio_auth_token,
    isLoading: !error && !data,
    isError: error,
  };
}
