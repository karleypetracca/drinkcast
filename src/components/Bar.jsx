/* eslint-disable react/prop-types */
import React, { useState, useContext, useEffect } from 'react';
import { OTSession, OTStreams, preloadScript } from 'opentok-react';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import ConnectionStatus from './ConnectionStatus';
import Publisher from './Publisher';
import Subscriber from './Subscriber';
import StateContext from '../context';
import Game from './Game';

import Nav from './Nav';
import Modal from './Modal';
import { post, API_URL } from '../utils/apiConn';
import wood from '../images/wood.jpg';


const BarRoom = styled.div`
  display: flex;
  flex-direction: column;
  height: var(--main-height);
`;

const Bar = ({ match }) => {
  const [value, dispatch] = useContext(StateContext);
  const [error, setError] = useState(false);
  const [connected, setConnected] = useState(false);

  const getLocalData = (localKey) => {
    const itemStr = localStorage.getItem(localKey);
    if (!itemStr) {
      return '';
    }
    const item = JSON.parse(itemStr);
    const currentDate = new Date();
    if (currentDate.getTime() > item.expiry) {
      localStorage.removeItem(localKey);
      return '';
    }
    return item.localValue;
  };

  useEffect(() => {
    const loadData = {
      barName: value.barName,
    };

    const postURL = `${API_URL}api/updatebar`;
    const loadResp = post(postURL, loadData);
  }, [value.barName]);

  console.log('this is the context inside the Bar component: ', value);
  console.log('this is local: ', getLocalData('barName'));

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
      {
        !value.barName ? (<Redirect to="/" />)
          : (
            <>
              <Nav />
              <BarRoom>
                <Modal text={greeting} />
                <OTSession
                  apiKey={value.key || getLocalData('key')}
                  sessionId={value.sessionId || getLocalData('sessionId')}
                  token={value.token || getLocalData('token')}
                  eventHandlers={sessionEvents}
                  onError={onError}
                >
                  <Publisher />
                  <OTStreams>
                    <Subscriber />
                  </OTStreams>
                </OTSession>
              </BarRoom>
            </>
          )
      }
    </>
  );
};

export default preloadScript(Bar);
