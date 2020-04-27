/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';

const WrapperStyled = styled.a`
  text-align: center;
  cursor: pointer;
`;

const ButtonStyled = styled.button`
    background-color: var(--secondary);
    color: var(--white);
    transition: 0.2s ease-in;
    border-radius: 5px;
    border-style: none;
    padding: 15px;
    margin: 1rem auto;
    cursor: pointer;
    font-family: inherit;
    font-size: 1rem;
    font-weight: bold;
  }

  :hover {
    background-color: var(--white);
    color: var(--secondary);
  }
`;

const Button = ({ url, type, children }) => (
  <>
    {url !== ''
      ? (
        <WrapperStyled href={url} type="button">
          <ButtonStyled type={type}>
            {children}
          </ButtonStyled>
        </WrapperStyled>
      )
      : (
        <ButtonStyled type={type}>
          {children}
        </ButtonStyled>
      )}
  </>
);

export default Button;
