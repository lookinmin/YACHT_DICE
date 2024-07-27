import React from 'react';
import styled from 'styled-components';
import TextField from '@mui/material/TextField';
import { tfTheme } from '../styles/theme';
import { ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { LoginProps } from '../types/login';

const SignUpDiv = styled.div`
  display: flex;
  flex-flow: column nowrap;
  gap: 20px;
  width: 80%;
  align-items: center;

  & > p:nth-child(1) {
    margin: 0 !important;
    font-size: 1.5em;
    font-weight: 600;
    padding-bottom: 15px;
    color: #90c9ff;
  }

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

export const SignUp: React.FC<LoginProps> = ({ setIsSignUp }) => {
  return (
    <SignUpDiv>
      <p>SIGN UP</p>
      <TextField id="outlined-basic" label="ID" variant="outlined" fullWidth />
      <TextField
        id="outlined-basic"
        label="E-mail"
        variant="outlined"
        fullWidth
      />
      <TextField
        id="outlined-basic"
        label="PASSWORD"
        variant="outlined"
        type="password"
        fullWidth
      />
      <TextField
        id="outlined-basic"
        label="PASSWORD Confirmed"
        variant="outlined"
        type="password"
        fullWidth
      />
      <div id="txtBtn">
        <p onClick={() => setIsSignUp(false)}>BACK</p>
        <p>ENTER</p>
      </div>
    </SignUpDiv>
  );
};
