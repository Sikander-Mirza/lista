import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import store from "./Store/store.js";
import { HelmetProvider } from "react-helmet-async";
import { ErrorProvider } from "./CustomHook/ErrorContext/ErrorContext.jsx";
import App from "./App.jsx";

// ❌ REMOVE the health check — it's blocking render!

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