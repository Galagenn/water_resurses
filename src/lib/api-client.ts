import axios from "axios";

export const API_TIMEOUT = 25_000;

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? "https://api.agro-intelligence.local",
  timeout: API_TIMEOUT,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  // Подготовка hook для внедрения токена, как только появится backend
  const token = process.env.NEXT_PUBLIC_API_TOKEN;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;

