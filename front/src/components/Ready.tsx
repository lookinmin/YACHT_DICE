import React from 'react';
import { ImgHeader } from './ImgHeader';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { userState } from '../atoms/userInfo';

const StyledDiv = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  padding: 3vh 0;
`;

const VSdiv = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-around;
  align-items: center;
  width: 80%;
`;

export const Ready: React.FC = () => {
  const userInfo = useRecoilValue(userState);
  console.log(userInfo);
  return (
    <StyledDiv>
      <ImgHeader />
      <VSdiv>
        <p>{userInfo.id}</p>
      </VSdiv>
    </StyledDiv>
  );
};
