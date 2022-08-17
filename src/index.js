import React from "react";
import ReactDOM from "react-dom";
import { asyncWithLDProvider } from 'launchdarkly-react-client-sdk';

import App from "./App";
import reportWebVitals from "./reportWebVitals";
import configureAuthenticator from "./config/auth";
import configureErrorReporting from "./config/errorReporting";
import "./styles/index.css";


(async () => {
  // configure Sentry
  configureErrorReporting();
  // configure Amplify Authenticator theme and i18n
  configureAuthenticator();

  const LDProvider = await asyncWithLDProvider({
    clientSideID: process.env.REACT_APP_LD_CLIENT_ID,
  });

  ReactDOM.render(
    <React.StrictMode>
      <LDProvider>
        <App />
      </LDProvider>
    </React.StrictMode>,
    document.getElementById("root")
  );

  // If you want to start measuring performance in your app, pass a function
  // to log results (for example: reportWebVitals(console.log))
  // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
  reportWebVitals();
})();
