import React from 'react';
import { ImgHeader } from './ImgHeader';
import styled from 'styled-components';

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
  return (
    <StyledDiv>
      <ImgHeader />
      <VSdiv></VSdiv>
    </StyledDiv>
  );
};
