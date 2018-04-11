const thunk = ({dispatch, getState}) => next => action => {
  // 如果是函数，执行一下
  if (typeof action === 'function') {
    return action(dispatch, getState);
  }
  console.log(next);
  console.log(dispatch);
  return next(action);
  // typeof action === 'function' ? action(dispatch, getState) : next(action)
}

export default thunk;
