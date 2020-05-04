/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/prop-types */
import React, {
  useState, useContext, useEffect, useRef,
} from 'react';
import { OTSession, OTStreams, preloadScript } from 'opentok-react';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUnlockAlt,
} from '@fortawesome/free-solid-svg-icons';
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
  min-height: var(--main-height);
  text-align: center;

  h1 {
    margin: 10px auto;
  }
  
  .passwordShow {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .unlock {
    display: ${(props) => (props.seePassword ? 'none' : 'block')};
  }
  
  .password {
    display: ${(props) => (props.seePassword ? 'block' : 'none')};
  }
  
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

const VideoBoxStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50%;
  min-height: 70vh;

  @media screen and (max-width: 600px) {
    width: 100%;
  }
`;

const SubscribersBoxStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  > div {
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-wrap: wrap;
  }
`;

const GameStyled = styled.div`
  display: flex;
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
  const sessionRef = useRef();
  const [gameStart, setGameStart] = useState(false);
  const [gameSelected, setGameSelected] = useState(null); // "neverhaveiever" or "wouldyourather"
  const [roundText, setRoundText] = useState('');
  const [password, setPassword] = useState(localStorage.getItem('password'));
  const [seePassword, setSeePassword] = useState(false);

  const seePasswordToggle = () => {
    setSeePassword(!seePassword);
  };

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

  const sessionEvents = {
    'signal:startGame': (event) => setGameStart(event.data),
    'signal:changeGame': (event) => setGameSelected(event.data),
    'signal:setRoundText': (event) => setRoundText(event.data),
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
        }
      },
    );
  };

  const startGame = () => {
    sendSignal('startGame', `${!gameStart}`);
  };

  const changeGame = (game) => {
    sendSignal('changeGame', `${game.value}`);
    sendSignal('setRoundText', '');
  };

  const getRoundText = async () => {
    const getUrl = `${API_URL}api/${gameSelected}`;
    const response = await get(getUrl);
    if (gameSelected === 'neverhaveiever') {
      sendSignal('setRoundText', `${response.statement}`);
    } else {
      sendSignal('setRoundText', `${response.question}`);
    }
  };

  const onError = (err) => {
    // eslint-disable-next-line no-console
    console.log(`Failed to connect: ${err.message}`);
  };

  const greeting = (
    <>
      <p>
        Welcome to
        {' '}
        {value.barName}
        !
      </p>
      <p>
        Pull up a seat
        {' '}
        {value.userName}
        !
      </p>
    </>
  );
  console.log(localStorage.getItem('password'));
  return (
    <>
      {
        !value.barName
          ? <Redirect to="/" />
          : (
            <>
              <Nav />
              <BarRoom seePassword={seePassword}>
                <h1>
                  {value.barName}
                  {' '}
                  {password ? (
                    <div className="passwordShow">
                      <FontAwesomeIcon icon={faUnlockAlt} className="unlock" onClick={seePasswordToggle} />
                      <p className="password" onClick={seePasswordToggle}>
                        password:
                        {' '}
                        {password}
                      </p>
                    </div>
                  ) : ''}
                </h1>
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
                    <VideoBoxStyled>
                      <Publisher />
                      <SubscribersBoxStyled>
                        <OTStreams>
                          <Subscriber />
                        </OTStreams>
                      </SubscribersBoxStyled>
                    </VideoBoxStyled>
                    <GameStyled>
                      <Game
                        gameStart={gameStart}
                        gameSelected={gameSelected}
                        roundText={roundText}
                        getRoundText={getRoundText}
                        startGame={startGame}
                        changeGame={changeGame}
                      />
                    </GameStyled>
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
