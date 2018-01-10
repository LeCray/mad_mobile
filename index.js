'use strict';

import React, { Component } from 'react';
import {
  AppRegistry,
} from 'react-native';

import RootRouter from './android/components/RootRouter';

class MadMobile extends Component {
  render() {
    return (
        <RootRouter />
    );
  }
}

AppRegistry.registerComponent('mad_mobile', () => MadMobile);