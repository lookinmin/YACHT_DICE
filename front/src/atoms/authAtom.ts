import { atom } from 'recoil';

export const authState = atom<{ isLogin: boolean }>({
  key: 'authState',
  default: { isLogin: false },
});
