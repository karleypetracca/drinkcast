/* eslint-disable react/prop-types */
import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import StateContext from '../context';

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
  border-radius: 4px;
  padding: 16px;
  width: var(--sm-container);
  height: auto;
  background-color: var(--orange);
  color: var(--black);
  position: relative;
  z-index: 10000;

`;

const CloseModal = styled.a`
  background-color: none;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  color: var(--black);
  position: absolute;
  top: 16px;
  right: 24px;
  z-index: 109000;

`;


const Modal = ({ text }) => {
  const [status, setStatus] = useState(true);
  const [value, dispatch] = useContext(StateContext);


  // this could be controlled from context instead of local state.
  // when a user logs in, useEffect trigger another modal with the new user name.


  const closeModal = (e) => {
    e.preventDefault();
    setStatus(false);
  };

  const modalDisplay = (
    <ModalDiv>
      <ModalContent>
        <CloseModal onClick={(e) => closeModal(e)}><i className="far fa-window-close" /></CloseModal>
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
