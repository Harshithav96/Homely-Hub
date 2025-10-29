import axios from "axios";
import qs from "qs";

// Base URL for local + production
const BASE_URL = import.meta.env.VITE_API_BASE_URL|| "http://localhost:8080";

export const axiosInstance = axios.create({
  baseURL: `${BASE_URL}/api`, // ✅ keep /api because your API calls start with /v1/rent
  withCredentials: true,
  paramsSerializer: (params) => qs.stringify(params, { arrayFormat: "repeat" }),
});
