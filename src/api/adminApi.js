import axios from "axios";

const adminApi = axios.create({
  baseURL: "https://crm-backend-wheat-zeta.vercel.app/api/",
  // baseURL: "http://localhost:4000/api/",
});

adminApi.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user?.token) config.headers.Authorization = `Bearer ${user.token}`;
  
  
  return config;
});

export default adminApi;
