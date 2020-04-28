/* eslint-disable react/prop-types */
import React, { useState, useContext, useEffect, useRef } from 'react';
import { OTSession, OTStreams, preloadScript } from 'opentok-react';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import Countdown from 'react-countdown';
import Publisher from './Publisher';
import Subscriber from './Subscriber';
import StateContext from '../context';
import Game from './Game';
import Nav from './Nav';
import Modal from './Modal';
import { get, post, API_URL } from '../utils/apiConn';

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
  // const [connected, setConnected] = useState(false);
  const sessionRef = useRef();
  const [gameStart, setGameStart] = useState(false);
  const [gameSelected, setGameSelected] = useState(''); // "neverhaveiever" or "wouldyourather"
  const [roundText, setRoundText] = useState('');

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
    sessionRef.current.sessionHelper.session.on('signal:msg', (event) => {
      console.log('Signal sent from connection ' + event.from.id);
      console.log(event.data);
    });

    const loadData = {
      barName: value.barName,
    };

    const postURL = `${API_URL}api/updatebar`;
    // eslint-disable-next-line no-unused-vars
    const loadResp = post(postURL, loadData);
  }, [value.barName]);

  // console.log('this is the context inside the Bar component: ', value);
  console.log('this is the context inside the Bar component: ', value);
  console.log('this is local: ', getLocalData('barName'));

  const signalStartGame = (signal) => {
    console.log(signal);
    setGameStart(signal.data);
  };

  const signalChangeGame = (signal) => {
    console.log(signal);
    setGameSelected(signal.data);
  };

  const signalSetRoundText = (signal) => {
    console.log(signal);
    setRoundText(signal.data);
  };

  const sessionEvents = {
    // sessionConnected: () => setConnected(true),
    // sessionDisconnected: () => setConnected(false),
    'signal:startGame': (event) => signalStartGame(event),
    'signal:changeGame': (event) => signalChangeGame(event),
    'signal:setRoundText': (event) => signalSetRoundText(event),
  };

  const sendSignal = (type, data) => {
    sessionRef.current.sessionHelper.session.signal(
      {
        type,
        data,
      },
      (err) => {
        if (err) {
          // eslint-disable-next-line no-console
          console.log('signal error: ', err.message);
        } else {
          // eslint-disable-next-line no-console
          console.log('signal sent');
        }
      },
    );
  };

  const startGame = () => {
    sendSignal('startGame', !gameStart);
  };

  const changeGame = (e) => {
    sendSignal('changeGame', e.target.value);
  };

  const getRoundText = async () => {
    const getUrl = `${API_URL}api/${gameSelected}`;
    const response = await get(getUrl);
    if (gameSelected === 'neverhaveiever') {
      sendSignal('setRoundText', response.statement);
    } else {
      sendSignal('setRoundText', response.question);
    }
  };

  const onError = (err) => {
    // eslint-disable-next-line no-console
    console.log(`Failed to connect: ${err.message}`);
  };

  const greeting = `Welcome to ${value.barName}! Pull up a seat ${value.userName}!`;

  return (
    <>
      {!value.barName ? (
        <Redirect to='/' />
      ) : (
        <>
          <Nav />
          <BarRoom>
            <div className='bar'>
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
                  <Game
                    gameStart={gameStart}
                    gameSelected={gameSelected}
                    roundText={roundText}
                    getRoundText={getRoundText}
                    startGame={startGame}
                    changeGame={changeGame}
                  />
                </GameDiv>
              </Display>
            </OTSession>
          </BarRoom>
        </>
      )}
    </>
  );
};

export default preloadScript(Bar);
