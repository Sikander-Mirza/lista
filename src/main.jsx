import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

const root = createRoot(document.getElementById("root"));

// Parallel dynamic imports — reduces initial JS parse time
Promise.all([
  import("./App.jsx"),
  import("react-redux"),
  import("./Store/store.js"),
  import("react-helmet-async"),
  import("./CustomHook/ErrorContext/ErrorContext.jsx"),
]).then(([
  { default: App },
  { Provider },
  { default: store },
  { HelmetProvider },
  { ErrorProvider },
]) => {
  root.render(
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
});