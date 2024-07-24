import React from 'react';
import styled from 'styled-components';
import TextField from '@mui/material/TextField';
import { tfTheme } from '../styles/theme';
import { ThemeProvider } from '@mui/material/styles';

const StPg = styled.div`
  display: flex;
  flex-flow: column nowrap;
  margin: 5vh 0;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const ChdDiv = styled.div`
  display: grid;
  width: clamp(750px, 100%, 1250px);
  grid-template-columns: 4fr 6fr;
  column-gap: 1vw;
  place-items: center;
`;

const ImgDiv = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
  padding: 5vh 0;
  gap: 3vh;
`;

const FormDiv = styled.div`
  display: flex;
  flex-flow: column nowrap;
  gap: 20px;
  width: 80%;
  align-items: center;

  & > #txtBtn {
    width: 98%;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    & > p {
      margin: 0 !important;
      font-weight: 600;
      cursor: pointer;

      &:hover {
        color: #90c9ff;
      }
    }
  }
`;

export const StartPage: React.FC = () => {
  return (
    <ThemeProvider theme={tfTheme}>
      <StPg>
        <ChdDiv>
          <ImgDiv>
            <h1>YACHT DICE</h1>
          </ImgDiv>
          <FormDiv>
            <TextField
              id="outlined-basic"
              label="ID"
              variant="outlined"
              fullWidth
            />
            <TextField
              id="outlined-basic"
              label="PASSWORD"
              variant="outlined"
              fullWidth
            />

            <div id="txtBtn">
              <p>SIGN UP</p>
              <p>LOGIN</p>
            </div>
          </FormDiv>
        </ChdDiv>
      </StPg>
    </ThemeProvider>
  );
};
