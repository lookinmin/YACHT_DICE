import React from 'react';
import TextField from '@mui/material/TextField';
import styled from 'styled-components';
import { PiUsersThreeDuotone } from 'react-icons/pi';
import { InputAdornment } from '@mui/material';
import { FaRegCircleUser } from 'react-icons/fa6';
import { BsSearchHeart } from 'react-icons/bs';
import IconButton from '@mui/material/IconButton';

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

export const Friends: React.FC = () => {
  return (
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
          <BsSearchHeart size={28} />
        </IconButton>
      </form>
    </StyledDiv>
  );
};
