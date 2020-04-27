/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';

const InputStyled = styled.input`
  border: none;
  border-radius: 5px;
  padding: 10px;
  margin: 10px auto;
  text-align: center;
  width: 250px;
  font-family: inherit;
  font-size: 1rem;
  font-weight: bold;
`;

const Input = ({
  name, type, value, placeholder, onChange, isRequired,
}) =>
  (
    <>
      {isRequired !== ''
        ? (
          <InputStyled
            name={name}
            type={type}
            value={value}
            placeholder={placeholder}
            onChange={onChange}
            isRequired
          />
        ) : (
          <InputStyled
            name={name}
            type={type}
            value={value}
            placeholder={placeholder}
            onChange={onChange}
          />
        )}
    </>
  );

export default Input;
