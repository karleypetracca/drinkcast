/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

const InputStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;

  * {
    padding: 3px;
  }

  input[type="checkbox"] {
    outline: 2px solid var(--white);
    outline-offset: -2px;
  }

  input[type="checkbox"]:checked {
    background-color: var(--secondary);
  }
`;

const CheckBox = ({ initialChecked, label, onChange }) => {
  const id = useRef(
    Math.random().toString(36).substring(2, 5) + Math.random().toString(36).substring(2, 5),
  );
  const [isChecked, setIsChecked] = useState(initialChecked);

  useEffect(() => {
    onChange(isChecked);
  }, [isChecked, onChange]);

  const handleChange = (e) => {
    setIsChecked(e.target.checked);
  };

  return (
    <InputStyled>
      <p>{label}</p>
      <input
        type="checkbox"
        checked={isChecked}
        id={id}
        onChange={(e) => handleChange(e)}
        data-testid="checkbox"
      />
    </InputStyled>
  );
};

export default CheckBox;
