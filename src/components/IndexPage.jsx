/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';


const IndexPage = () => {
  const greeting = 'hi';

  return (
    <div>
      <p>{greeting}</p>
      <div>
        <a type="button" href="#">CREATE A BAR</a>
      </div>
      <div>
        <a type="button" href="/join">GO TO A BAR</a>
      </div>

    </div>
  );
};

export default IndexPage;
