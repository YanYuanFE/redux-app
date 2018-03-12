import React, { Component } from 'react';
import { connect } from './react-redux';
import Counter from './components/Counter';
// import Footer from './components/Footer';
// import AddTodo from './containers/AddTodo';
// import VisibleTodoList from './containers/VisibleTodoList';
import logo from './logo.svg';
import './App.css';
// import {setVisibilityFilter, toggleTodo} from "./actions";
// import TodoList from "./components/TodoList";

class App extends Component {
  render() {
    // const { store } = this.props;
    const { onIncrement, onDecrement, counter, incrementAsync, addTwice } = this.props;

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
          addTwice={addTwice}
        />
        {/*<div className="todoapp">*/}
          {/*<AddTodo/>*/}
          {/*<VisibleTodoList/>*/}
          {/*<Footer/>*/}
        {/*</div>*/}
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

function addTwice() {
  return [{ type: 'INCREMENT' }, { type: 'INCREMENT' }]
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
  addTwice,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);



