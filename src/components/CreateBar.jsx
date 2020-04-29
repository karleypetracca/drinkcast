/* eslint-disable no-unused-vars */
import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { Redirect } from 'react-router-dom';
import { post, API_URL } from '../utils/apiConn';
import StateContext from '../context';
import RandomBarGen from '../utils/RandomBarGen';
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
  const [passwordCheck, setPasswordCheck] = useState('');
  const [redirect, setRedirect] = useState(false);
  const [userName, setUserName] = useState('');
  const [barNamePlaceholder, setBarNamePlaceholder] = useState('Bar Name');
  const [passwordPlaceholder, setPasswordPlaceholder] = useState('Bar Password');

  const [value, dispatch] = useContext(StateContext);

  const randomNameHandler = async (e) => {
    e.preventDefault();
    const name = await RandomBarGen();
    const randomName = `The ${name.join(' ')}`;
    return setBarName(randomName);
  };

  const submitBarName = async (e) => {
    e.preventDefault();

    // creates random bar name.
    // const name = await RandomBarGen();
    // const randomName = `The ${name.join(' ')}`;

    // checks to see if a bar name was entered and substitutes
    // a random name if barName is an empty string.
    // const barNameToSubmit = !barName.length ? randomName : barName;

    if (!barName.length) {
      setBarNamePlaceholder('A Bar Name is Requied');
      setNameCheck('');
    }
    if (!password.length) {
      setPasswordPlaceholder('A Password is Requied');
      setPasswordCheck('');
    }
    if (password.length && barName.length) {
      if (barNamePlaceholder !== 'Bar Name' || passwordPlaceholder !== 'Bar Password') {
        setBarNamePlaceholder('Bar Name');
        setPasswordPlaceholder('Bar Password');
      }
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
      if (opentokInfo.error.includes('name')) {
        setNameCheck(opentokInfo.error);
        setPasswordCheck('');
        setBarName('');
      }
      if (opentokInfo.error.includes('password')) {
        setPasswordCheck(opentokInfo.error);
        setNameCheck('');
        setPassword('');
      }
      // eslint-disable-next-line no-prototype-builtins
      if (!opentokInfo.hasOwnProperty('error')) {
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
        setLocalData('barName');
        setLocalData('userName', userName);

        setRedirect(true);
      }
    }
  };

  return (
    <>
      <Nav />
      <FormDiv>
        {redirect && <Redirect to="./bar" />}
        <Form onSubmit={(e) => submitBarName(e)}>
          <h1>Create New Bar</h1>
          <div>{nameCheck}</div>
          <Input
            name="barName"
            type="text"
            value={barName}
            placeholder={barNamePlaceholder}
            onChange={(e) => setBarName(e.target.value)}
            isRequired="true"
          />
          <div>{passwordCheck}</div>
          <Input
            type="password"
            name="password"
            value={password}
            placeholder={passwordPlaceholder}
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
          <Button url="" type="submit">Create</Button>
          <Button url="" type="button" action={(e) => randomNameHandler(e)}>Get Random Bar Name</Button>
        </Form>
      </FormDiv>
    </>
  );
};

export default IndexPage;
