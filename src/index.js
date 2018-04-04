import React from 'react';
import ReactDOM from 'react-dom';
import thunk from './thunk';
import arrThunk from './redux-array';
import logger from './logger';
import { Provider } from './react-redux';
import './index.css';
import App from './App';
import { applyMiddleware, createStore } from './redux';
import registerServiceWorker from './registerServiceWorker';
import reducer from './reducers';
// console.log(reducer);

const store = createStore(reducer, applyMiddleware(logger, thunk, arrThunk));

// const store = createStore(counter, applyMiddleware(thunk, arrThunk));
//
// const render = () => ReactDOM.render(<App store={store}/>, document.getElementById('root'));
//
// render();
//
// store.subscribe(render);

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
