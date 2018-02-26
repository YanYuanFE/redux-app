import React, { Component } from 'react';
// import Counter from './components/Counter';
import Footer from './components/Footer';
import AddTodo from './containers/AddTodo';
import VisibleTodoList from './containers/VisibleTodoList';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    // const { store } = this.props;

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <div className="todoapp">
          <AddTodo/>
          <VisibleTodoList/>
          <Footer/>
        </div>
      </div>
    );
  }
}

export default App;
