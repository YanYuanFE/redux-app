import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from './react-redux';
import './index.css';
import App from './App';
import { createStore } from './redux';
import registerServiceWorker from './registerServiceWorker';
// import reducer from './reducers';
import counter from './reducers';

// const store = createStore(reducer);

const store = createStore(counter);
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
