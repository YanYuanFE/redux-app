import React from 'react';
import ReactDOM from 'react-dom';
import thunk from './thunk';
import arrThunk from './redux-array';
import { Provider } from './react-redux';
import { createStore, applyMiddleware } from './redux';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import counter from './reducers';

const store = createStore(counter, applyMiddleware(thunk, arrThunk));

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
