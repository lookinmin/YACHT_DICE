import React from 'react';
import styled from 'styled-components';
import TextField from '@mui/material/TextField';
import { tfTheme } from '../styles/theme';
import { ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

const LoginDiv = styled.div`
  display: flex;
  flex-flow: column nowrap;
  gap: 20px;
  width: 80%;
  align-items: center;

  & > #txtBtn {
    width: 98%;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    & > p {
      margin: 0 !important;
      font-weight: 600;
      cursor: pointer;
      font-size: 1.1em;

      &:hover {
        color: #90c9ff;
      }
    }
  }
`;

interface LoginProps {
  setIsSignUp: React.Dispatch<React.SetStateAction<boolean>>;
}

// Dispatch : 값을 받아 값을 통해 상태를 변경하는 함수
// React.SetStateAction : 상태를 새로 설정하거나 기존 상태를 통해 새로운 상태를 계산

export const Login: React.FC<LoginProps> = ({ setIsSignUp }) => {
  return (
    <LoginDiv>
      <TextField id="outlined-basic" label="ID" variant="outlined" fullWidth />
      <TextField
        id="outlined-basic"
        label="PASSWORD"
        variant="outlined"
        fullWidth
      />

      <div id="txtBtn">
        <p onClick={() => setIsSignUp(true)}>SIGN UP</p>
        <p>LOGIN</p>
      </div>
    </LoginDiv>
  );
};
