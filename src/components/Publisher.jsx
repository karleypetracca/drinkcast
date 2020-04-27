import React, { useState, useContext } from 'react';
import { OTPublisher } from 'opentok-react';
import styled from 'styled-components';
import CheckBox from './CheckBox';
import StateContext from '../context';

const PublisherDiv = styled.div`
  padding: 1rem 0.2rem;
  
  @media screen and (max-width: 600px) {
    padding: 0;
    
  } 
`;

const Publisher = () => {
  const [error, setError] = useState(null);
  const [audio, setAudio] = useState(true);
  const [video, setVideo] = useState(true);
  const [value, dispatch] = useContext(StateContext);

  const onError = (err) => {
    setError(`Failed to publish: ${err.message}`);
  };

  return (
    <PublisherDiv>
      {value.userName}
      {error ? <div>{error}</div> : null}
      <OTPublisher
        properties={{
          publishAudio: audio,
          publishVideo: video,
        }}
        onError={onError}
      />
      <CheckBox
        label="Publish Video"
        initialChecked={video}
        onChange={setVideo}
      />
      <CheckBox
        label="Publish Audio"
        initialChecked={audio}
        onChange={setAudio}
      />
    </PublisherDiv>
  );
};

export default Publisher;
