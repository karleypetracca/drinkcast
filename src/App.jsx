/* eslint-disable react/prop-types */
import React, { useReducer } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import styled from 'styled-components';
import { StateProvider } from './context';
import IndexPage from './components/IndexPage';
import Reducer from './reducers/Reducer';
import CreateBar from './components/CreateBar';
import JoinBar from './components/JoinBar';
import Bar from './components/Bar';
import Game from './components/Game';
import Understood from './components/Understood';
import wood from './images/wood.jpg';

const AppMain = styled.div`
  background: url(${wood}) repeat top left fixed;
  background-size: cover;
`;

const App = () => {
  const getLocalData = (localKey) => {
    const itemStr = localStorage.getItem(localKey);
    if (!itemStr) {
      return '';
    }
    const item = JSON.parse(itemStr);
    const currentDate = new Date();
    if (currentDate.getTime() > item.expiry) {
      localStorage.removeItem(localKey);
      return '';
    }
    return item.localValue;
  };

  const initialState = {
    sessionId: getLocalData('sessionId'),
    token: getLocalData('token'),
    key: getLocalData('key'),
    barName: getLocalData('barName'),
    userName: getLocalData('userName'),
  };

  return (
    <StateProvider value={useReducer(Reducer, initialState)}>
      <AppMain>
        <Router>
          <Route path='/' component={IndexPage} exact />
          <Route path='/createbar' component={CreateBar} />
          <Route path='/joinbar' component={JoinBar} />
          <Route path='/bar' component={Bar} />
          <Route path='/game' component={Game} />
          <Route path='/understood' component={Understood} />
        </Router>
      </AppMain>
    </StateProvider>
  );
};

export default App;
