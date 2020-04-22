/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';

import Button from './Button';

const IndexPage = () => {
  const greeting = 'hi';

  return (
    <div>
      <p>{greeting}</p>
      <Button url="#">
        CREATE A BAR
      </Button>
      <Button url="/join">GO TO A BAR</Button>
    </div>
  );
};

export default IndexPage;
