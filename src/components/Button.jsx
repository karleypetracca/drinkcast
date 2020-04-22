/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';

const ButtonStyled = styled.a`
  text-align: center;
  cursor: pointer;
  transition: 0.3s ease-in-out;
  background-color: var(--secondary);
  color: var(--white);

  a:hover {
    background-color: var(--green-dark);
    color: white;
  }

  button {
    color: var(--white);
    border-radius: 4px;
    border-style: none;
    font-weight: bold;
    padding: 10px;
    margin: 3px;
    cursor: pointer;
  }
`;

const Button = ({ url, children }) => (

  <ButtonStyled href={url} type="button">
    <button type="button">
      {children}
    </button>
  </ButtonStyled>
);

export default Button;
