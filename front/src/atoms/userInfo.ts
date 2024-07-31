import { atom } from 'recoil';

interface UserInfo {
  id: string | null;
  friends: string[];
}

export const userState = atom<UserInfo>({
  key: 'userInfo',
  default: { id: null, friends: [] },
});
