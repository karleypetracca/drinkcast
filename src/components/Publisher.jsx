import React, { useState, useContext } from 'react';
import { OTPublisher } from 'opentok-react';
import styled from 'styled-components';
import CheckBox from './CheckBox';
import StateContext from '../context';

const PublisherStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 20px;
  padding-left: 60px;

  @media screen and (max-width: 600px) {
    padding: 0 0.4rem;
  }

  .video-box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-left: 55px;
  }

  .OTPublisherContainer {
    font-family: 'uomo';
    width: 120px !important;
    height: 100px !important;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.5), 0 6px 20px 0 rgba(0, 0, 0, 0.49);
    z-index: 5;
    border-radius: 5px;
  }

  .controls {
    margin-top: 30px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
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
      <div className="video-box">
        <b>{value.userName}</b>
        {error ? <p>Failed to Connect</p> : null}
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
      </div>
      <div className="controls">
        <CheckBox
          type="video"
          label="Share Video"
          initialChecked={video}
          onChange={setVideo}
        />
        <CheckBox
          type="audio"
          label="Share Audio"
          initialChecked={audio}
          onChange={setAudio}
        />
      </div>
    </PublisherStyled>
  );
};

export default Publisher;
