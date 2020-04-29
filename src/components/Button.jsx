/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';

const WrapperStyled = styled.a`
  text-align: center;
  cursor: pointer;
  
  .nav {
    margin: 0;
    background-color: var(--primary);
  }
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
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.5), 0 6px 20px 0 rgba(0, 0, 0, 0.49);
    z-index: 5;
  }

  :hover {
    background-color: var(--white);
    color: var(--secondary);
  }
`;

const Button = ({
  url, type, children, action, className,
}) => (
    <>
      {url !== ''
        ? (
          <WrapperStyled href={url} type="button" onClick={action || null}>
            <ButtonStyled className={className} type={type}>
              {children}
            </ButtonStyled>
          </WrapperStyled>
        )
        : (
          <ButtonStyled type={type} onClick={action || null}>
            {children}
          </ButtonStyled>
        )}
    </>
  );

export default Button;
