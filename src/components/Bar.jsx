/* eslint-disable react/prop-types */
import React, { useState, useContext, useEffect, useRef } from 'react';
import { OTSession, OTStreams, preloadScript } from 'opentok-react';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import Publisher from './Publisher';
import Subscriber from './Subscriber';
import StateContext from '../context';
import Game from './Game';

import Nav from './Nav';
import Modal from './Modal';
import { post, API_URL } from '../utils/apiConn';


const BarRoom = styled.div`
  display: flex;
  flex-direction: column;
  height: var(--main-height);
  text-align: center;
  
`;

const Display = styled.div`
  display: flex;
  flex-wrap: wrap;
  height: auto;
  
  @media screen and (max-width: 600px) {
    flex-direction: column;
  }
`;

const GameDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  margin: auto;
  width: 50%;
  
  @media screen and (max-width: 600px) {
    width: 100%;
  }
`;


const Bar = ({ match }) => {
  const [value, dispatch] = useContext(StateContext);
  const [error, setError] = useState(false);
  const [connected, setConnected] = useState(false);
  const sessionRef = useRef();

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
  
  // this passes the barName to the backend to set the last access time
  // of a particular bar.
  useEffect(() => {
    const loadData = {
      barName: value.barName,
    };

    const postURL = `${API_URL}api/updatebar`;
    const loadResp = post(postURL, loadData);
  }, [value.barName]);

  // console.log('this is the context inside the Bar component: ', value);
  console.log('this is the context inside the Bar component: ', value);
  console.log('this is local: ', getLocalData('barName'));

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
      {
        !value.barName ? (<Redirect to="/" />)
          : (
            <>
              <Nav />
              <BarRoom>
                <div className="bar">
                  <h1>{value.barName}</h1>
                </div>
                <Modal text={greeting} />
                <OTSession
                  ref={sessionRef}
                  apiKey={value.key || getLocalData('key')}
                  sessionId={value.sessionId || getLocalData('sessionId')}
                  token={value.token || getLocalData('token')}
                  eventHandlers={sessionEvents}
                  onError={onError}
                >
                  <Display>
                    <Publisher />
                    <GameDiv>
                      <OTStreams>
                        <Subscriber />
                      </OTStreams>
                      <Game />
                    </GameDiv>
                  </Display>
                </OTSession>
              </BarRoom>
            </>
          )
      }
    </>
  );
};

export default preloadScript(Bar);
