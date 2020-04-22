/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import styled from 'styled-components';


const Modal = ({ text }) => {
  const [status, setStatus] = useState(true);

  return (
    <div>
      <p>{text}</p>
    </div>
  );
};


export default Modal;
