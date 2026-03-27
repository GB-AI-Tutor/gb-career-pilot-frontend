import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

// Initialize Sentry (optional - only if DSN is provided in environment)
const SENTRY_DSN = import.meta.env.VITE_SENTRY_DSN;
if (SENTRY_DSN) {
  // Dynamic import to keep bundle small
  import("@sentry/react")
    .then((Sentry) => {
      Sentry.init({
        dsn: SENTRY_DSN,
        environment: import.meta.env.MODE,
        integrations: [
          Sentry.browserTracingIntegration(),
          Sentry.replayIntegration(),
        ],
        tracesSampleRate: import.meta.env.MODE === "production" ? 0.1 : 1.0,
        replaysSessionSampleRate: 0.1,
        replaysOnErrorSampleRate: 1.0,
      });
      console.log("✅ Sentry error monitoring active");
    })
    .catch((err) => {
      console.warn("⚠️ Sentry not available:", err.message);
    });
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
