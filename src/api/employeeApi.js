import axios from "axios";

const employeeApi = axios.create({
  // baseURL: "http://localhost:4000/api/employees",
  baseURL: "https://crm-backend-wheat-zeta.vercel.app/api/employees",
});

employeeApi.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user?.token) config.headers.Authorization = `Bearer ${user.token}`;
  return config;
});

export default employeeApi;
