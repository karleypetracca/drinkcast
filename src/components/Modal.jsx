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
  padding: 10px;
  padding-top: 25px;
  border-radius: 5px;
  min-width: var(--sm-container);
  max-width: 400px;
  text-align: center;
  height: auto;
  background-color: var(--secondary);
  position: relative;
  z-index: 10000;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.5), 0 6px 20px 0 rgba(0,0,0,0.49);
  p {
    margin: 0.6rem auto;
  }
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
