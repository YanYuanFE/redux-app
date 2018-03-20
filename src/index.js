import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from './react-redux';
import { createStore } from './redux';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import counter from './reducers';

const store = createStore(counter);

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
