import { atom } from 'recoil';

// 테마 초기값 로컬 스토리지에서 가져오기
const getInitialTheme = () => {
  const savedTheme = localStorage.getItem('theme');
  // 로컬 스토리지에 key = 'theme' 값 가져옴
  return savedTheme ? (savedTheme as 'light' | 'dark') : 'light';
  // default : light
};

export const themeAtom = atom<'light' | 'dark'>({
  key: 'themeAtom', // atom 고유 ID
  default: getInitialTheme(), // 초기값, 스토리지에서 가져옴
  effects : [ // atom 상태 변화에 따라 사이드 이펙트 설정 함수
    ({ onSet }) => {
      onSet((newTheme) => { // onSet이라는 콜백함수 사용
        localStorage.setItem('theme', newTheme); // theme가 변경될 때마다 로컬 스토리지에 저장
      })
    }
  ]
});