import React, { useState } from 'react';
import { OTSubscriber } from 'opentok-react';
import styled from 'styled-components';
import CheckBox from './CheckBox';

const SubscriberStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 5px;

  @media screen and (max-width: 600px) {
    padding: 0 0.4rem;
  }

  .OTSubscriberContainer {
    font-family: 'uomo';
    width: 240px !important;
    height: 200px !important;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.5), 0 6px 20px 0 rgba(0, 0, 0, 0.49);
    z-index: 5;
    border-radius: 5px;
  }

  .controls {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const Subscriber = () => {
  const [error, setError] = useState(null);
  const [audio, setAudio] = useState(true);
  const [video, setVideo] = useState(true);

  const onError = (err) => {
    setError(`Failed to connect: ${err.message}`);
  };

  return (
    <SubscriberStyled>
      {error ? <div>{error}</div> : null}
      <OTSubscriber
        style={{
          width: '100',
          height: '100',
        }}
        properties={{
          subscribeToAudio: audio,
          subscribeToVideo: video,
        }}
        onError={onError}
      />
      <div className="controls">
        <CheckBox
          type="video"
          label="Show Video"
          initialChecked={video}
          onChange={setVideo}
        />
        <CheckBox
          type="audio"
          label="Play Audio"
          initialChecked={audio}
          onChange={setAudio}
        />
      </div>
    </SubscriberStyled>
  );
};

export default Subscriber;
