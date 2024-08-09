import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export const Game: React.FC = () => {
  const params = useParams();
  const user1 = params.user1;
  const user2 = params.user2;

  const [isAI, setIsAI] = useState<boolean>(false);

  useEffect(() => {
    if (user2 === 'ai') {
      setIsAI(true);
    } else {
      setIsAI(false); // 추가로 'ai'가 아닐 때 false로 설정해줌
    }
  }, [user2]); // user2가 변경될 때만 실행됨

  return <div>Game</div>;
};
