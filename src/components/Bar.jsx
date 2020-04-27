import React, { useState, useContext, useEffect } from 'react';
import { OTSession, OTStreams, preloadScript } from 'opentok-react';
import styled from 'styled-components';
import ConnectionStatus from './ConnectionStatus';
import Publisher from './Publisher';
import Subscriber from './Subscriber';
import StateContext from '../context';

import Nav from './Nav';
import Modal from './Modal';
import { post, API_URL } from '../utils/apiConn';
import wood from '../images/wood.jpg';

const BarRoom = styled.div`
  display: flex;
  height: var(--main-height);
  background: url(${wood}) no-repeat top left fixed;
  background-size: cover;
`;

const Bar = () => {
  const [value, dispatch] = useContext(StateContext);
  const [error, setError] = useState(false);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const loadData = {
      barName: value.barName,
    };
    const postURL = `${API_URL}api/updatebar`;
    const loadResp = post(postURL, loadData);
  }, [value.barName]);

  console.log('this is the context inside the Bar component: ', value);

  const sessionEvents = {
    sessionConnected: () => setConnected(true),
    sessionDisconnected: () => setConnected(false),
  };

  const onError = (err) => {
    setError(`Failed to connect: ${err.message}`);
  };
  const greeting = `Welcome to ${value.barName}! Pull up a seat ${value.userName}!`;

  return (
    <>
      <Nav />
      <BarRoom>
        <Modal text={greeting} />
        <OTSession
          apiKey={value.key}
          sessionId={value.sessionId}
          token={value.token}
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
    </>
  );
};

export default preloadScript(Bar);
