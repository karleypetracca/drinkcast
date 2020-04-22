/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import styled from 'styled-components';
// styles
// we can import these later instead of them being inside the component file

const IndexDiv = styled.div`
  background-color: #f6c562;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const IndexBox = styled.div`
  border: 2px solid #779e68;
  border-radius: 5px;
  width: 250px;
  margin: 15vh auto;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media screen and (max-width: 450px) {
    
  }
`;

const ButtonBox = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1rem auto;
  
  a {
    text-decoration: none;
    border: 2px solid rgb(29, 29, 29);
    border-radius: 5px;
    margin: 1rem auto;
    color: rgb(29, 29, 29);
    padding: 0.3rem;
    transition: 0.3s ease-in-out;
  }
  a:hover {
    background-color: rgb(29, 29, 29);
    color:white;
  }
  p {
    margin: 0rem auto;
    color: rgb(29, 29, 29);
  }
  /* p span {
    background:#fff; 
    padding:0 10px; 
  } */
`;

const IndexPage = () => {
  const greeting = 'hi there! How is this going to behave if i type as longish sentence?';

  return (
    <IndexDiv>
      <IndexBox>
        {greeting.repeat(5)}
        <ButtonBox>
          <a type="button" href="#">CREATE A BAR</a>
          <p><span>OR</span></p>
          <a type="button" href="/join">JOIN A BAR</a>
        </ButtonBox>

      </IndexBox>

    </IndexDiv>
  );
};

export default IndexPage;
