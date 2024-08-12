import React, { useEffect, useState } from 'react';
import { useParams, Navigate, useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { authState } from '../atoms/authAtom';
import Swal from 'sweetalert2';
import Button from '@mui/material/Button';
import styled from 'styled-components';
import { Left } from '../components/Game/Left';
import { Right } from '../components/Game/Right';
import { Center } from '../components/Game/Center';

const GameDiv = styled.div`
  display: grid;
  grid-template-columns: 1.2fr 2fr 1.2fr;
  column-gap: 2vw;
  place-content: center;
  min-height: 70vh;
`;

export const Game: React.FC = () => {
  const { user1, user2 } = useParams<{ user1: string; user2: string }>();
  const isAuth = useRecoilValue(authState).isLogin; // 로그인 상태 확인

  const [isAI, setIsAI] = useState<boolean>(user2 === 'ai');

  useEffect(() => {
    const preventClose = (event: BeforeUnloadEvent) => {
      event.preventDefault();
    };

    window.history.pushState(null, '', window.location.href); // 페이지 로드 시 현재 상태를 푸시
    window.addEventListener('beforeunload', preventClose); // 창닫기, 새로고침 방지

    const handlePopState = (event: PopStateEvent) => {
      event.preventDefault();
      window.history.pushState(null, '', window.location.href); // 뒤로가기 했을 때 현재 페이지로 다시 푸시
      Swal.fire({
        icon: 'warning',
        titleText: '게임이 현재 진행중입니다.',
        html: "게임이 완료되기 전엔, 뒤로가기를 할 수 없습니다. <br/>'EXIT'버튼을 이용해주세요.",
      });
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('beforeunload', preventClose); // 컴포넌트 언마운트 시 이벤트 리스너 제거
    };
  }, []);

  // 로그인 상태가 아닌 경우 리다이렉트
  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }

  return (
    <GameDiv>
      <Left />
      <h1>
        Game between {user1} and {isAI ? 'AI' : user2}
      </h1>

      {/* 게임 로직을 이곳에 추가 */}
    </GameDiv>
  );
};
