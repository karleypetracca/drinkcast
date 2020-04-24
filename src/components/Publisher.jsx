import React, { useState, useContext } from 'react';
import { OTPublisher } from 'opentok-react';
import CheckBox from './CheckBox';
import StateContext from '../context';

const Publisher = () => {
  const [error, setError] = useState(null);
  const [audio, setAudio] = useState(true);
  const [video, setVideo] = useState(true);
  const [value, dispatch] = useContext(StateContext);

  const onError = (err) => {
    setError(`Failed to publish: ${err.message}`);
  };

  return (
    <div className="publisher">
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
    </div>
  );
};

export default Publisher;
