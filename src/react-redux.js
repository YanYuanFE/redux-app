import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from './redux';

export const connect = (mapStateToProps = state => state, mapDispatchToProps={}) => (WrapComponent) => {
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
      const { store } = this.context;
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
