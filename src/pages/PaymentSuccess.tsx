import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCurrentPatient, useActiveSubscription } from "../fetchDataHooks";
import { Box, Skeleton, Typography } from "@mui/material";
import { Button, Heading } from "@aws-amplify/ui-react";
import {Subscription} from "models/subscriptions/Subscription.types";
import { formatDateString } from "utils/dates";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const { currentPatient } = useCurrentPatient();
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const { isLoading, data: subscriptions } = useActiveSubscription(currentPatient?.id);
  const { subscriptionId } = useParams<{
    subscriptionId?: string;
  }>();

  useEffect(() => {
    setSubscription(subscriptions.find((sub) => sub.stripe_subscription_id === subscriptionId))
  }, [subscriptionId, subscriptions])

  if (isLoading) {
    return <Skeleton variant="rectangular" animation="wave" height={280} />;
  }

  return subscription ? (
    <Box sx={{ textAlign: "center", padding: "5rem 1rem" }}>
      {subscription.trial_end ? (
        <>
          <Heading level={5}>Trial Started</Heading>
          <Typography variant="h6" sx={{ padding: "1rem 0 2rem" }}>
            Your free trial has begun until {formatDateString(subscription.trial_end * 1000)}.
            You may now continue to your account!
          </Typography>
        </>
      ) : (
        <>
          <Heading level={5}>Payment Successful</Heading>
          <Typography variant="h6" sx={{ padding: "1rem 0 2rem" }}>
            Your payment has been processed. You may now continue to your account!
          </Typography>
        </>
      )}
      <Button width="100%" variation="primary" onClick={() => navigate("/home")}>
        Continue
      </Button>
    </Box>
  ) : null
};

export default PaymentSuccess;