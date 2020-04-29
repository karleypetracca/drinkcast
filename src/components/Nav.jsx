/* eslint-disable indent */
/* eslint-disable react/jsx-indent */
import React, { useState, useContext } from 'react';
import Burger from '@animated-burgers/burger-squeeze';
import '@animated-burgers/burger-squeeze/dist/styles.css';
import styled from 'styled-components';
import StateContext from '../context';

import Image from './Image';

import Button from './Button';
import NavDropdown from './NavDropdown';

import logo from '../images/drinkcast-logo-white.png';

const NavStyled = styled.nav`
  width: calc(100vw - (100vw - 100%));
  min-height: var(--nav-height);
  display: flex;
  background-color: var(--primaryFaded);
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  z-index: 6;

  .links {
    display: flex;
    font-size: 1.6rem;
    flex-direction: row-reverse;
    width: 100%;
    align-items: center;
  }

  .links {
    padding: 0 1rem;
  }

  .returnBar,
  .joinBar,
  .createBar {
    padding: 10px 1rem;
  }

  a:hover {
    transition: 0.3s ease-in-out;
    color: var(--secondary);
  }

  @media only screen and (min-width: 601px) {
    .mobile {
      display: none;
    }
  }

  @media only screen and (max-width: 600px) {
    .desktop {
      display: none;
    }
  }
`;

const Nav = () => {
  const [burgerIsOpen, setBurgerIsOpen] = useState(false);

  const location = !!(window.location.href.split('/').pop() === 'bar');
  // eslint-disable-next-line no-unused-vars
  const [inBar, setInBar] = useState(location);
  // eslint-disable-next-line no-unused-vars
  const [value, dispatch] = useContext(StateContext);

  const clearBarInfo = (e) => {
    e.preventDefault();
    dispatch({
      type: 'ACTION_EXIT_BAR',
      sessionId: '',
      token: '',
      key: '',
      barName: '',
      userName: '',
    });

    localStorage.clear();
  };

  const getBarName = () => {
    const item = localStorage.getItem('barName') || '';
    if (item === '') {
      return '';
    }
    const bar = JSON.parse(item);
    return bar.localValue;
  };

  const name = getBarName();

  const burgerClick = () => {
    setBurgerIsOpen(!burgerIsOpen);
  };

  return (
    <NavStyled>
      <a href="/">
        <Image src={logo} alt="logo" className="nav-logo" />
      </a>
      <div className="desktop links">
        {localStorage.getItem('sessionId')
          && localStorage.getItem('token')
          && !inBar ? (
            <a href="/bar" className="returnBar">
              {name}
            </a>
          ) : null}
        {inBar ? (
          <Button
            className="nav"
            href="/"
            type="button"
            action={(e) => clearBarInfo(e)}
          >
            EXIT
          </Button>
        ) : (
            <>
              <a href="/joinbar" className="joinBar">
                JOIN
              </a>
              <a href="/createbar" className="createBar">
                CREATE
              </a>
            </>
          )}
      </div>
      <div className="mobile links">
        {burgerIsOpen ? (
          <Burger isOpen onClick={burgerClick} />
        ) : (
            <Burger onClick={burgerClick} />
          )}
        <NavDropdown isOpen={burgerIsOpen}>
          {localStorage.getItem('sessionId')
            && localStorage.getItem('token')
            && !inBar ? (
              <a href="/bar">{name}</a>
            ) : null}
            {inBar ? (
          <a
            href="/"
            onClick={(e) => clearBarInfo(e)}
          >
            EXIT
          </a>
        )
          : (
          <>
          <a href="/joinbar" className="joinBar">
            JOIN
          </a>
          <a href="/createbar" classnam="createBar">
            CREATE
          </a>
          </>
        )}

        </NavDropdown>
      </div>
    </NavStyled>
  );
};

export default Nav;
