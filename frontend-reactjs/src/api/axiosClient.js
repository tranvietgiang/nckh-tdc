import axios from "axios";
import { getToken, clearAuth } from "../utils/storage";

// Hàm tạo axios client
const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true, // 🔥 QUAN TRỌNG NHẤT
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Request interceptor
axiosClient.interceptors.request.use((config) => {
  const token = getToken();

  if (token) {
    // Nếu token có → dùng Bearer token (API token)
    config.headers.Authorization = `Bearer ${token}`;
    config.withCredentials = false; // không dùng cookie
  } else {
    // Nếu không token → SPA cookie/session
    config.withCredentials = true;
  }

  return config;
});

// Response interceptor
axiosClient.interceptors.response.use(
  (res) => res.data,
  (error) => {
    if (error.response?.status === 401) {
      clearAuth();
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);

export default axiosClient;
