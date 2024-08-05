// src/components/FriendItem.tsx
import React from 'react';
import styled from 'styled-components';
import { FriendProps } from '../types/FriendType';
import { RiUserSearchLine, RiUserHeartLine } from 'react-icons/ri';
import { GoPlusCircle } from 'react-icons/go';
import { GiRollingDices } from 'react-icons/gi';
import IconButton from '@mui/material/IconButton';
import { addUserToFriend } from '../api/instance';
import { useMutation } from 'react-query';
import { useRecoilValue } from 'recoil';
import { userState } from '../atoms/userInfo';

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
  const userInfo = useRecoilValue(userState);
  const userId = userInfo.id as string;

  const mutation = useMutation(
    ({ origin, other }: { origin: string; other: string }) => {
      return addUserToFriend(origin, other);
    },
  );

  const addUserHandler = (origin: string, other: string) => {
    // 친구 추가 확인 메시지 표시
    const confirmAdd = window.confirm(
      '친구로 추가하시겠습니까? \n 한쪽이 추가하면 다른 한쪽도 자동으로 친구로 추가됩니다.',
    );

    if (confirmAdd) {
      mutation.mutate(
        { origin, other },
        {
          onSuccess: (data) => {
            alert('친구추가 성공!');
            if (data.message === 'complete') {
              window.location.reload();
            }
          },
          onError: () => {
            alert('친구 추가에 실패했습니다.');
          },
        },
      );
    }
  };

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
          <GoPlusCircle size={36} onClick={() => addUserHandler(userId, id)} />
        </IconButton>
      )}
    </Friend>
  );
};

export default FriendItem;
