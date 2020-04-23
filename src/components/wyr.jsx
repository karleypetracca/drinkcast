import React from 'react';

function WYR() {
  const fetchQuestion = async () => {
    const question = await fetch('https://www.rrrather.com/botapi');
    console.log(question);
  };

  return (
    <div>
      <p>WOULD YOU RATHER!?!?!?</p>
      <button type='button' onClick={fetchQuestion}>
        button!
      </button>
    </div>
  );
}

export default WYR;
