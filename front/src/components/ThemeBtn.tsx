// src/components/ThemeBtn.tsx
import React from 'react';
import styled from 'styled-components';
import { CiLight, CiDark } from 'react-icons/ci';

const Button = styled.button<{ isDark: boolean }>`
  border-radius: 50%;
  border: ${(props) => (props.isDark ? '1px solid white' : '1px solid black')};
  padding: 5px;
  cursor: pointer;
  position: fixed;
  top: 30px;
  right: 30px;
  background: none;
  display: flex;
  align-items: center;
  justify-content: center;
`;

interface ThemeBtnProps {
  isDark: boolean;
  toggleTheme: () => void;
  theme: 'light' | 'dark';
}

const ThemeBtn: React.FC<ThemeBtnProps> = ({ isDark, toggleTheme, theme }) => (
  <Button isDark={isDark} onClick={toggleTheme}>
    {theme === 'light' ? <CiDark size={24} /> : <CiLight size={24} color="white" />}
  </Button>
);

export default ThemeBtn;
