import React from 'react';
import { useSetRecoilState } from 'recoil';
import { authState } from '../atoms/authAtom';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';

export const Logout: React.FC = () => {
  const setAuth = useSetRecoilState(authState);
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem('token');
    setAuth({ isLogin: false });
    navigate('/login');
  };

  return (
    <Button variant="text" onClick={logoutHandler}>
      Logout
    </Button>
  );
};
