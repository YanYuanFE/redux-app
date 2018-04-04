import React from 'react';
import PropTypes from 'prop-types';
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
export const connect = (mapStateToProps = state => state, mapDispatchToProps) => (WrapComponent) => {
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
    componentWillMount() {
      const { store } = this.context;
      store.subscribe(() => this.update());//每次dispatch数据变化时更新state
      this.update();
    }
    update() {
      const { store } = this.context;
      // 获取mapStateToProps和mapDispatchToProps放入this.props
      const stateProps = mapStateToProps(store.getState(), this.props);
      // 方法不能直接给，因为需要dispatch,用dispatch将actionCreator包裹
      if (!mapDispatchToProps) {
        mapDispatchToProps = (dispatch) => ({dispatch})
      }
      let dispatchProps;
      if (typeof mapDispatchToProps === 'function') {
          dispatchProps = mapDispatchToProps(store.dispatch, this.props);
      } else {
          dispatchProps = bindActionCreators(mapDispatchToProps, store.dispatch);
      }
      // const  dispatchProps = bindActionCreators(mapDispatchToProps, store.dispatch);
      // console.log(mapDispatchToProps, dispatchProps);

      this.setState({
        props: {
          ...this.state.props,//注意顺序，覆盖初始state
          ...stateProps,
          ...dispatchProps,
          ...this.props,
        }
      })
    }
    render() {
      return <WrapComponent {...this.state.props}/>
    }
  }
}


export class Provider extends React.Component {
  static childContextTypes = {
    store: PropTypes.object
  }
  getChildContext() {
    return {store: this.store}
  }
  constructor(props, context) {
    super(props, context);
    this.store = props.store;
  }
  render() {
    return this.props.children
  }
}

// const add = (num) => num + 3
//
// const addTwo = (x) => (y) => x + y + 3
// //两层箭头函数
//
// function sayHello(...args) {
//   console.log(args); //数组
// }
