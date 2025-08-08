import axios from "axios";

import { env } from "@/env";

export const api = axios.create({
  baseURL: env.VITE_API_URL,
  withCredentials: true, // Cookies from frontend send to backend to manage authentication
});

// Before every requisition, delay
if (env.VITE_ENABLE_API_DELAY) {
  api.interceptors.response.use(async (config) => {
    await new Promise((resolve) => setTimeout(resolve, randomDelay()));
    return config;
  });
}
// between 800 and 2800
function randomDelay(): number {
  return Math.floor(Math.random() * 2000) + 800;
}
