/* eslint-disable react/button-has-type */
/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';

const ButtonStyled = styled.a`
  text-align: center;
  cursor: pointer;
  margin: 1rem auto;

  button {
    background-color: var(--secondary);
    color: var(--white);
    transition: 0.2s ease-in;
    border-radius: 5px;
    border-style: none;
    font-weight: bold;
    padding: 10px;
    cursor: pointer;
  }

  button:hover {
    background-color: var(--white);
    color: var(--secondary);
  }
`;

const Button = ({ url, type, children }) => (

  <ButtonStyled href={url} type="button">
    <button type={type}>
      {children}
    </button>
  </ButtonStyled>
);

export default Button;
