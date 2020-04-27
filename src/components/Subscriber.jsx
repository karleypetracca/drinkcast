import React, { useState } from 'react';
import { OTSubscriber } from 'opentok-react';
import styled from 'styled-components';
import CheckBox from './CheckBox';

const SubDiv = styled.div`
 
  
  @media screen and (max-width: 600px) {
    width: 80%;
  }
`;

const Subscriber = () => {
  const [error, setError] = useState(null);
  const [audio, setAudio] = useState(true);
  const [video, setVideo] = useState(true);

  const onError = (err) => {
    setError(`Failed to publish: ${err.message}`);
  };

  return (
    <SubDiv>
      {error ? <div>{error}</div> : null}
      <OTSubscriber
        properties={{
          width: '20vw',
          height: '20vw',
          subscribeToAudio: audio,
          subscribeToVideo: video,
        }}
        onError={onError}
      />
      <CheckBox
        label="Hide Video"
        initialChecked={video}
        onChange={setVideo}
      />
      <CheckBox
        label="Mute Audio"
        initialChecked={audio}
        onChange={setAudio}
      />
    </SubDiv>
  );
};

export default Subscriber;
