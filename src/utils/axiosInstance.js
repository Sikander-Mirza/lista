import axios from "axios";
import { useError } from "../CustomHook/ErrorContext/ErrorContext";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_KEY,
});

export const useAxiosWithErrorHandler = () => {
  const { showError } = useError();

  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response) {
      } else if (error.request) {
      } else {
      }
      return Promise.reject(error);
    }
  );

  return api;
};
