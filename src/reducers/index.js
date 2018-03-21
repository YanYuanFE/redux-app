import { combineReducers } from '../redux';
// import todos from './todos';
// import visibilityFilter from './visibilityFilter';

const count = (state = 0, action) => {
  console.log(state, action);
  switch (action.type) {
    case 'INCREMENT':
      return state + 1
    case 'DECREMENT':
      return state - 1
    default:
      return state
  }
}

const todos = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        {
          id: action.id,
          text: action.text,
          completed: false
        }
      ]
    case 'TOGGLE_TODO':
      return state.map(todo =>
        (todo.id === action.id)
          ? {...todo, completed: !todo.completed}
          : todo
      )
    default:
      return state
  }
}

const todoApp = combineReducers({
  todos,
  count
});

export default todoApp;
