import React, { useState, useContext } from 'react';
import { OTPublisher } from 'opentok-react';
import styled from 'styled-components';
import CheckBox from './CheckBox';
import StateContext from '../context';

const PublisherDiv = styled.div`
  margin-left: 30px;
  @media screen and (max-width: 600px) {
    padding: 0 0.4rem;

    width: 60%;
  }
`;

const Publisher = () => {
  const [error, setError] = useState(null);
  const [audio, setAudio] = useState(false);
  const [video, setVideo] = useState(true);
  const [value] = useContext(StateContext);

  const onError = (err) => {
    setError(`Failed to publish: ${err.message}`);
  };

  return (
    <PublisherDiv>
      {value.userName}
      {error ? <div>{error}</div> : null}
      <OTPublisher
        style={{
          width: '100',
          height: '100',
        }}
        properties={{
          publishAudio: audio,
          publishVideo: video,
        }}
        onError={onError}
      />
      <CheckBox
        label='Publish Video'
        initialChecked={video}
        onChange={setVideo}
      />
      <CheckBox
        label='Publish Audio'
        initialChecked={audio}
        onChange={setAudio}
      />
    </PublisherDiv>
  );
};

export default Publisher;
