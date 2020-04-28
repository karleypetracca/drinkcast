import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { Redirect } from 'react-router-dom';
import { post, API_URL } from '../utils/apiConn';
import StateContext from '../context';

import Nav from './Nav';
import Button from './Button';
import Input from './Input';

const FormDiv = styled.div`
  display: flex;
  height: var(--main-height);

`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: var(--sm-container);
  min-height: 350px;
  align-items: center;
  justify-content: center;
  margin: auto;
  
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
`;

const IndexPage = () => {
  const [joinBar, setJoinBar] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');
  const [value, dispatch] = useContext(StateContext);
  const [redirect, setRedirect] = useState(false);
  const [alert, setAlert] = useState(false);

  const submitJoinBar = async (e) => {
    e.preventDefault();

    const setLocalData = (localKey, localValue) => {
      const currentDate = new Date();
      const item = {
        localValue,
        expiry: currentDate.getTime() + 86400000,
      };
      localStorage.setItem(localKey, JSON.stringify(item));
    };

    const data = { joinBar, password };
    const getUrl = `${API_URL}api/joinbar`;
    const response = await post(getUrl, data);
    const opentokInfo = await response.json();

    if (!opentokInfo.hasOwnProperty('error') && joinBar !== '' && password !== '') {
      dispatch({
        type: 'ACTION_JOIN_BAR',
        token: opentokInfo.token,
        sessionId: opentokInfo.sessionId,
        key: opentokInfo.key,
        barName: joinBar,
        userName,
      });
      setLocalData('sessionId', opentokInfo.sessionId);
      setLocalData('token', opentokInfo.token);
      setLocalData('key', opentokInfo.key);
      setLocalData('barName', joinBar);
      setLocalData('userName', userName);

      setAlert(false);
      setJoinBar('');
      setPassword('');

      setRedirect(true);
    }

    setAlert(true);
    // setJoinBar('');
    // setPassword('');
    // setUserName('');
  };

  return (
    <>
      <Nav />
      <FormDiv>
        {redirect && (<Redirect to="./bar" />)}
        <Form onSubmit={(e) => submitJoinBar(e)}>
          <h1>Join</h1>
          {alert ? <div>Incorrect bar name or password.</div> : null}
          <Input
            name="joinBar"
            type="text"
            value={joinBar}
            placeholder="Bar Name"
            onChange={(e) => setJoinBar(e.target.value)}
            isRequired="true"
          />
          <Input
            type="password"
            name="password"
            placeholder="Bar Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            isRequired="true"
          />
          <Input
            name="userName"
            type="text"
            value={userName}
            placeholder="Your Name"
            onChange={(e) => setUserName(e.target.value)}
            isRequired="true"
          />
          <Button url="" type="submit">Join</Button>
        </Form>

      </FormDiv>
    </>
  );
};

export default IndexPage;
