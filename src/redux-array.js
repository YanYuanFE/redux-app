const arrayThunk = ({dispatch, getState}) => next => action => {
  if (Array.isArray(action)) {
    action.forEach(v => dispatch(v))
  }
  console.log(next);
  console.log(dispatch);
  return next(action)
}

export default arrayThunk;

