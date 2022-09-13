import { Routes, Route, Navigate } from "react-router-dom";
import Subscriptions from "pages/Subscriptions";
import { useCurrentPatient, useActiveSubscription } from "./fetchDataHooks";
import { Skeleton } from "@mui/material";
import { Elements } from "@stripe/react-stripe-js";
import { WithNavigation } from "./layouts/WithNavigation";

function SubscriptionRouteManager(props) {
  const { currentPatient, isLoading: patientLoading, isError: patientError } = useCurrentPatient();
  const {
    data: currentActiveSubscription,
    isLoading: subscriptionLoading,
    isError: subscriptionError,
  } = useActiveSubscription(currentPatient?.id);
  const { signOut, stripePromise } = props;

  if (patientError || subscriptionError) {
    return <div>Woops something went wrong...</div>;
  }

  if (patientLoading || subscriptionLoading) {
    return <Skeleton variant="rectangular" height="100%" animation="wave" />;
  }

  if (process.env.REACT_APP_ENABLE_REQUIRE_SUBSCRIPTION === "true" && props.stripePromise) {
    return (
      <Elements stripe={stripePromise}>
        {currentActiveSubscription ? (
          <Routes>
            {props.children}
            <Route element={<WithNavigation />}>
              <Route path="/subscriptions" element={<Subscriptions signOut={signOut} />} />
            </Route>
          </Routes>
        ) : (
          <Routes>
            <Route path="/subscriptions" element={<Subscriptions signOut={signOut} />} />
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
