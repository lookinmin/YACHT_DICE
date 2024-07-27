import React from 'react';

// Login, SignUp 컴포넌트
export interface LoginProps {
  setIsSignUp: React.Dispatch<React.SetStateAction<boolean>>;
}
// Dispatch : 값을 받아 값을 통해 상태를 변경하는 함수
// React.SetStateAction : 상태를 새로 설정하거나 기존 상태를 통해 새로운 상태를 계산
