/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import styled from 'styled-components';

import Image from './Image';
import Button from './Button';

import logo from '../images/drinkcast-logo-white.png';
import tagline from '../images/drinkcast-tagline-white.png';

import wood from '../images/wood.jpg';

// styles

const IndexDiv = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: url(${wood}) no-repeat top left fixed;
  background-size: cover;
`;

const IndexBox = styled.div`
  border-radius: 10px;
  background-color: var(--orange);
  width: 50%;
  min-width: 300px;
  margin: 15vh auto;
  padding: 1rem;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-weight: bold;

  @media screen and (max-width: 450px) {
    
  }

  * {
    margin: 5px auto;
  }
`;

const ButtonBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: .5rem auto;
`;

const IndexPage = () => (
  <IndexDiv>
    <IndexBox>
      <Image src={logo} alt="logo" className="inline-logo" />
      <Image src={tagline} alt="tagline" className="inline-tagline" />
      <ButtonBox>
        <Button url="/createbar" type="button">CREATE A BAR</Button>
        <p><span>OR</span></p>
        <Button url="/joinbar" type="button">JOIN A BAR</Button>
      </ButtonBox>

    </IndexBox>

  </IndexDiv>
);

export default IndexPage;
