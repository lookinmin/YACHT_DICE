import React from 'react';
import styled from 'styled-components';
import TextField from '@mui/material/TextField';
import { tfTheme } from '../styles/theme';
import { ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

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
  column-gap: 2vw;
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
      font-size: 1.1em;

      &:hover {
        color: #90c9ff;
      }
    }
  }
`;

export const StartPage: React.FC = () => {
  const navigate = useNavigate();

  const imgUrl_black =
    'https://yachtdice.s3.ap-northeast-2.amazonaws.com/main_dice.png';
  const imgUrl_blue =
    'https://yachtdice.s3.ap-northeast-2.amazonaws.com/main_blue.png';

  const handleSignUpClick = () => {
    navigate('/signup');
  };

  return (
    <ThemeProvider theme={tfTheme}>
      <StPg>
        <ChdDiv>
          <ImgDiv>
            <h1>YACHT DICE</h1>
            <img src={imgUrl_blue} alt="img" width="400px" height="400px" />
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
              <p onClick={handleSignUpClick}>SIGN UP</p>
              <p>LOGIN</p>
            </div>
          </FormDiv>
        </ChdDiv>
      </StPg>
    </ThemeProvider>
  );
};
