import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import configureAuth from "./config/auth";
import configureErrorReporting from "./config/errorReporting";
import "./styles/index.css";
// configure Sentry
configureErrorReporting();
// configure Amplify with Cognito keys
configureAuth();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
