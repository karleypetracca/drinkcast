/* eslint-disable react/prop-types */
import React from 'react';

import styled from 'styled-components';

const ImageStyled = styled.div`
  margin: 5px;
  padding: 5px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  .nav-logo {
    width: 200px;
  }

  .inline-logo {
    width: 300px;
  }

  .inline-tagline {
    width: 200px;
  }

  img {
    width: 100%;
  }
`;

const Image = ({ src, alt, className }) => (
  <ImageStyled>
    <img src={src} alt={alt} className={className} />
  </ImageStyled>
);

export default Image;
