import * as React from "react";
// packages
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { SWRConfig } from "swr";
// pages
import AppAuthenticator from "./AppAuthenticator";
import Home from "./pages/Home";
import Chat from "./pages/Chat";
import CurrentPlan from "./pages/CurrentPlan";
import Goal from "./pages/Goal";
import Target from "./pages/Target";
import Profile from "./pages/Profile";
import Observation from "./pages/Observation";
import Appointments from "./pages/Appointments";
import Survey from "./pages/Survey";
// components
import { MobileContainer } from "./components";
import { WithNavigation } from "./layouts/WithNavigation";
import { WithoutNavigation } from "./layouts/WithoutNavigation";

// styles
import theme from "./styles/theme";

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
              <BrowserRouter>
                {/* Global reset */}
                <CssBaseline />
                {/* Page Content */}
                <Routes>
                  <Route element={<WithNavigation />}>
                    <Route exact path="/" element={<Home />} />
                    <Route exact path="/home" element={<Home />} />
                    <Route exact path="/chat" element={<Chat />} />
                    <Route
                      exact
                      path="/appointments"
                      element={<Appointments />}
                    />
                    <Route
                      exact
                      path="/profile"
                      element={<Profile signOut={signOut} />}
                    />
                  </Route>

                  <Route element={<WithoutNavigation />}>
                    <Route
                      exact
                      path="/current_plan"
                      element={<CurrentPlan />}
                    />
                    <Route exact path="/goal" element={<Goal />} />
                    <Route exact path="/log" element={<Observation />} />
                    <Route exact path="/target" element={<Target />} />
                    <Route exact path="/survey" element={<Survey />} />
                  </Route>
                </Routes>
              </BrowserRouter>
            </SWRConfig>
          )}
        </AppAuthenticator>
      </MobileContainer>
    </ThemeProvider>
  );
}
