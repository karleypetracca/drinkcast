/* eslint-disable react/prop-types */
import React, { useState, useReducer } from 'react';
import { OTSession, OTStreams, preloadScript } from 'opentok-react';
import { StateProvider } from './context';
import ConnectionStatus from './components/ConnectionStatus';
import Publisher from './components/Publisher';
import Subscriber from './components/Subscriber';
import Reducer from './reducers/Reducer';

import './App.css';

function App({ apiKey, sessionId, token }) {
  const initialState = {
    example: 'Hi there, welcome to DrinkCast!',
  };

  const [error, setError] = useState(null);
  const [connected, setConnected] = useState(false);
  const sessionEvents = {
    sessionConnected: () => setConnected(true),
    sessionDisconnected: () => setConnected(false),
  };

  const onError = (err) => {
    setError(`Failed to connect: ${err.message}`);
  };

  return (
    <StateProvider value={useReducer(Reducer, initialState)}>
      <nav>
        <h1>drinkcast</h1>
      </nav>
      <main>
        <OTSession
          apiKey={apiKey}
          sessionId={sessionId}
          token={token}
          eventHandlers={sessionEvents}
          onError={onError}
        >
          {error ? <div>error</div> : null}
          <ConnectionStatus connected={connected} />
          <Publisher />
          <OTStreams>
            <Subscriber />
          </OTStreams>
        </OTSession>
      </main>
    </StateProvider>

  );
}

export default preloadScript(App);
