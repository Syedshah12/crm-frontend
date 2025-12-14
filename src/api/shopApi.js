import axios from "axios";

const shopApi = axios.create({
  baseURL: "https://crm-backend-wheat-zeta.vercel.app/api/shops",
  // baseURL: "http://localhost:4000/api/shops",
});

shopApi.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user?.token) config.headers.Authorization = `Bearer ${user.token}`;
  return config;
});

export default shopApi;
