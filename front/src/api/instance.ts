import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: '',
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
