import React, { useState } from 'react';
import { OTPublisher } from 'opentok-react';
import CheckBox from './CheckBox';

const Publisher = () => {
  const [error, setError] = useState(null);
  const [audio, setAudio] = useState(true);
  const [video, setVideo] = useState(true);
  // const [videoSource, setVideoSource] = useState('camera');

  // const changeVideoSource = () => {
  //   if (videoSource !== 'camera') {
  //     setVideoSource('camera');
  //   } else {
  //     setVideoSource('screen');
  //   }
  // };

  const onError = (err) => {
    setError(`Failed to publish: ${err.message}`);
  };

  return (
    <div className="publisher">
      Publisher
      {error ? <div>{error}</div> : null}
      <OTPublisher
        properties={{
          publishAudio: audio,
          publishVideo: video,
          // videoSource: videoSource === 'screen' ? 'screen' : undefined,
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
