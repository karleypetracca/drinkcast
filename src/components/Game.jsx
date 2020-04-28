/* eslint-disable no-nested-ternary */
import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { get, API_URL } from '../utils/apiConn';

//styling

const GameStyled = styled.div`
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: none;
  padding: 10px;

  button {
    margin: 1rem auto;
    background-color: var(--secondary);
    color: var(--white);
    transition: 0.2s ease-in;
    border-radius: 5px;
    border-style: none;
    font-weight: bold;
    padding: 10px;
    cursor: pointer;
  }

  button:hover {
    background-color: var(--white);
    color: var(--secondary);
  }

  .selectGame {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 20px 0;

    * {
      margin: 5px;
    }
  }
`;

//websockets data

const Game = (props) => {
  const [gameStart, setGameStart] = useState(false);
  const [gameSelected, setGameSelected] = useState(''); // "neverhaveiever" or "wouldyourather"
  const [roundText, setRoundText] = useState('');
  const [timer, setTimer] = useState('');
  const [question, setQuestion] = useState('nope');
  // const sessionRef = useRef();

  const startGame = () => {
    setGameStart(!gameStart);
  };

  const changeGame = (e) => {
    setGameSelected(e.target.value);
  };

  const getRoundText = async () => {
    const getUrl = `${API_URL}api/${gameSelected}`;
    const response = await get(getUrl);
    if (gameSelected === 'neverhaveiever') {
      setRoundText(response.statement);
    } else {
      setRoundText(response.question);
    }
  };

  return (
    <GameStyled>
      {timer}
      {question}
      {gameSelected === 'neverhaveiever' ? (
        <h1>Playing: Never Have I Ever</h1>
      ) : (
        ''
      )}
      {gameSelected === 'wouldyourather' ? (
        <h1>Playing: Would You Rather</h1>
      ) : (
        ''
      )}
      {gameStart ? (
        gameSelected !== '' ? (
          <button type='button' onClick={getRoundText}>
            New Round
          </button>
        ) : (
          ''
        )
      ) : (
        <button type='button' onClick={startGame}>
          Start Game
        </button>
      )}
      {roundText !== '' ? <h2>{roundText}</h2> : ''}
      {gameStart ? (
        <div className='selectGame'>
          <p>Use dropdown to change games</p>
          <select defaultValue='' onChange={(e) => changeGame(e)}>
            <option value=''>Please select a game</option>
            <option value='neverhaveiever'>Never Have I Ever</option>
            <option value='wouldyourather'>Would You Rather</option>
          </select>
        </div>
      ) : (
        ''
      )}
    </GameStyled>
  );
};

export default Game;
