// src/api/axiosClient.js
import axios from "axios";
import { getToken, clearAuth } from "../utils/storage";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true, // nếu dùng Laravel Sanctum
});

// Gắn token tự động
axiosClient.interceptors.request.use((config) => {
  const token = getToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Bắt lỗi 401 → logout
axiosClient.interceptors.response.use(
  (res) => res.data,
  (error) => {
    if (error.response?.status === 401) {
      clearAuth();
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
