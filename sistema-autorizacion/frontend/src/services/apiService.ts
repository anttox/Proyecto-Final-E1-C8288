import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL || 'http://localhost:3000/api', // URL dinámica
});

// Interceptor para agregar el token JWT
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // Token JWT almacenado
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Endpoints
export const registerUser = (data: any) => API.post('/auth/register', data);
export const loginUser = (data: any) => API.post('/auth/login', data);
export const fetchResources = () => API.get('/resources');
export const fetchUserProfile = () => API.get('/users/profile');

export default API;
