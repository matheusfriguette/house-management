import axios from "axios";

const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

export const loginApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
});

loginApi.interceptors.response.use(
  (response) => response.data,
  (error) => {
    throw error.response?.data || error.message;
  },
);

api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (typeof window !== "undefined") {
      // const status = error.response?.status;

      // if (status === 401 || status === 403) {
      //   localStorage.removeItem("token");
      //   window.location.href = "/login";
      //   return;
      // }
    }

    throw error.response?.data || error.message;
  },
);

export default api;
