import React, { Component } from 'react';
import { connect } from './react-redux';
import Counter from './components/Counter';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    const { onIncrement, onDecrement, counter, incrementAsync } = this.props;
    console.log('render');

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <Counter
          value={counter}
          onIncrement={onIncrement}
          onDecrement={onDecrement}
          incrementAsync={incrementAsync}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  counter: state
});

function onIncrement() {
  return { type: 'INCREMENT' }
}

function onDecrement() {
  return { type: 'DECREMENT' }
}

function incrementAsync() {
  return (dispatch, getState) => {
    setTimeout(() => {
      dispatch(onIncrement());
    }, 2000)
  }
}

const mapDispatchToProps = {
  onIncrement,
  onDecrement,
  incrementAsync,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
