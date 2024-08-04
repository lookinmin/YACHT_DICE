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
  typography: {
    fontFamily: 'HancomSans-Light, Arial', // 폴백으로 Arial 지정
  },
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

export const tfTheme2 = createTheme({
  typography: {
    fontFamily: 'HancomSans-Light, Arial', // 폴백으로 Arial 지정
  },

  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#86aa9c', // 어두운 녹색 테두리 색상
            borderWidth: '2px',
            borderRadius: '10px',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#86aa9c', // 호버 시에도 같은 테두리 색상 유지
            borderWidth: '2px',
            borderRadius: '10px',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#538ee7', // 포커스 시의 테두리 색상
            borderWidth: '2px',
            borderRadius: '10px',
          },
        },
        input: {
          color: '#ffffff', // 흰색 글씨
          fontFamily: 'HancomSans-Light, Arial', // 폰트 적용
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: '#ffffff', // 흰색 레이블
          fontFamily: 'HancomSans-Light, Arial', // 폰트 적용
        },
      },
    },
  },
});
