import * as React from "react";
// packages
import { BrowserRouter, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { SWRConfig } from "swr";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

// providers
import AppAuthenticator from "./AppAuthenticator";

// pages
import Appointments from "./pages/Appointments";
import CarePlans from "./pages/CarePlans";
import Conversation from "features/conversations/pages/Conversation";
import Conversations from "features/conversations/pages/Conversations";
import Goal from "./pages/Goal";
import Task from "features/tasks/pages/Task";
import Home from "./pages/Home";
import Observation from "./pages/Observation";
import Profile from "./pages/Profile";
import Survey from "./pages/Survey";
import Target from "./pages/Target";
// components
import { MobileContainer } from "./components";
import { WithNavigation } from "./layouts/WithNavigation";
import { WithoutNavigation } from "./layouts/WithoutNavigation";

// styles
import theme from "./styles/theme";

// feature gating
import SubscriptionRouteManager from "./SubscriptionRouteManager";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY, {
  stripeAccount: process.env.REACT_APP_STRIPE_ACCOUNT_ID,
});

export const queryClient = new QueryClient();

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <MobileContainer>
        <AppAuthenticator>
          {({ signOut }) => (
            // We are providing fresh SWR cache for the app every time we
            // sign in. This is to stop flashing stale content when signing
            // in as another user.
            <SWRConfig value={{ provider: () => new Map() }}>
              <QueryClientProvider client={queryClient}>
                <BrowserRouter>
                  {/* Global reset */}
                  <CssBaseline />
                  {/* Page Content */}
                  <Elements stripe={stripePromise}>
                    <SubscriptionRouteManager>
                      <Route element={<WithNavigation />}>
                        <Route exact path="/" element={<Home />} />
                        <Route exact path="/home" element={<Home />} />
                        <Route
                          exact
                          path="/home/:carePlanId"
                          element={<Home />}
                        />
                        <Route exact path="/chat" element={<Conversations />} />
                        <Route
                          exact
                          path="/chat/:conversationId"
                          element={<Conversation />}
                        />
                        <Route
                          exact
                          path="/appointments"
                          element={<Appointments />}
                        />
                      </Route>

                      <Route element={<WithNavigation withCopyRight={true} />}>
                        <Route
                          exact
                          path="/profile"
                          element={<Profile signOut={signOut} />}
                        />
                      </Route>

                      <Route element={<WithoutNavigation />}>
                        <Route
                          exact
                          path="/care_plans"
                          element={<CarePlans />}
                        />
                        <Route exact path="/goal" element={<Goal />} />
                        <Route exact path="/task/:taskId" element={<Task />} />
                        <Route exact path="/log" element={<Observation />} />
                        <Route exact path="/target" element={<Target />} />
                        <Route
                          exact
                          path="/survey/:surveyId"
                          element={<Survey />}
                        />
                      </Route>
                    </SubscriptionRouteManager>
                  </Elements>
                </BrowserRouter>
                <ReactQueryDevtools initialIsOpen={false} />
              </QueryClientProvider>
            </SWRConfig>
          )}
        </AppAuthenticator>
      </MobileContainer>
    </ThemeProvider>
  );
}
