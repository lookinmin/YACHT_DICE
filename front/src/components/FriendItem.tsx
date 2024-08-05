// src/components/FriendItem.tsx
import React from 'react';
import styled from 'styled-components';
import { FriendProps } from '../types/FriendType';
import { RiUserSearchLine, RiUserHeartLine } from 'react-icons/ri';
import { GoPlusCircle } from 'react-icons/go';
import { GiRollingDices } from 'react-icons/gi';
import IconButton from '@mui/material/IconButton';

const Friend = styled.div<FriendProps>`
  display: flex;
  flex-flow: row nowrap;
  width: 80%;
  box-sizing: border-box;
  justify-content: space-between;
  align-items: center;
  border-radius: 10px;
  background-color: ${(props) => (props.isFriend ? '#8ead90' : '#83a9bb')};
  padding: 0.5vh 1.5vw;
  height: 57px;
  color: ${(props) => (props.isFriend ? '#ffffff' : '#1a64d3')};
  //color : #86aa9c

  & > .front {
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
    align-items: center;
    gap: 25px;

    & > p {
      font-size: 1.3em;
      margin: 0 !important;
    }
  }
`;

const FriendItem: React.FC<FriendProps> = ({ isFriend, id }) => {
  return (
    <Friend isFriend={isFriend} id={id}>
      <div className="front">
        {isFriend ? (
          <RiUserHeartLine size={30} />
        ) : (
          <RiUserSearchLine size={30} />
        )}
        <p>{id}</p>
      </div>
      {isFriend ? (
        <IconButton color="inherit" type="submit" title="PLAY!">
          <GiRollingDices size={44} />
        </IconButton>
      ) : (
        <IconButton color="primary" type="submit" title="ADD Friend">
          <GoPlusCircle size={36} />
        </IconButton>
      )}
    </Friend>
  );
};

export default FriendItem;
