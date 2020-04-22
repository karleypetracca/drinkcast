import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import config from './env';

ReactDOM.render(
  <React.StrictMode>
    <App
      apiKey={config.API_KEY}
      sessionId={config.SESSION_ID}
      token={config.TOKEN}
    />
  </React.StrictMode>,
  document.getElementById('root'),
);

serviceWorker.unregister();
