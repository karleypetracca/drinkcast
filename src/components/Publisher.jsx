import React, { useState, useContext } from 'react';
import { OTPublisher } from 'opentok-react';
import styled from 'styled-components';
import CheckBox from './CheckBox';
import StateContext from '../context';

const PublisherStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;

  @media screen and (max-width: 600px) {
    padding: 0 0.4rem;
  }

  .OTPublisherContainer {
    font-family: 'uomo';
    width: 120px !important;
    height: 100px !important;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.5), 0 6px 20px 0 rgba(0, 0, 0, 0.49);
    z-index: 5;
  }
`;

const Publisher = () => {
  const [error, setError] = useState(null);
  const [audio, setAudio] = useState(true);
  const [video, setVideo] = useState(true);
  const [value] = useContext(StateContext);

  const onError = (err) => {
    setError(`Failed to connect: ${err.message}`);
  };

  return (
    <PublisherStyled>
      {value.userName}
      {error ? <p>{error}</p> : null}
      <OTPublisher
        style={{
          nameDisplayMode: 'on',
          width: '100',
          height: '100',
        }}
        properties={{
          name: value.userName.toUpperCase(),
          nameDisplayMode: 'on',
          publishAudio: audio,
          publishVideo: video,
        }}
        onError={onError}
      />
      <CheckBox

        label="Share Video"
        initialChecked={video}
        onChange={setVideo}
      />
      <CheckBox
        label="Share Audio"
        initialChecked={audio}
        onChange={setAudio}
      />
    </PublisherStyled>
  );
};

export default Publisher;
