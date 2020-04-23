import React, { useState } from 'react';
import { OTSubscriber } from 'opentok-react';
import CheckBox from './CheckBox';

const Subscriber = () => {
  const [error, setError] = useState(null);
  const [audio, setAudio] = useState(true);
  const [video, setVideo] = useState(true);

  const onError = (err) => {
    setError(`Failed to publish: ${err.message}`);
  };

  return (
    <div className="subscriber">
      Subscriber
      {error ? <div>{error}</div> : null}
      <OTSubscriber
        properties={{
          subscribeToAudio: audio,
          subscribeToVideo: video,
        }}
        onError={onError}
      />
      <CheckBox
        label="Subscribe Video"
        initialChecked={video}
        onChange={setVideo}
      />
      <CheckBox
        label="Subscribe Audio"
        initialChecked={audio}
        onChange={setAudio}
      />
    </div>
  );
};

export default Subscriber;
