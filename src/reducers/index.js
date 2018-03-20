import { combineReducers } from '../redux';
import todos from './todos';
import visibilityFilter from './visibilityFilter';

const todoApp = combineReducers({
  todos,
  visibilityFilter
});

export default todoApp;

// export default (state = 0, action) => {
//   console.log(state, action);
//   switch (action.type) {
//     case 'INCREMENT':
//       return state + 1
//     case 'DECREMENT':
//       return state - 1
//     default:
//       return state
//   }
// }
