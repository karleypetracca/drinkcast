import React from 'react';
import styled from 'styled-components';

const NavStyled = styled.nav`
  width: calc(100vw - (100vw - 100%));
  min-height: var(--nav-height);
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--primary);
`;

const Nav = () => (
  <NavStyled>
    <h1>drinkcast</h1>
  </NavStyled>
);

export default Nav;
