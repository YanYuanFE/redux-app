const thunk = ({dispatch, getState}) => next => action => {
  // 如果是函数，执行一下
  if (typeof action === 'function') {
    return action(dispatch, getState);
  }
  return next(action)
}

export default thunk;
