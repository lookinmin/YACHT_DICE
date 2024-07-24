import { DefaultTheme } from 'styled-components';
import { createTheme } from '@mui/material';

export const lightTheme: DefaultTheme = {
  background: '#ffffff',
  color: '#000000',
};

export const darkTheme: DefaultTheme = {
  background: '#262626',
  color: '#f7f7f7',
};

export const tfTheme = createTheme({
  palette: {
    primary: {
      main: '#87CEEB', // 기본 파란색
    },
    secondary: {
      main: '#00ff00', // 연두색
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '10px', // 테두리 반경 설정
            backgroundColor: '#87CEEB', // 기본 파란색 배경
            '& fieldset': {
              borderColor: '#87CEEB', // 기본 파란색 테두리
            },
            '&:hover fieldset': {
              borderColor: '#87CEEB', // 기본 파란색 테두리
            },
            '&.Mui-focused': {
              backgroundColor: '#00ff00', // 포커스 시 연두색 배경
              '& fieldset': {
                borderColor: '#00ff00', // 포커스 시 연두색 테두리
              },
            },
          },
        },
      },
    },
  },
});
