import React, { useState } from 'react';
import { post } from '../utils/apiConn';

const API_URL = 'http://localhost:5000/';

const BarForm = () => {
  const [barName, setBarName] = useState('');
  const [joinBar, setJoinBar] = useState('');
  const [password, setPassword] = useState('');

  const submitBarName = (e) => {
    e.preventDefault();
    const data = { barName, password };
    const postUrl = `${API_URL}/api/createbar`;
    post(postUrl, data);
  };

  const submitJoinBar = (e) => {
    e.preventDefault();
    const data = { barName, password };
    const postUrl = `${API_URL}/api/joinbar`;
    post(postUrl, data);
  };

  return (
    <div>
      <form onSubmit={submitBarName}>
        <imput
          name="barName"
          value={barName}
          placeholder="Enter a New Bar Name"
          onChange={(e) => setBarName(e.target.value)}
        />
        <imput
          name="password"
          value={password}
          placeholder="Enter a New Bar Name"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Create New Bar</button>
      </form>
      <form onSubmit={submitJoinBar}>
        <imput
          name="joinBar"
          value={joinBar}
          placeholder="Enter a Bar to Join"
          onChange={(e) => setJoinBar(e.target.value)}
        />
        <imput
          name="password"
          value={password}
          placeholder="Enter a Bar to Join"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Join a Bar</button>
      </form>
    </div>
  );
};

export default BarForm;
