import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { Redirect } from 'react-router-dom';
import { post, API_URL } from '../utils/apiConn';
import Button from './Button';
import StateContext from '../context';


const FormDiv = styled.div`
  display: flex;
  background-color: var(--yellow);
  height: 100vh;
`;

const Form = styled.form`
  border: 2px solid var(--tertiary);
  display: flex;
  flex-direction: column;
  background-color: var(--primary);
  width: 230px;
  height: 350px;;
  align-items: center;
  justify-content: center;
  margin: auto;
  border-radius: 3px;
  
  h1 {
    display: inherit;
    flex-direction: inherit;
    align-self: flex-start;
    margin: 18px auto 38px auto ;
  }
  
  
  input {
    border: none;
    font-family: inherit;
    padding: 10px;
    border-radius: 2px;
    margin: 7px auto;
    text-align: center;
  }
  
  button {
    font-family: inherit;
  }
`;

const IndexPage = () => {
  const [joinBar, setJoinBar] = useState('');
  const [password, setPassword] = useState('');
  const [value, dispatch] = useContext(StateContext);
  const [redirect, setRedirect] = useState(false); // this is experimental with
  // tring to redirect onSubmit.

  console.log(value);
  const submitJoinBar = async (e) => {
    e.preventDefault();
    const data = { joinBar, password };
    const getUrl = `${API_URL}api/joinbar`;
    const response = await post(getUrl, data);
    const opentokInfo = await response.json();
    console.log(opentokInfo);

    dispatch({
      type: 'ACTION_JOIN_BAR',
      token: opentokInfo.token,
      sessionId: opentokInfo.sessionId,
    });

    setJoinBar('');
    setPassword('');
    setRedirect(true);
  };


  return (
    <FormDiv>
      {/* {redirect && (<Redirect to="./bar" />)} */}
      <Form onSubmit={(e) => submitJoinBar(e)}>
        <h1>DRINKCAST</h1>
        <input
          name="joinBar"
          type="text"
          value={joinBar}
          placeholder="Enter a Bar to Join"
          onChange={(e) => setJoinBar(e.target.value)}
        />
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Join a Bar</button>
      </Form>

    </FormDiv>
  );
};

export default IndexPage;
