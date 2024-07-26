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
      main: '#ADD8E6 ', // 기본 파란색
    },
    secondary: {
      main: '#87CEEB  ',
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '10px', // 테두리 반경 설정
            backgroundColor: '#ADD8E6', // 기본 파란색 배경
            '& fieldset': {
              borderColor: '#ADD8E6', // 기본 파란색 테두리
            },
            '&:hover fieldset': {
              borderColor: '#ADD8E6', // 기본 파란색 테두리
            },
            '&.Mui-focused': {
              backgroundColor: '#87CEEB  ', // 포커스 시 연두색 배경
              '& fieldset': {
                borderColor: '#87CEEB  ', // 포커스 시 연두색 테두리
              },
            },
          },
        },
      },
    },
  },
});
