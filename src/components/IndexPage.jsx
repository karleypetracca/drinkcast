/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import styled from 'styled-components';

import Image from './Image';
import Button from './Button';

import logo from '../images/drinkcast-logo-white.png';
import tagline from '../images/drinkcast-tagline-white.png';

// styles

const IndexDiv = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
 
  .about-message {
    font-size: 14px;
    position: absolute;
    bottom: 0;
    
    a {
      text-align: center;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
    }

    a * {
      padding: 1px;
      line-height: 1rem;
    }
  }
`;

const IndexBox = styled.div`
  border-radius: 5px;
  width: auto;
  min-width: 300px;
  margin: 15vh auto;
  padding: 1rem;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-weight: bold;
  
  .logo {
    margin: 0 2.3rem;
  }
  @media screen and (max-width: 600px) {
    flex-direction: column;
  }
  * {
    margin: 5px auto;
  }
`;

const ButtonBox = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-evenly;
  margin: .5rem auto;
`;

const IndexPage = () => (
  <IndexDiv>
    <IndexBox>
      <div className="logo">
        <Image src={logo} alt="logo" className="inline-logo" />
        <Image src={tagline} alt="tagline" className="inline-tagline" />
      </div>

      <ButtonBox>
        <Button url="/createbar" type="button">CREATE A BAR</Button>
        <p><span>OR</span></p>
        <Button url="/joinbar" type="button">JOIN A BAR</Button>
      </ButtonBox>

    </IndexBox>
    <footer className="about-message">
      <a href="https://github.com/karleypetracca/drinkcast-client/">
        <p>Made with ♥ {' '}</p>
        <p>by Lockett, Josh, Zach and Karley</p>
      </a>
    </footer>
  </IndexDiv>
);

export default IndexPage;
