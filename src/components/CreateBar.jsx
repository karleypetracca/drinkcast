import React, { useState } from 'react';
import { post } from '../utils/apiConn';

const API_URL = 'http://localhost:5000/';

const IndexPage = () => {
  const [barName, setBarName] = useState('');
  const [password, setPassword] = useState('');

  const submitBarName = (e) => {
    e.preventDefault();
    const data = { barName, password };
    const postUrl = `${API_URL}api/createbar`;
    post(postUrl, data);
  };

  return (
    <div>
      <form onSubmit={submitBarName}>
        <input
          name="barName"
          value={barName}
          placeholder="Enter a New Bar Name"
          onChange={(e) => setBarName(e.target.value)}
        />
        <input
          name="password"
          value={password}
          placeholder="Enter a New Bar Name"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Create New Bar</button>
      </form>
    </div>
  );
};

export default IndexPage;
