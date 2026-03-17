import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import store from "./Store/store.js";
import { HelmetProvider } from "react-helmet-async";
import { ErrorProvider } from "./CustomHook/ErrorContext/ErrorContext.jsx";
import App from "./App.jsx";

// ✅ Warm up API connection immediately (non-blocking)
const API_URL = import.meta.env.VITE_API_KEY;
if (API_URL) {
  fetch(`${API_URL}/health`, { 
    method: 'HEAD',
    mode: 'cors',
    credentials: 'omit',
  }).catch(() => {
    // Silent fail — just warming up connection
  });
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <ErrorProvider>
        <HelmetProvider>
          <App />
        </HelmetProvider>
      </ErrorProvider>
    </Provider>
  </StrictMode>
);