import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import store from "./Store/store.js";
import { HelmetProvider } from "react-helmet-async";
import { ErrorProvider } from "./CustomHook/ErrorContext/ErrorContext.jsx";
import App from "./App.jsx";

const rootElement = document.getElementById("root");

// ✅ ALWAYS use createRoot
// react-snap still pre-renders HTML for Google (SEO works)
// We avoid hydration mismatch errors completely
// Trade-off: tiny re-render flash on load (invisible to users)
createRoot(rootElement).render(
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