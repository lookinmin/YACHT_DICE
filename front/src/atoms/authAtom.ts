import { atom } from 'recoil';

const token = localStorage.getItem('token');
const isLogin = !!token;

export const authState = atom<{ isLogin: boolean }>({
  key: 'authState',
  default: { isLogin },
});
