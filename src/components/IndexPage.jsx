/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import styled from 'styled-components';

import Image from './Image';
import Button from './Button';

import logo from '../images/drinkcast-logo-white.png';
import tagline from '../images/drinkcast-tagline-white.png';

const IndexStyled = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
 
  footer {
    font-size: 14px;
    position: absolute;
    bottom: 0;
    margin: 0 auto;
    padding: 10px;
    
    a {
      text-align: center;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
    }

    a * {
      padding: 2px;
      line-height: 1rem;
    }
  }
`;

const HeroStyled = styled.div`
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
    margin: 3vh auto;
  }

  * {
    margin: 5px auto;
  }

  .button-box {
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: space-evenly;
    margin: .5rem auto;
  }
`;

const IndexPage = () => (
  <IndexStyled>
    <HeroStyled>
      <div className="logo">
        <Image src={logo} alt="logo" className="inline-logo" />
        <Image src={tagline} alt="tagline" className="inline-tagline" />
      </div>

      <div className="button-box">
        <Button url="/createbar" type="button">CREATE A BAR</Button>
        <p><span>OR</span></p>
        <Button url="/joinbar" type="button">JOIN A BAR</Button>
      </div>

    </HeroStyled>
    <footer>
      <a href="https://github.com/karleypetracca/drinkcast-client/">
        <p>Made with ♥</p>
        <p>by Lockett, Josh, Zach & Karley</p>
      </a>
    </footer>
  </IndexStyled>
);

export default IndexPage;
