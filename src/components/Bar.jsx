/* eslint-disable react/prop-types */
import React, {
  useState, useContext, useEffect, useRef,
} from 'react';
import { OTSession, OTStreams, preloadScript } from 'opentok-react';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
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
  height: calc(100vh - var(--nav-height));
  text-align: center;
`;

const Display = styled.div`
  display: flex;
  flex-wrap: wrap;
  height: auto;
  flex-direction: row;

  @media screen and (max-width: 600px) {
    flex-direction: column;
  }
`;

const VideoBox = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
`;

const TitleBar = styled.div`
  padding-top: 40px;
`;

const GameDiv = styled.div`
  display: flex;
  /* flex-direction: column; */
  align-content: center;
  justify-content: center;
  margin: auto;
  width: 50%;

  @media screen and (max-width: 600px) {
    width: 100%;
  }
`;

const Bar = () => {
  const [value] = useContext(StateContext);
  // const [connected, setConnected] = useState(false);
  const sessionRef = useRef();
  // eslint-disable-next-line no-unused-vars
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

  useEffect(() => {
    const loadData = {
      barName: value.barName,
    };

    const postURL = `${API_URL}api/updatebar`;
    // eslint-disable-next-line no-unused-vars
    const loadResp = post(postURL, loadData);
  }, [value.barName]);

  const signalStartGame = (signal) => {
    console.log(signal, "Hello");
  };

  const signalChangeGame = (signal) => {
    setGameSelected(signal.data);
  };

  const signalSetRoundText = (signal) => {
    setRoundText(signal.data);
  };

  const signalSetName = (signal) => {
    setUserName(signal.data);
  };

  const sessionEvents = {
    'signal:startGame': (event) => signalStartGame(event),
    'signal:changeGame': (event) => signalChangeGame(event),
    'signal:setRoundText': (event) => signalSetRoundText(event),
    'singal:setName': (event) => signalSetName(event),
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

  const setUserName = () => {
    sendSignal('setName', console.log('Hello!'));
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
        <Redirect to="/" />
      ) : (
          // eslint-disable-next-line react/jsx-indent
          <>
            <Nav />
            <BarRoom>
              <TitleBar>
                <h1>{value.barName}</h1>
              </TitleBar>
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
                  <VideoBox>
                    <Publisher />
                    <OTStreams>
                      <Subscriber />
                    </OTStreams>
                  </VideoBox>
                  <GameDiv>
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
          // eslint-disable-next-line indent
        )}
    </>
  );
};

export default preloadScript(Bar);
