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

// export function applyMiddleware(middleware) {
//   return createStore => (...args) => {
//     const store = createStore(...args);
//     let dispatch = store.dispatch;
//
//     const midApi = {
//       getState: store.getState(),
//       dispatch: (...args) => dispatch(...args)
//     }
//     dispatch = middleware(midApi)(store.dispatch)
//     return {
//       ...store,
//       dispatch
//     }
//   }
// }

//多个中间件合并

export function applyMiddleware(...middlewares) {
  return createStore => (...args) => {
    const store = createStore(...args);
    console.log(store.dispatch);
    let dispatch = store.dispatch;

    const midApi = {
      getState: store.getState,
      dispatch: (...args) => dispatch(...args)
    }
    const middlewareChain = middlewares.map(middleware => middleware(midApi));
    // debugger;
    console.log(middlewareChain);
    dispatch = compose(...middlewareChain)(store.dispatch);
    console.log(store.dispatch);
    console.info(dispatch);
    // dispatch = middleware(midApi)(store.dispatch)
    return {
      ...store,
      dispatch
    }
  }
}
// (...args) => logger(thunk(arrThunk(args)))
// logger(thunk(arrThunk(store.dispatch)))
//
// compose(fn1, fn2, fn3)
// fn1(fn2(fn3)))

// const a = (next) => {
//   console.log(1);
//   return next();
//   console.log('1 after');
// }
// const b = (next) => {
//   console.log(2);
//   return next();
//   console.log('2 after');
// }
// const c = (next) => {
//   console.log(3);
//   return next();
// }
// const func = (...args) => a(b(c(...args)))

// func(() => console.log('start'))

function compose(...funcs) {
  if (funcs.length === 0) {
    return arg => arg;
  }
  if (funcs.length === 1) {
    return funcs[0]
  }
  return funcs.reduce((ret, item, index) => {
    console.log('ret', index, ret);
    console.log('item', index, item);
    return (...args) => ret(item(...args))
  })
}

// logger(thunk())

// export default function compose(...funcs) {
//   return funcs.reduceRight((composed, f) => f(composed));
// }



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

export function combineReducers(reducers) {
  const reducerKeys = Object.keys(reducers);
  let finalReducers = {};

  reducerKeys.forEach((key) => {
    finalReducers[key] = reducers[key];
  });

  const finalReducerKeys = Object.keys(finalReducers);

  return (state = {}, action) => {
    let hasChangeed = false;
    let nextState = {};
    finalReducerKeys.forEach((key) => {
      const reducer = finalReducers[key];
      const prevStateForKey = state[key];
      const nextStateForKey = reducer(prevStateForKey, action);
      nextState[key] = nextStateForKey;
      hasChangeed = hasChangeed || nextStateForKey !== prevStateForKey;
    })

    return hasChangeed ? nextState : state;
  }

}
