export function createStore(reducer, enhancer) {
  if (enhancer) {
    return enhancer(createStore)(reducer);
  }
  let currentState;
  let currentListeners = [];

  function getState() {
    return currentState;
  }
  function subscribe(listener) {
    currentListeners.push(listener);
  }
  function dispatch(action) {
    currentState = reducer(currentState, action);
    currentListeners.forEach(v => v());
    return action;
  }

  dispatch({type: '@@REDUX/INIT'}); //初始化
  return { getState, subscribe, dispatch }
}

export function applyMiddleware(middleware) {
  return createStore => (...args) => {
    const store = createStore(...args);
    let dispatch = store.dispatch;

    const midApi = {
      getState: store.getState(),
      dispatch: (...args) => dispatch(...args)
    }
    dispatch = middleware(midApi)(store.dispatch)
    return {
      ...store,
      dispatch
    }
  }
}


function bindActionCreator(creator, dispatch) {
  //透传
  return (...args) => dispatch(creator(...args))
}

export function bindActionCreators(creators, dispatch) {
  let bound = {};
  Object.keys(creators).forEach(v => {
    let creator = creators[v];
    bound[v] = bindActionCreator(creator, dispatch);
  })
  return bound;
  // return Object.keys(creators).reduce((ret, item) => {
  //   ret[item] = bindActionCreator(creators[item], dispatch);
  // }, {})
}
