import React from 'react';
import TextField from '@mui/material/TextField';
import styled from 'styled-components';
import { PiUsersThreeDuotone } from 'react-icons/pi';
import { InputAdornment } from '@mui/material';
import { FaRegCircleUser } from 'react-icons/fa6';
import { BsSearchHeart } from 'react-icons/bs';
import IconButton from '@mui/material/IconButton';
import { RiUserSearchLine, RiUserHeartLine } from 'react-icons/ri';
import { GoPlusCircle, GoXCircle } from 'react-icons/go';
import { GiRollingDices } from 'react-icons/gi';
import { ThemeProvider } from '@mui/material/styles';
import { tfTheme2 } from '../styles/theme';

const StyledDiv = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: flex-start;
  gap: 3vh;
  background-color: #3f4b48;
  width: 100%;
  padding: 6vh 0 3vh 0;

  & > .top {
    display: flex;
    width: 80%;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    & > .mark {
      display: flex;
      flex-flow: row nowrap;
      justify-content: flex-start;
      gap: 15px;
      align-items: center;

      & > p {
        margin: 0 !important;
        font-size: 1.2em;
        font-weight: 600;
      }
    }
  }

  & > #search {
    width: 80%;
    display: grid;
    grid-template-columns: 9.5fr 0.5fr;
    column-gap: 20px;
    position: center;
    padding-bottom: 30px;
    border-bottom: 2px dotted #929292;
  }
`;

interface FriendProps {
  isFriend: boolean;
}

const Friend = styled.div<FriendProps>`
  display: flex;
  flex-flow: row nowrap;
  width: 80%;
  box-sizing: border-box;
  justify-content: space-between;
  align-items: center;
  border-radius: 10px;
  background-color: ${(props) => (props.isFriend ? '#8ead90' : '#83a9bb')};
  padding: 0.5vh 1vw;
  height: 57px;
  color: ${(props) => (props.isFriend ? '#ffffff' : '#1a64d3')};
  //color : #86aa9c
  & > .front {
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
    align-items: center;
    gap: 20px;

    & > p {
      font-size: 1.1em;
      margin: 0 !important;
    }
  }
`;

export const Friends: React.FC = () => {
  return (
    <ThemeProvider theme={tfTheme2}>
      <StyledDiv>
        <div className="top">
          <div className="mark">
            <PiUsersThreeDuotone size={33} color="skyblue" />
            <p>Friends List</p>
          </div>
        </div>

        <form id="search">
          <TextField
            id="outlined-basic"
            label="User ID"
            variant="outlined"
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <FaRegCircleUser size={25} color="#8ccfcf" />
                </InputAdornment>
              ),
              placeholder: 'ENTER ID',
            }}
          />
          <IconButton color="primary" type="submit">
            <BsSearchHeart size={35} />
          </IconButton>
        </form>

        <Friend isFriend={false}>
          <div className="front">
            <RiUserSearchLine size={30} />
            <p>ID</p>
          </div>

          <IconButton color="primary" type="submit" title="ADD Friend">
            <GoPlusCircle size={36} />
          </IconButton>
        </Friend>

        <Friend isFriend={true}>
          <div className="front">
            <RiUserHeartLine size={30} />
            <p>ID</p>
          </div>

          <IconButton color="inherit" type="submit" title="PLAY!">
            <GiRollingDices size={44} />
          </IconButton>
        </Friend>
      </StyledDiv>
    </ThemeProvider>
  );
};
