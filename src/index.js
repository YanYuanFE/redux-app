import React from 'react';
import ReactDOM from 'react-dom';
import thunk from './thunk';
import { Provider } from './react-redux';
import { createStore, applyMiddleware } from './redux';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import counter from './reducers';

const store = createStore(counter, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
