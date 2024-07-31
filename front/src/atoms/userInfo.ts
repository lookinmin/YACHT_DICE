import { atom } from 'recoil';

const userId = localStorage.getItem('userId');

interface UserInfo {
  id: string | null;
}

export const userState = atom<UserInfo>({
  key: 'userInfo',
  default: { id: userId },
});
