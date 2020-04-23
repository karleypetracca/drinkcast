import React, { useState, useContext } from 'react';
import { OTSession, OTStreams, preloadScript } from 'opentok-react';
import styled from 'styled-components';
import ConnectionStatus from './ConnectionStatus';
import Publisher from './Publisher';
import Subscriber from './Subscriber';
import StateContext from '../context';
import Nav from './Nav';
import Modal from './Modal';
import config from './config';


const BarRoom = styled.div`
  background-color: var(--yellow);
  height: 100vh;
  color: black;
`;


const Bar = () => {
  const [value, dispatch] = useContext(StateContext);
  const [error, setError] = useState(false);
  const [connected, setConnected] = useState(false);

  console.log('this is the context inside the Bar component: ', value);


  const sessionEvents = {
    sessionConnected: () => setConnected(true),
    sessionDisconnected: () => setConnected(false),
  };

  const onError = (err) => {
    setError(`Failed to connect: ${err.message}`);
  };


  return (
    <BarRoom>
      <Nav />
      <Modal text="Hi there Chauncey. Pull up a seat!" />
      <OTSession
        apiKey={config.API_KEY}
        sessionId={config.SESSION_ID}
        token={config.TOKEN}
        eventHandlers={sessionEvents}
        onError={onError}
      >
        {/* {error ? <div>error</div> : null} */}
        {/* <ConnectionStatus connected={connected} /> */}
        <Publisher />
        <OTStreams>
          <Subscriber />
        </OTStreams>
      </OTSession>
    </BarRoom>
  );
};

export default preloadScript(Bar);
