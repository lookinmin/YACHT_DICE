import React from 'react';
import { useRecoilValue } from 'recoil';
import { Navigate, Outlet } from 'react-router-dom';
import { authState } from '../atoms/authAtom';

export const PrevLogin: React.FC = () => {
  const { isLogin } = useRecoilValue(authState);
  return isLogin ? <Outlet /> : <Navigate to="/login" />;
};
