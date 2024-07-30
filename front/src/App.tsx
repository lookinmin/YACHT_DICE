// src/App.tsx
import React from 'react';
import { useRecoilState } from 'recoil';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';
import { themeAtom } from './atoms/themeAtom';
import { lightTheme, darkTheme } from './styles/theme';
import ThemeBtn from './components/ThemeBtn';
import { Route, Routes } from 'react-router-dom';
import { StartPage } from './pages/StartPage';
import { Footer } from './components/Footer';
import { Main } from './pages/Main';
import { PrevLogin } from './components/PrevLogin';

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${(props) => props.theme.background};
    color: ${(props) => props.theme.color};
    /* transition: all 0.25s linear; */
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
        <ThemeBtn
          isDark={theme === 'dark'}
          toggleTheme={toggleTheme}
          theme={theme}
        />
        <Routes>
          <Route path="/login" element={<StartPage />} />
          <Route path="/" element={<PrevLogin />}>
            <Route path="/" element={<Main />} />
          </Route>
        </Routes>
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default App;
