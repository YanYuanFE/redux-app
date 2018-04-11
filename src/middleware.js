// 假设，你在创建一个 Todo 时这样调用：

store.dispatch(addTodo('Use Redux'))

// 为了记录这个 action 以及产生的新的 state，你可以通过这种方式记录日志：

const action = addTodo('Use Redux')

console.log('dispatching', action)
store.dispatch(action)
console.log('next state', store.getState())

// 封装 Dispatch

function dispatchAndLog(store, action) {
  console.log('dispatching', action)
  store.dispatch(action)
  console.log('next state', store.getState())
}

// 替换 store.dispatch():

dispatchAndLog(store, addTodo('Use Redux'))

// monkey patch hack

const next = store.dispatch
store.dispatch = function dispatchAndLog(action) {
  console.log('dispatching', action)
  let result = next(action)
  console.log('next state', store.getState())
  return result
}

//  在之前，我们用自己的函数替换掉了 store.dispatch。如果我们不这样做，而是在函数中返回新的 dispatch 呢？

function logger(store) {
  // 这里的 next 必须指向前一个 middleware 返回的函数：
  const next = store.dispatch


  // 我们之前的做法:
  // store.dispatch = function dispatchAndLog(action) {

  return function dispatchAndLog(action) {
    console.log('dispatching', action)
    let result = next(action)
    console.log('next state', store.getState())
    return result
  }
}

// 另一种方式来实现这种链式调用的效果。可以让 middleware 以方法参数的形式接收一个 next() 方法，而不是通过 store 的实例去获取。
function logger(store) {
  return function wrapDispatchToAddLogging(next) {
    return function dispatchAndLog(action) {
      console.log('dispatching', action)
      let result = next(action)
      console.log('next state', store.getState())
      return result
    }
  }
}

// ES6 的箭头函数可以使其 柯里化
const logger = store => next => action => {
  console.log('dispatching', action)
  let result = next(action)
  console.log('next state', store.getState())
  return result
}

// Middleware 接收了一个 next() 的 dispatch 函数，并返回一个 dispatch 函数，返回的函数会被作为下一个 middleware 的 next()，以此类推。
// 由于 store 中类似 getState() 的方法依旧非常有用，我们将 store 作为顶层的参数，使得它可以在所有 middleware 中被使用。

function applyMiddleware(store, ...middlewares) {
  let dispatch = store.dispatch
  middlewares.forEach(middleware =>
    dispatch = middleware(store)(dispatch)
  )
  return Object.assign({}, store, { dispatch })
}