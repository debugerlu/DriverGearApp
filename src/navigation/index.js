/**
 * Created by bear on 2018/2/5.
 */
import React, { Component } from 'react';
import {
  Platform
} from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import {
  createReduxBoundAddListener
} from 'react-navigation-redux-helpers';
import Routers from './navigator';
import NavigatorService from '../services/navigatorService';

@connect(state => ({
  ...state,
  nav: state.nav
}))
export default class AppWithNavigationState extends Component {
  componentDidMount() {
    const {
      dispatch,
      nav,
    } = this.props;
  }
  componentWillUnmount() {

  }


  _addHelpers = () => {
    const { dispatch, nav } = this.props;
    const addListener = createReduxBoundAddListener('root');
    const navigation = {
      dispatch,
      state: nav,
      addListener
    };
    return navigation
  }
  render() {
    return <Routers navigation={this._addHelpers()} ref={el => NavigatorService.setContainer(el)} />;
  }
}