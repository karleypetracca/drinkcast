import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import config from './env';

import './index.css';

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
