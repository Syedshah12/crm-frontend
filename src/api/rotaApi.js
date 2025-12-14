import axios from "axios";

const rotaApi = axios.create({
  // baseURL: "http://localhost:4000/api/rotas",
  baseURL: "https://crm-backend-wheat-zeta.vercel.app/api/rotas",
});

rotaApi.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user?.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;
});

export default rotaApi;
