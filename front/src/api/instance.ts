import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json',
  },
});

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
