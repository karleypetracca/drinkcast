import React, { useState } from 'react';
import { post, API_URL } from '../utils/apiConn';

const IndexPage = () => {
  const [barName, setBarName] = useState('');
  const [password, setPassword] = useState('');

  const submitBarName = async (e) => {
    e.preventDefault();
    const data = { barName, password };
    const postUrl = `${API_URL}api/createbar`;
    const response = await post(postUrl, data);
    console.log(response);
    setBarName('');
    setPassword('');
  };

  return (
    <div>
      <form onSubmit={submitBarName}>
        <input
          name="barName"
          type="text"
          value={barName}
          placeholder="Enter a New Bar Name"
          onChange={(e) => setBarName(e.target.value)}
        />
        <input
          name="password"
          type="password"
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
