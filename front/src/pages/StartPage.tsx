import React from 'react'
import styled from 'styled-components'

const StPg = styled.div`
  display: flex;
  flex-flow: column nowrap;
  margin: 5vh 0;
  width: 100%;
  justify-content: center;
  align-items: center;
`

const ChdDiv = styled.div`
  display: grid;
  width: clamp(750px, 100%, 1250px);
  grid-template-columns: 4fr 6fr;
  column-gap: 1vw;
  place-items: center;
`

const ImgDiv = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
  padding: 5vh 0;
  gap: 3vh;
`

const FormDiv = styled.div`
`

export const StartPage: React.FC = () => {
  return (
    <StPg>
      <ChdDiv>
      <ImgDiv>
      <h1>YACHT DICE</h1>
      </ImgDiv>
      <FormDiv>

      </FormDiv>
      </ChdDiv>
    </StPg>
  )
}


