import React from 'react';
import { Logout } from '../components/Logout';
import styled from 'styled-components';
import { Ready } from '../components/Ready';
import { Friends } from '../components/Friends';

const GridLobby = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  width: 100%;
  justify-items: center;
`;

export const Lobby: React.FC = () => {
  return (
    <GridLobby>
      <Ready />
      <Friends />
    </GridLobby>
  );
};
