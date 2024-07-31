import React from 'react';
import styled from 'styled-components';

const ImgDiv = styled.div`
  display: flex;
  flex-flow: row nowrap;
  gap: 15px;
  align-items: center;
`;

export const ImgHeader: React.FC = () => {
  const imgUrl_blue =
    'https://yachtdice.s3.ap-northeast-2.amazonaws.com/main_blue.png';
  return (
    <ImgDiv>
      <img src={imgUrl_blue} alt="img" width="60px" />
      <h3>YACHT DICE</h3>
    </ImgDiv>
  );
};
