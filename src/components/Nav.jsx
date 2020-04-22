import React from 'react';
import styled from 'styled-components';

import Image from './Image';

import logo from '../images/drinkcast-logo-white.png';

const NavStyled = styled.nav`
  width: calc(100vw - (100vw - 100%));
  min-height: var(--nav-height);
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--primary);

  a {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const Nav = () => (
  <NavStyled>
    <a href="/">
      <Image src={logo} alt="logo" className="nav-logo" />
    </a>
  </NavStyled>
);

export default Nav;
