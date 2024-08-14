import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { FaUserCircle } from 'react-icons/fa';
import { PiRobotLight } from 'react-icons/pi';

const RightDiv = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  gap: 15px;
  height: 100%;
  align-items: center;
  border-left: 1px solid #808080;
  padding: 4vh 2vw;

  & > .top {
    display: flex;
    flex-flow: row nowrap;
    width: 100%;
    justify-content: flex-start;
    align-items: center;
    gap: 15px;

    & > p {
      margin: 0 !important;
      font-size: 1.4em;
      padding-bottom: 5px;
    }
  }
`;

export const Right: React.FC = () => {
  const { user1, user2 } = useParams<{ user1: string; user2: string }>();
  const [userName, setUserName] = useState<string>('AI');

  useEffect(() => {
    if (user2 === 'ai') {
      setUserName('ChatGPT 4o');
    }
  }, [user2]);

  return (
    <RightDiv>
      <div className="top">
        {user2 === 'ai' ? (
          <PiRobotLight size={35} color="#7aff58" />
        ) : (
          <FaUserCircle size={35} />
        )}

        <p>{userName}</p>
      </div>
    </RightDiv>
  );
};
