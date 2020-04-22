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
    transition: 0.3s ease-in-out;
    border-radius: 5px;
    border-style: none;
    font-weight: bold;
    padding: 10px;
    cursor: pointer;
  }

  button:hover {
    background-color: var(--green-dark);
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
