import React from 'react'
import styled from 'styled-components'
import { IoLogoGithub, IoLogoInstagram } from "react-icons/io5";
import { SiVelog } from "react-icons/si";

const StyledFooter = styled.div`
  display: flex;
  flex-flow: column nowrap;
  gap: 2vh;
  align-items: center;
  justify-content: center;
  border-top: 1px solid #7a7a7a;
  margin: 0 4vw;
  padding: 2vh 0;

  & > p:nth-child(1) {
    font-weight: 500;
    font-size: 1.3rem;
  }

  & > p:nth-last-child(1) {
    font-weight: 500;
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

`

export const Footer:React.FC = () => {

  const clickHandler = (e: number) => {
    switch (e) {
      case 1:
        window.open("https://github.com/lookinmin");
        break;
      case 2:
        window.open("https://velog.io/@lookin_min/posts");
        break;
      case 3:
        window.open("https://www.instagram.com/lookin_min/");
        break;
    }
  };

  return (
    <StyledFooter>
      <p>Thanks for visiting</p>
      <div>
        <IoLogoGithub
          size={30}
          color="#f7f7f7"
          title="lookinmin Github"
          className="icons"
          onClick={() => clickHandler(1)}
        />
        <SiVelog
          size={28}
          color="#f7f7f7"
          title="lookin_min velog"
          className="icons"
          onClick={() => clickHandler(2)}
        />
        <IoLogoInstagram
          size={30}
          color="#f7f7f7"
          title="lookin_min Instagram"
          className="icons"
          onClick={() => clickHandler(3)}
        />
      </div>
      <p>@Copyright lookin_min. All rights reserved. 2024</p>
    </StyledFooter>
  )
}
