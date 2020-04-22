/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import styled from 'styled-components';

const ModalDiv = styled.div`
  width: var(--sm-container);
  height: auto;
  background-color: var(--beige);

`;

const Modal = ({ text }) => {
  const [status, setStatus] = useState(true);

  return (
    <ModalDiv>
      <span>X</span>
      <p>{text}</p>
    </ModalDiv>
  );
};


export default Modal;
