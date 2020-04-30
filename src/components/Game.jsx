/* eslint-disable react/jsx-indent */
/* eslint-disable indent */
/* eslint-disable react/prop-types */
/* eslint-disable no-nested-ternary */
import React from 'react';
import styled from 'styled-components';
import Select from 'react-select';
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

  .select {
    width: 300px;
    color: var(--black);
  }

  .selectGame {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 0;
    * {
      margin: 5px;
    }
  }
`;


const options = [
  { value: 'neverhaveiever', label: 'Never Have I Ever' },
  { value: 'wouldyourather', label: 'Would You Rather' },
];


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
          <Select
            classNamePrefix="selectOption"
            className="select"
            options={options}
            placeholder="Choose Your Game!"
            value=""
            onChange={(value) => changeGame(value)}
          >
            <option value="neverhaveiever">NEVER</option>
          </Select>
        </div>
      ) : (
          ''
        )}
    </GameStyled>
  );

export default Game;
