import axios from "axios";

const payoutApi = axios.create({
  // baseURL: "http://localhost:4000/api/payouts",
  baseURL: "https://crm-backend-wheat-zeta.vercel.app/api/payouts",
});

payoutApi.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user?.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;
});

export default payoutApi;
