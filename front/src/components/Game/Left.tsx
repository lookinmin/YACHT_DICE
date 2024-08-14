import React from 'react';
import { Button } from '@mui/material';
import { useParams, Navigate, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { userState } from '../../atoms/userInfo';
import { useRecoilValue } from 'recoil';
import { FaUserCircle } from 'react-icons/fa';

const LeftDiv = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  gap: 15px;
  height: 100%;
  align-items: center;
  border-right: 1px solid #808080;
  padding: 4vh 2vw;

  & > .leftTop {
    display: flex;
    flex-flow: row nowrap;
    width: 100%;
    justify-content: space-between;
    align-items: center;

    & > .un {
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      gap: 15px;

      & > p {
        margin: 0 !important;
        font-size: 1.4em;
        padding-bottom: 5px;
      }
    }
  }
`;

export const Left: React.FC = () => {
  const navigate = useNavigate();
  const user = useRecoilValue(userState);
  const userId = user.id;

  return (
    <LeftDiv>
      <div className="leftTop">
        <Button
          variant="outlined"
          color="warning"
          onClick={() => navigate('/')}
        >
          EXIT
        </Button>
        <div className="un">
          <p>{userId}</p>
          <FaUserCircle size={35} />
        </div>
      </div>
    </LeftDiv>
  );
};
