import React, { useState, useContext, useEffect, useRef } from 'react';
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

  const sessionRef = useRef();

  // this passes the barName to the backend to set the last access time
  // of a particular bar.
  useEffect(() => {
    const loadData = {
      barName: value.barName,
    };
    const postURL = `${API_URL}api/updatebar`;
    const loadResp = post(postURL, loadData);
  }, [value.barName]);

  const onSignalReceive = (signal) => {
    console.log('onSignalReceive => ', signal.data);
    // based on signal data type you can do use switch or conditional statements
  };

  const signalCallback = (event) => {
    console.log(event);
    onSignalReceive(event);
  };

  const sessionEvents = {
    sessionConnected: () => setConnected(true),
    sessionDisconnected: () => setConnected(false),
    'signal:msg': (event) => signalCallback(event),
  };

  const onError = (err) => {
    setError(`Failed to connect: ${err.message}`);
  };
  const greeting = `Welcome to ${value.barName}! Pull up a seat ${value.userName}!`;

  const sendSignal = () => {
    sessionRef.current.sessionHelper.session.signal(
      {
        type: 'msg',
        data: 'TheData',
      },
      (err) => {
        if (err) {
          console.log('signal error: ', err.message);
        } else {
          console.log('signal sent');
        }
      },
    );
  };

  return (
    <>
      <Nav />
      <BarRoom>
        <Modal text={greeting} />
        <OTSession
          ref={sessionRef}
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
          <button type='button' onClick={sendSignal}>
            Signal
          </button>
        </OTSession>
      </BarRoom>
    </>
  );
};

export default preloadScript(Bar);
