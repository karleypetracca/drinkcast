import React, { useState } from 'react';
import styled from 'styled-components';
import { post } from '../utils/apiConn';
import Button from './Button';

const API_URL = 'http://localhost:5000/';


const FormDiv = styled.div`
  display: flex;
  background-color: var(--yellow);
  height: 100vh;
`;

const Form = styled.div`
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

  const submitJoinBar = (e) => {
    e.preventDefault();
    const data = { joinBar, password };
    const postUrl = `${API_URL}api/joinbar`;
    post(postUrl, data);
  };


  return (
    <FormDiv>
      <Form onSubmit={submitJoinBar}>
        <h1>DRINKCAST</h1>
        <input
          name="joinBar"
          value={joinBar}
          placeholder="Enter a Bar to Join"
          onChange={(e) => setJoinBar(e.target.value)}
        />
        <input
          type="password"
          name="password"
          value={password}
          placeholder="Enter the password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button url="/bar">Join a Bar</Button>
      </Form>
    </FormDiv>
  );
};

export default IndexPage;
