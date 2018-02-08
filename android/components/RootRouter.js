'use strict';

import React, { Component } from 'react';

import {
  PropTypes,
  StyleSheet,
  Text,
  View,
  PixelRatio,
  DeviceEventEmitter,
  AppState
} from 'react-native'

import {
  Scene, 
  Reducer, 
  Router, 
  Switch, 
  TabBar, 
  Modal, 
  Schema, 
  Actions, 
} from 'react-native-router-flux'

import SharedPreference from 'react-native-sp';
import OBDReader from './Actions/OBDReader';
import DrawerStack from './DrawerStack';
import MainScreen from './MainScreen';
import Settings from './Settings';



import EventEmitter from 'EventEmitter';
var AppEventEmitter = new EventEmitter();

const PreferenceDefaultValue = {
  enable_bluetooth_preference: false,
  enable_mockup_preference: false,
};

export default class RootRouter extends Component {
  constructor(props) {
    super(props);
    SharedPreference.init(PreferenceDefaultValue);
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  render() {
    return (
      <Router>
        <Scene key="root">
          <Scene key="DrawerStack" component={DrawerStack} title="" hideNavBar={true} initial/>
          <Scene key="OBDReader" component={OBDReader} title="OBDReader" hideNavBar={true} />
          <Scene key="Settings" component={Settings} title="Settings" hideNavBar={true} />
        </Scene>
      </Router>
    )
  }
}