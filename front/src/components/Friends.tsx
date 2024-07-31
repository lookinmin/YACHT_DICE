import React from 'react';
import { Logout } from './Logout';
import styled from 'styled-components';

const StyledDiv = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
  background-color: #9b9b9b;
  width: 100%;
  padding: 3vh 0;
`;

export const Friends: React.FC = () => {
  return (
    <StyledDiv>
      <Logout />
    </StyledDiv>
  );
};
