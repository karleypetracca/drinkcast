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

const RoundText = styled.div`
  margin-top: 100px;
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
      {gameSelected === null ? (
        ''
      ) : (
          // eslint-disable-next-line react/jsx-one-expression-per-line
          <h1>Playing: {gameSelected} </h1>
        )}

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
      {gameStart ? (
        gameSelected !== null ? (
          <Button url="" type="button" action={getRoundText} className="">
            New Round
          </Button>
        ) : (
            ''
          )
      ) : (
          <Button url="" inputProps={{ readOnly: true }} type="button" action={startGame} className="">
            Start Game
          </Button>
        )}
      <RoundText>
        {roundText !== '' ? <h2>{roundText}</h2> : ''}
      </RoundText>
    </GameStyled>
  );

export default Game;
