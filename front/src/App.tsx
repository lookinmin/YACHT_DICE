// src/App.tsx
import React, { useEffect } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';
import { themeAtom } from './atoms/themeAtom';
import { authState } from './atoms/authAtom';
import { lightTheme, darkTheme } from './styles/theme';
import ThemeBtn from './components/ThemeBtn';
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import { StartPage } from './pages/StartPage';
import { Footer } from './components/Footer';
import { Lobby } from './pages/Lobby';
import { PrevLogin } from './components/PrevLogin';
import { Game } from './pages/Game';

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${(props) => props.theme.background};
    color: ${(props) => props.theme.color};
    /* transition: all 0.25s linear; */
  }
`;

const App: React.FC = () => {
  const [theme, setTheme] = useRecoilState(themeAtom);
  const setAuth = useSetRecoilState(authState);
  const navigate = useNavigate();
  // const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setAuth({ isLogin: true });
    } else {
      setAuth({ isLogin: false });
      navigate('/login');
    }
  }, [setAuth, navigate]);

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
          <Route path="/game/:user1/:user2" element={<Game />} />
          <Route path="/" element={<PrevLogin />}>
            <Route path="/" element={<Lobby />} />
          </Route>
        </Routes>
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default App;
