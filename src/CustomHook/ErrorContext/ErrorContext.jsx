// src/context/ErrorContext.jsx
import { createContext, useContext, useState } from "react";
import ErrorModal from "../../Components/Modals/ErrorModal";

const ErrorContext = createContext();

export function ErrorProvider({ children }) {
  const [error, setError] = useState(null);

  const showError = (msg) => setError(msg);
  const hideError = () => setError(null);

  return (
    <ErrorContext.Provider value={{ showError }}>
      {children}
      <ErrorModal isOpen={!!error} message={error} onClose={hideError} />
    </ErrorContext.Provider>
  );
}

export function useError() {
  return useContext(ErrorContext);
}
