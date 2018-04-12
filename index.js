'use strict';

import React, { Component } from 'react';
import {
  AppRegistry,
} from 'react-native';

import RootRouter from './android/components/RootRouter';
import {MainScreen} from './android/components/MainScreen';


class MadMobile extends Component {
  render() {
    return (
        <MainScreen/>
    );
  }
}

AppRegistry.registerComponent('mad_mobile', () => MadMobile);