// src/App.tsx
import React from 'react';
import { useRecoilState } from 'recoil';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';
import { themeAtom } from './atoms/themeAtom';
import { lightTheme, darkTheme } from './styles/theme';
import ThemeBtn from './components/ThemeBtn';

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${(props) => props.theme.background};
    color: ${(props) => props.theme.color};
    transition: all 0.25s linear;
  }
`;

const App: React.FC = () => {
  const [theme, setTheme] = useRecoilState(themeAtom);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <GlobalStyle />
      <div className="App">
        <ThemeBtn isDark={theme === 'dark'} toggleTheme={toggleTheme} theme={theme} />
        <h1>Hello, World!</h1>
      </div>
    </ThemeProvider>
  );
};

export default App;
