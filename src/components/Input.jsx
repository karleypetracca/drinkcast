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
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.5), 0 6px 20px 0 rgba(0, 0, 0, 0.49);
    z-index: 5;
`;

const Input = ({
  name, type, value, placeholder, onChange, isRequired,
}) => (
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
