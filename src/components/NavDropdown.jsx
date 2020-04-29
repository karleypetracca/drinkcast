/* eslint-disable react/prop-types */
import React from 'react';

import styled, { keyframes } from 'styled-components';

const menuDrop = keyframes`
  0% {
    height: 0%;
  }
  100% {
    height: 16%;
  }
`;

const smallerMenuDrop = keyframes`
   0% {
      height: 0%;
    }
    100% {
      height: 23%;
    }
`;

const opacity = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
  
  

`;

const NavDropdownStyled = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: var(--brownFaded);
  top: var(--nav-height);
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  animation: ${opacity} 0.4s forwards ease-in-out;
  animation-iteration-count: 1;

  .dropdown-links {
    background-color: var(--primary);
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    padding: 10px;
    width: 100%;
    height: 16%;
    top: var(--nav-height);
    text-align: center;
    z-index: 10000;
    animation: ${menuDrop} 0.4s ease-in-out;
    animation-iteration-count: 1;
  }
  
  @media screen and (max-width: 415px) {
    .dropdown-links {
      height: 23%;
      animation: ${smallerMenuDrop} 0.4s ease-in-out;
      animation-iteration-count: 1;
    }
  }
`;

const NavDropdown = ({ isOpen, children }) => (
  <>
    {isOpen ? (
      <NavDropdownStyled>
        <div className="dropdown-links">{children}</div>
      </NavDropdownStyled>
    ) : ''}
  </>
);

export default NavDropdown;
