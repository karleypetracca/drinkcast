import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { Redirect } from 'react-router-dom';
import { post, API_URL } from '../utils/apiConn';
import StateContext from '../context';

import Button from './Button';

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
  height: 350px;
  align-items: center;
  justify-content: center;
  margin: auto;
  border-radius: 3px;
  
  div {
    display: inherit;
    text-align: center;
    
  }

  h1 {
    display: inherit;
    flex-direction: inherit;
    align-self: flex-start;
    margin: 18px auto 38px auto;
  }

  input {
    border: none;
    font-family: inherit;
    padding: 10px;
    border-radius: 2px;
    margin: 7px auto;
    text-align: center;
  }
`;

const IndexPage = () => {
  const [joinBar, setJoinBar] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');
  const [value, dispatch] = useContext(StateContext);
  const [redirect, setRedirect] = useState(false);
  const [alert, setAlert] = useState(false);

  // console.log(value);
  const submitJoinBar = async (e) => {
    e.preventDefault();
    const data = { joinBar, password };
    const getUrl = `${API_URL}api/joinbar`;
    const response = await post(getUrl, data);
    const opentokInfo = await response.json();

    // console.log('session', opentokInfo);
    if (!opentokInfo.hasOwnProperty('error') && joinBar !== '' && password !== '') {
      dispatch({
        type: 'ACTION_JOIN_BAR',
        token: opentokInfo.token,
        sessionId: opentokInfo.sessionId,
        key: opentokInfo.key,
        barName: joinBar,
        userName,
      });
      setAlert(false);
      setJoinBar('');
      setPassword('');
      setRedirect(true);
    }


    setAlert(true);
    setJoinBar('');
    setPassword('');
    setUserName('');
  };

  return (
    <FormDiv>
      {redirect && (<Redirect to="./bar" />)}
      <Form onSubmit={(e) => submitJoinBar(e)}>
        <h1>DRINKCAST</h1>
        {alert ? <div>Incorrect bar name or password.</div> : null}
        <input
          name="joinBar"
          type="text"
          value={joinBar}
          placeholder="Enter a Bar to Join"
          onChange={(e) => setJoinBar(e.target.value)}
        />
        <input
          name="userName"
          type="text"
          value={userName}
          placeholder="Enter your name"
          onChange={(e) => setUserName(e.target.value)}
        />
        <input
          type="password"
          name="password"
          placeholder="Enter a password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button url="" type="submit">Join a Bar</Button>
      </Form>

    </FormDiv>
  );
};

export default IndexPage;
