import axios from "axios";

const punchingApi = axios.create({
  baseURL: "https://crm-backend-wheat-zeta.vercel.app/api/punchings",
  // baseURL: "http://localhost:4000/api/punchings",
});

punchingApi.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user?.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;
});

export default punchingApi;
