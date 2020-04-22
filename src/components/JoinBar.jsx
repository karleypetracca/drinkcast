import React, { useState } from 'react';
import { post } from '../utils/apiConn';

const API_URL = 'http://localhost:5000/';

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
    <div>
      <form onSubmit={submitJoinBar}>
        <input
          name="joinBar"
          value={joinBar}
          placeholder="Enter a Bar to Join"
          onChange={(e) => setJoinBar(e.target.value)}
        />
        <input
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

export default IndexPage;
