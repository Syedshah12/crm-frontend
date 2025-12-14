import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://crm-backend-wheat-zeta.vercel.app/api', // replace with your backend URL
});

instance.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user?.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;
});

export default instance;
