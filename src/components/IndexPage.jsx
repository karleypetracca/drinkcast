/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import styled from 'styled-components';

import Button from './Button';

// styles

const IndexDiv = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--background);
`;

const IndexBox = styled.div`
  border: 2px solid var(--secondary);
  border-radius: 5px;
  background-color: var(--orange);
  width: 280px;
  margin: 15vh auto;
  padding: 1rem;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  @media screen and (max-width: 450px) {
    
  }
`;

const ButtonBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: .5rem auto;
`;

const IndexPage = () => {
  const greeting = 'hi there! How is this going to behave if i type as longish sentence?';

  return (
    <IndexDiv>
      <IndexBox>
        {greeting.repeat(3)}
        <ButtonBox>
          <Button url="#">CREATE A BAR</Button>
          <p><span>OR</span></p>
          <Button url="/join">GO TO A BAR</Button>
        </ButtonBox>

      </IndexBox>

    </IndexDiv>
  );
};

export default IndexPage;
