import { Routes, Route, Navigate } from "react-router-dom";
import Subscriptions from "pages/Subscriptions";
import { useCurrentPatient, useActiveSubscription } from "./fetchDataHooks";
import { Skeleton } from "@mui/material";
import { Elements } from "@stripe/react-stripe-js";

function SubscriptionRouteManager(props) {
  const {
    currentPatient,
    isLoading: patientLoading,
    isError: patientError,
  } = useCurrentPatient();
  const {
    data: currentActiveSubscription,
    isLoading: subscriptionLoading,
    isError: subscriptionError,
  } = useActiveSubscription(currentPatient?.id);

  if (patientError || subscriptionError) {
    return <div>Woops something went wrong...</div>;
  }

  if (patientLoading || subscriptionLoading) {
    return <Skeleton variant="rectangular" height="100%" animation="wave" />;
  }

  if (
    process.env.REACT_APP_ENABLE_REQUIRE_SUBSCRIPTION === "true" &&
    props.stripePromise
  ) {
    return (
      <Elements stripe={props.stripePromise}>
        {currentActiveSubscription ? (
          <Routes>
            {props.children}
            <Route path="/subscriptions" element={<Subscriptions />} />
          </Routes>
        ) : (
          <Routes>
            <Route path="/subscriptions" element={<Subscriptions />} />
            <Route path="*" element={<Navigate to="/subscriptions" />} />
          </Routes>
        )}
      </Elements>
    );
  } else {
    return <Routes>{props.children}</Routes>;
  }
}

export default SubscriptionRouteManager;
