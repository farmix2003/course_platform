import axios from "axios";

const httpClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? "http://localhost:8080/api",
    headers: {
      "Content-Type": "application/json",
    },
});

httpClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

httpClient.interceptors.response.use(
  (response) => response,
  (error: unknown) => {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      const url = error.config?.url ?? "";
      const isAuthenticationRequest = url.includes("/auth/login") || url.includes("/auth/register");
      if (!isAuthenticationRequest) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");
        if (window.location.pathname !== "/login") window.location.assign("/login");
      }
    }
    return Promise.reject(error);
  },
);

export default httpClient;
