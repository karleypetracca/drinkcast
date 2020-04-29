/* eslint-disable react/prop-types */
/* eslint-disable no-nested-ternary */
import React from 'react';
import styled from 'styled-components';

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

const Game = ({
  gameStart,
  gameSelected,
  roundText,
  getRoundText,
  startGame,
  changeGame,
}) => (
  <GameStyled>
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

export default Game;
