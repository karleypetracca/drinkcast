import React, { useState } from 'react';
import styled from 'styled-components';
import { post, API_URL } from '../utils/apiConn';
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

  const submitJoinBar = async (e) => {
    e.preventDefault();
    const data = { joinBar, password };
    const getUrl = `${API_URL}api/joinbar`;
    const response = await post(getUrl, data);
    const opentokInfo = await response.json();
    console.log(opentokInfo);
    setJoinBar('');
    setPassword('');
  };


  return (
    <FormDiv>
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
