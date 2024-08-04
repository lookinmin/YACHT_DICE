import React from 'react';
import { ImgHeader } from './ImgHeader';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { userState } from '../atoms/userInfo';
import { FaUserCircle } from 'react-icons/fa';
import Button from '@mui/material/Button';
import { Logout } from './Logout';

const StyledDiv = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: space-between;
  gap: 5vh;
  padding: 5vh 0;
  width: 90%;
  min-height: 65.3vh;

  & > .top {
    display: flex;
    flex-flow: row nowrap;
    width: 80%;
    justify-content: space-between;
    align-items: center;
  }
`;

const VSdiv = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-around;
  align-items: center;
  width: 80%;

  & > .userClass {
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: center;
    gap: 10px;

    & > p {
      margin: 0 !important;
      font-size: 1.5em;
    }
  }
`;

const BtnDiv = styled.div`
  display: flex;
  flex-flow: column nowrap;
  gap: 20px;
  align-items: center;
  justify-content: center;
  width: 60%;
`;

export const Ready: React.FC = () => {
  const userInfo = useRecoilValue(userState);
  // console.log(userInfo);
  return (
    <StyledDiv>
      <div className="top">
        <ImgHeader />
        <Logout />
      </div>

      <VSdiv>
        <div className="userClass">
          <FaUserCircle size={35} />
          <p>{userInfo.id}</p>
        </div>

        <p style={{ fontSize: '1.3em', fontWeight: 600 }}>VS</p>

        <div className="userClass">
          <FaUserCircle size={35} />
          <p>{userInfo.id}</p>
        </div>
      </VSdiv>
      <BtnDiv>
        <Button variant="outlined" fullWidth>
          Ready!
        </Button>
        <Button variant="outlined" fullWidth>
          Play With AI
        </Button>
      </BtnDiv>
    </StyledDiv>
  );
};
