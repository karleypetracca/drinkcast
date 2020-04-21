/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { OTSession, OTStreams, preloadScript } from 'opentok-react';
import ConnectionStatus from './components/ConnectionStatus';
import Publisher from './components/Publisher';
import Subscriber from './components/Subscriber';


function App({ apiKey, sessionId, token }) {
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
    <div className="App">
      <header className="App-header">
        drinkcast
      </header>
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
    </div>
  );
}

export default preloadScript(App);
