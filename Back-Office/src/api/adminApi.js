import axios from 'axios';
import Cookies from 'js-cookie';

const adminApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  }
});

adminApi.interceptors.request.use((config) => {
  const jwtToken = Cookies.get('token'); // Fetch token from cookies or local storage
  if (jwtToken) {
    config.headers['Authorization'] = `Bearer ${jwtToken}`; // Set token in headers
  }
  return config; // Return modified config
}, (error) => {
  return Promise.reject(error); // Handle request error
});

export default adminApi;
