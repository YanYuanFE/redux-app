import React from 'react';
import { bindActionCreators } from './redux';
// connect负责链接组件，给到redux里的数据放到组件的属性里
// 1、负责接受一个组件，把state里的一些数据放进去，返回一个组件
// 2、数据变化的时候，可以通知组件
// export function connect(mapStateToProps, mapDispatchToProps) {
//   return function (wrapComponent) {
//     return class ConnectComponent extends React.Component {
//
//     }
//   }
// }
export connect = (mapStateToProps = state => state, mapDispatchToProps={}) => (WrapComponent) => {
  return class ConectComponent extends React.Component {
    static contextTypes = {
      store: PropTypes.object
    }
    constructor(props, context) {
      super(props, context);
      this.state = {
        props: {}
      }
    }
    componentDidMount() {
      const { store } = this.context;
      store.subscribe(() => this.update());//每次dispatch数据变化时更新state
      this.update();
    }
    update() {
      // 获取mapStateToProps和mapDispatchToProps放入this.props
      const stateProps = mapStateToProps(store.getState());
      // 方法不能直接给，因为需要dispatch,用dispatch将actionCreator包裹
      const dispatchProps = bindActionCreators(mapDispatchToProps, store.dispatch);

      this.setState({
        props: {
          ...this.state.props,//注意顺序，覆盖初始state
          ...stateProps,
          ...dispatchProps,
        }
      })
    }
    render() {
      return <WrapComponent {...this.state.props}/>
    }
  }
}

export class Provider extends React.Component {
  static childContextType = {
    store: PropTypes.object
  }
  getChildContext() {
    return {store: this.store}
  }
  constructor(props, context) {
    super(props, context)
    this.store = props.store
  }
  render() {
    return this.props.children
  }
}

const add = (num) => num + 3

const addTwo = (x) => (y) => x + y + 3
//两层箭头函数

function sayHello(...args) {
  console.log(args); //数组
}
