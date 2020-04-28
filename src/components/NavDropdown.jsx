/* eslint-disable react/prop-types */
import React from 'react';

import styled from 'styled-components';

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

  .dropdown-links {
    background-color: var(--primary);
    display: flex;
    flex-direction: column;
    padding: 10px;
    width: 100%;
    top: var(--nav-height);
    text-align: center;
    z-index: 10000;
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
