import React from 'react';
import styled from 'styled-components';
import TextField from '@mui/material/TextField';
import { tfTheme } from '../styles/theme';
import { ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

const SuPg = styled.div`
  display: flex;
  flex-flow: column nowrap;
  margin: 5vh 0;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

export const SignUp: React.FC = () => {
  return <SuPg>SignUp</SuPg>;
};
