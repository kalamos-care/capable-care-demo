import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";

// Function to configure Sentry for error reporting.
// NOTE: This sample app uses Sentry to provide error reporting. If you
//       have forked this repo you will need to setup Sentry for your own
//       project, or use a different error reporting service.
//       Docs: https://docs.sentry.io/
export default function configureErrorReporting() {
  try {
    Sentry.init({
      dsn: process.env.REACT_APP_SENTRY_DSN,
      environment: process.env.REACT_APP_SENTRY_ENVIRONMENT,
      integrations: [new BrowserTracing()],
      // Set tracesSampleRate to 1.0 to capture 100%
      // of transactions for performance monitoring.
      // We recommend adjusting this value in production
      tracesSampleRate: 1.0,
    });
  } catch (error) {
    console.error(error);
  }
}
