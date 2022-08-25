import { useQuery } from "@tanstack/react-query";
import { Client } from "@twilio/conversations";

import { ConversationClientType, useTwilioToken } from "./useTwilioToken.hook";
import { ReactQueryKeys } from "../../../constants/keys";

export const useTwilioClient = (type: ConversationClientType) => {
  const { data, refetch, isError: isErrorTwilioToken } = useTwilioToken(type);

  const fetchClient = async () => {
    const token = data.body.twilio_auth_token;

    const client = new Client(token);

    client.on("tokenAboutToExpire", () => {
      refetch();
    });
    client.on("tokenExpired", () => {
      refetch();
    });

    return client;
  };

  const query = useQuery([ReactQueryKeys.TWILIO_CLIENT, type], fetchClient, {
    staleTime: Infinity,
    enabled: !!data?.body?.twilio_auth_token,
  });

  return { ...query, isError: query.isError || isErrorTwilioToken };
};
