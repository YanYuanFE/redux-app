export function createStore(reducer, enhancer) {
  if (enhancer) {
    return enhancer(createStore)(reducer);
  }
  let currentState = {}
  let currentListeners = []

  function getState() {
    return currentState
  }
  function subscribe(listener) {
    currentListeners.push(listener)
  }
  function dispatch(action) {
    currentState = reducer(currentState, action)
    currentListeners.forEach(v => v())
    return action
  }

  dispatch({type: '@@REDUX/INIT'}) //初始化
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

//多个中间件合并

export function applyMiddleware(...middlewares) {
  return createStore => (...args) => {
    const store = createStore(...args);
    let dispatch = store.dispatch;

    const midApi = {
      getState: store.getState(),
      dispatch: (...args) => dispatch(...args)
    }
    const middlewareChain = middlewares.map(middleware => middleware(midApi));
    dispatch = compose(...middlewareChain)(store.dispatch);
    // dispatch = middleware(midApi)(store.dispatch)
    return {
      ...store,
      dispatch
    }
  }
}

//compose(fn1, fn2, fn3)
//fn1(fn2(fn3)))

function compose(...funcs) {
  if (funcs.length === 0) {
    return arg => arg;
  }
  if (funcs.length === 1) {
    return funcs[0]
  }
  return funcs.reduce((ret, item) => (...args) => ret(item(...args)))
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
