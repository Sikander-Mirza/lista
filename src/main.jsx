import "./index.css";
import App from "./App.jsx";
import { StrictMode } from "react";
import store from "./Store/store.js";
import { Provider } from "react-redux";
import { HelmetProvider } from 'react-helmet-async';
import { createRoot } from "react-dom/client";
import { ErrorProvider } from "./CustomHook/ErrorContext/ErrorContext.jsx";

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