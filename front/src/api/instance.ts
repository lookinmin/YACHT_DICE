import axios from 'axios';
import { useSetRecoilState } from 'recoil';
import { authState } from '../atoms/authAtom';

export const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export const signup = async (newUser: {
  id: string;
  email: string;
  password: string;
}) => {
  return axiosInstance.post('/signup', newUser);
};

export const checkId = async (id: string) => {
  return axiosInstance.get(`/check-id/${id}`);
};

export const login = async (user: { id: string; password: string }) => {
  return axiosInstance.post('/login', user);
};
