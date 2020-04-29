/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import styled from 'styled-components';

const ModalDiv = styled.div`
  background-color: rgba(0, 0, 0, 0);
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 9999;
`;

const ModalContent = styled.div`
  margin: 30vh auto;
  padding: 16px;
  padding-top: 35px;
  border-radius: 10px;
  min-width: var(--sm-container);
  max-width: 400px;
  text-align: center;
  height: auto;
  background-color: var(--secondary);
  position: relative;
  z-index: 10000;
`;

const CloseModal = styled.a`
  color: var(--tertiary);
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 10px;
  right: 10px;
`;


const Modal = ({ text }) => {
  const [status, setStatus] = useState(true);

  // this could be controlled from context instead of local state.
  // when a user logs in, useEffect trigger another modal with the new user name.

  const closeModal = (e) => {
    e.preventDefault();
    setStatus(false);
  };

  const modalDisplay = (
    <ModalDiv onClick={(e) => closeModal(e)}>
      <ModalContent>
        <CloseModal onClick={(e) => closeModal(e)}>
          <i className="far fa-window-close" />
        </CloseModal>
        <p>{text}</p>
      </ModalContent>
    </ModalDiv>
  );

  return (
    <>
      {status ? modalDisplay : null}
    </>
  );
};
export default Modal;
