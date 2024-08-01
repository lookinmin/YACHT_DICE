import React from 'react';
import styled from 'styled-components';
import { IoLogoGithub, IoLogoInstagram } from 'react-icons/io5';
import { SiVelog } from 'react-icons/si';
import { useRecoilState, useRecoilValue } from 'recoil';
import { themeAtom } from '../atoms/themeAtom';

const StyledFooter = styled.div`
  display: flex;
  flex-flow: column nowrap;
  gap: 2vh;
  align-items: center;
  justify-content: center;
  // border-top: 1px solid #7a7a7a;
  padding: 2vh 0;
  background-color: #585858;

  & > p:nth-child(1) {
    font-size: 1.3rem;
  }

  & > p:nth-last-child(1) {
    font-size: 0.8rem;
    color: #adadad;
    padding-top: 10px;
  }

  & > div {
    display: flex;
    flex-flow: row nowrap;
    gap: 3vw;
    align-items: center;
    justify-content: center;

    & > .icons {
      cursor: pointer;
    }
  }
`;

export const Footer: React.FC = () => {
  const theme = useRecoilValue(themeAtom);
  const iconColor = theme === 'dark' ? '#f7f7f7' : '#494949';
  const clickHandler = (e: number) => {
    switch (e) {
      case 1:
        window.open('https://github.com/lookinmin/YACHT_DICE');
        break;
      case 2:
        window.open('https://velog.io/@lookin_min/posts');
        break;
      case 3:
        window.open('https://www.instagram.com/lookin_min/');
        break;
    }
  };

  return (
    <StyledFooter>
      <p>Thanks for visiting</p>
      <div>
        <IoLogoGithub
          size={30}
          color={iconColor}
          title="lookinmin Github"
          className="icons"
          onClick={() => clickHandler(1)}
        />
        <SiVelog
          size={28}
          color={iconColor}
          title="lookin_min velog"
          className="icons"
          onClick={() => clickHandler(2)}
        />
        <IoLogoInstagram
          size={30}
          color={iconColor}
          title="lookin_min Instagram"
          className="icons"
          onClick={() => clickHandler(3)}
        />
      </div>
      <p>@Copyright lookin_min. All rights reserved. 2024</p>
    </StyledFooter>
  );
};
