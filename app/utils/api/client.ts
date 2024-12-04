import axios from "axios";
import { createClient } from "../supabase/client";

// const API_BASE_URL = "http://192.168.1.71:8000/api"; // AMD SERVER
const API_BASE_URL = "http://localhost:8000/api";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
//   withCredentials: true,
});

// Axios interceptors for global request/response handling
apiClient.interceptors.request.use(async (config) => {
  const supabase = createClient();
  const { data } = await supabase.auth.getSession();
  const apiKey = data?.session?.access_token;

  console.log(apiKey);
  
  if (apiKey) {
    config.headers["api-key"] = `${apiKey}`;
  }

  return config;
});

export default apiClient;
