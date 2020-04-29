/* eslint-disable react/jsx-indent */
/* eslint-disable indent */
/* eslint-disable react/prop-types */
/* eslint-disable no-nested-ternary */
import React from 'react';
import styled from 'styled-components';

import Button from './Button';

const GameStyled = styled.div`
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: none;
  padding: 10px;
  
  p {
    font-size: 20px;
  }

  select, option {
    font-size: inherit;
    padding: 5px;
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
        <h2>Playing: Would You Rather</h2>
      ) : (
          ''
        )}
      {gameStart ? (
        gameSelected !== '' ? (
          <Button url="" type="button" action={getRoundText} className="">
            New Round
          </Button>
        ) : (
            ''
          )
      ) : (
          <Button url="" type="button" action={startGame} className="">
            Start Game
          </Button>
        )}
      {roundText !== '' ? <h2>{roundText}</h2> : ''}
      {gameStart ? (
        <div className="selectGame">
          <p>Use dropdown to change games</p>
          <select defaultValue="" onChange={(e) => changeGame(e)}>
            <option value="">Please select a game</option>
            <option value="neverhaveiever">Never Have I Ever</option>
            <option value="wouldyourather">Would You Rather</option>
          </select>
        </div>
      ) : (
          ''
        )}
    </GameStyled>
  );

export default Game;
