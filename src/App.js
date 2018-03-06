import React, { Component } from 'react';
import { connect } from './react-redux';
import Counter from './components/Counter';
// import Footer from './components/Footer';
// import AddTodo from './containers/AddTodo';
// import VisibleTodoList from './containers/VisibleTodoList';
import logo from './logo.svg';
import './App.css';
import {setVisibilityFilter, toggleTodo} from "./actions";
import TodoList from "./components/TodoList";

class App extends Component {
  render() {
    // const { store } = this.props;
    const { onIncrement, onDecrement, counter } = this.props;

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

function onDecrement() {
  return { type: 'DECREMENT' }
}

const mapDispatchToProps = {
  onIncrement,
  onDecrement
};

export default connect(mapStateToProps, mapDispatchToProps)(App);



