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
  justify-content: space-evenly;
  background-color: none;
  padding: 10px;
  
  h1 {
    margin: 5%;
  }

  h2 {
    margin: 2.5%;
  }

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
    margin: ${(props) => (props.roundText ? '2.5%' : '5%')};
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.5), 0 6px 20px 0 rgba(0,0,0,0.49);
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
    <GameStyled roundText={roundText}>
      {gameSelected === 'neverhaveiever' ? (
        <h1>Never Have I Ever</h1>
      ) : (
          ''
        )}
      {gameSelected === 'wouldyourather' ? (
        <h1>Would You Rather</h1>
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
