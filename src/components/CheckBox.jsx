/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faVideo,
  faVideoSlash,
  faMicrophone,
  faMicrophoneSlash,
} from '@fortawesome/free-solid-svg-icons';

const InputStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  z-index: 10;

  * {
    padding: 3px;
  }

  input[type="checkbox"] {
    padding: 5px;
  }

  input[type="checkbox"]:checked {
  }

  button {
    background-color: transparent;
    color: inherit;
    border-style: none;
    cursor: pointer;
    box-sizing: border-box;
    width: 60px;
  }
`;

const CheckBox = ({
  type, initialChecked, label, onChange,
}) => {
  let on;
  let off;

  if (type === 'video') {
    on = faVideo;
    off = faVideoSlash;
  }

  if (type === 'audio') {
    on = faMicrophone;
    off = faMicrophoneSlash;
  }

  const [isChecked, setIsChecked] = useState(initialChecked);
  const [icon, setIcon] = useState(on);

  useEffect(() => {
    onChange(isChecked);
  }, [isChecked, onChange]);

  const handleClick = () => {
    setIsChecked(!isChecked);
    if (icon === on) {
      setIcon(off);
    }
    if (icon === off) {
      setIcon(on);
    }
  };

  return (
    <InputStyled>
      <button type="button" onClick={handleClick} title={label}>
        <FontAwesomeIcon icon={icon} size="3x" />
      </button>
    </InputStyled>
  );
};

export default CheckBox;
