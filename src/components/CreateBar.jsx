/* eslint-disable no-unused-vars */
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
  const [barName, setBarName] = useState('');
  const [password, setPassword] = useState('');
  const [nameCheck, setNameCheck] = useState('');
  const [passCheck, setPassCheck] = useState('');
  const [redirect, setRedirect] = useState(false);
  const [userName, setUserName] = useState('');

  const [value, dispatch] = useContext(StateContext);

  const submitBarName = async (e) => {
    e.preventDefault();

    const setLocalData = (localKey, localValue) => {
      const currentDate = new Date();
      const item = {
        localValue,
        expiry: currentDate.getTime() + 86400000,
      };
      localStorage.setItem(localKey, JSON.stringify(item));
    };

    const data = { barName, password };
    const postUrl = `${API_URL}api/createbar`;
    const response = await post(postUrl, data);
    const opentokInfo = await response.json();
    setNameCheck(opentokInfo.error);

    console.log(opentokInfo);

    if (
      !opentokInfo.hasOwnProperty('error') &&
      barName !== '' &&
      password !== ''
    ) {
      dispatch({
        type: 'ACTION_CREATE_BAR',
        sessionId: opentokInfo.newSession,
        token: opentokInfo.token,
        key: opentokInfo.key,
        barName,
        userName,
      });

      setLocalData('sessionId', opentokInfo.newSession);
      setLocalData('token', opentokInfo.token);
      setLocalData('key', opentokInfo.key);
      setLocalData('barName', barName);
      setLocalData('userName', userName);

      setRedirect(true);
    }

    setBarName('');
    setPassword('');
    setUserName('');
  };

  return (
    <>
      <Nav />
      <FormDiv>
        {redirect && <Redirect to='./bar' />}
        <Form onSubmit={(e) => submitBarName(e)}>
          <h1>Create New Bar</h1>
          <div>{nameCheck}</div>
          <Input
            name='barName'
            type='text'
            value={barName}
            placeholder='Bar Name'
            onChange={(e) => setBarName(e.target.value)}
            isRequired='true'
          />
          <Input
            type='password'
            name='password'
            value={password}
            placeholder='Bar Password [Optional]'
            onChange={(e) => setPassword(e.target.value)}
            isRequired=''
          />
          <Input
            name='userName'
            type='text'
            value={userName}
            placeholder='Your Name'
            onChange={(e) => setUserName(e.target.value)}
            isRequired='true'
          />
          <Button url='' type='submit'>
            Create
          </Button>
        </Form>
      </FormDiv>
    </>
  );
};

export default IndexPage;
