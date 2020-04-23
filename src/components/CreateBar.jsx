import React, { useState } from 'react';
import styled from 'styled-components';
import { post, API_URL } from '../utils/apiConn';

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

  button {
    font-family: inherit;
  }
`;

const IndexPage = () => {
  const [barName, setBarName] = useState('');
  const [password, setPassword] = useState('');
  const [nameCheck, setNameCheck] = useState('');

  const submitBarName = async (e) => {
    e.preventDefault();
    const data = { barName, password };
    const postUrl = `${API_URL}api/createbar`;
    const response = await post(postUrl, data);
    const opentokInfo = await response.json();
    setNameCheck(opentokInfo.nameIsInConflict);
    setPassword('');
  };

  return (
    <FormDiv>
      <Form onSubmit={(e) => submitBarName(e)}>
        <h1>DRINKCAST</h1>
        {nameCheck}
        <input
          name='barName'
          type='text'
          value={barName}
          placeholder='Enter a New Bar Name'
          onChange={(e) => setBarName(e.target.value)}
        />
        <input
          type='password'
          name='password'
          value={password}
          placeholder='Enter a Passwrod'
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type='submit'>Create New Bar</button>
      </Form>
    </FormDiv>
  );
};

export default IndexPage;
