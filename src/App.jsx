/* eslint-disable react/prop-types */
import React, { useState, useReducer } from 'react';
import { OTSession, OTStreams, preloadScript } from 'opentok-react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { StateProvider } from './context';
import Nav from './components/Nav';
import IndexPage from './components/IndexPage';
import ConnectionStatus from './components/ConnectionStatus';
import Publisher from './components/Publisher';
import Subscriber from './components/Subscriber';
import Reducer from './reducers/Reducer';
import CreateBar from './components/CreateBar';
import JoinBar from './components/JoinBar';
import Modal from './components/Modal';


import './App.css';

function App({ apiKey, sessionId, token }) {
  const initialState = {
    sessionId: 'no session yet',
    token: 'no token yet',
    barName: 'no name yet',
    userName: 'no user name yet',
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
      <Router>
        <Route path="/" component={IndexPage} exact />
        <Route path="/createbar" component={CreateBar} />
        <Route path="/joinbar" component={JoinBar} />
        <Route path="/bar">
          <Nav />
          <Modal text="Hi there Chauncey. Pull up a seat!" />
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
        </Route>
      </Router>
    </StateProvider>

  );
}

export default preloadScript(App);
