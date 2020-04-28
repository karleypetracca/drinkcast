import React, { useState, useContext, useEffect } from 'react';
import { OTPublisher } from 'opentok-react';
import styled from 'styled-components';
import CheckBox from './CheckBox';
import StateContext from '../context';

const PublisherDiv = styled.div`
  padding: 1rem 3rem;
  width: 50%;
  margin: 0 auto;
 
  @media screen and (max-width: 600px) {
    padding: 0 0.4rem;
    width: 60%
  } 
`;

const Publisher = () => {
  const [error, setError] = useState(null);
  const [audio, setAudio] = useState(true);
  const [video, setVideo] = useState(true);
  const [value, dispatch] = useContext(StateContext);
  const [vidWidth, setVidWidth] = useState('auto');
  const [vidHeight, setVidHeight] = useState('40vw');


  useEffect(() => {
    const setDimensions = () => {
      setVidWidth(window.innerWidth <= 600 ? 'contain' : 'auto');
      setVidHeight(window.innerWidth <= 600 ? 'contain' : '40vw');
    };
    window.addEventListener('resize', setDimensions);
    return () => window.removeEventListener('resize', setDimensions);
  }, []);

  const onError = (err) => {
    setError(`Failed to publish: ${err.message}`);
  };

  return (
    <PublisherDiv>
      {value.userName}
      {error ? <div>{error}</div> : null}
      <OTPublisher
        // style={{
        //   border: '1px solid green',
        //   width: vidWidth,
        //   height: vidHeight,
        // }}
        properties={{
          width: vidWidth,
          height: vidHeight,
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
