import axios from 'axios';
import { useSetRecoilState } from 'recoil';
import { authState } from '../atoms/authAtom';
import { userState } from '../atoms/userInfo';

export const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// 모든 req의 헤더에 토큰 포함
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

// 토큰 만료 -> 로그아웃처리

axiosInstance.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response && error.response.status === 401) {
      // 만료
      localStorage.clear();
      const setAuthState = useSetRecoilState(authState);
      const setUserState = useSetRecoilState(userState);
      setAuthState({ isLogin: false });
      setUserState({ id: null });

      window.location.href = '/login';
    }
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

export const getFriends = async (id: string) => {
  return axiosInstance.get(`/friends/${id}`);
};
