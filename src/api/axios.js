import axios from "axios";

const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
  timeout: 5000, // optional timeout
});

// Global interceptor for logging
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.message === "Network Error" || error.code === "ERR_NETWORK") {
      console.warn("⚠️ Network problem detected or API blocked.");
    }
    return Promise.reject(error);
  }
);

export default api;
