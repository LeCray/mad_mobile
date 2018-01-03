import App from './App';
import { AppRegistry } from 'react-native';
import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import {Platform,StyleSheet,Text,View} from 'react-native';
import {LoginPage} from './android/components/Login/LoginPage';
import {DashboardHome} from	'./android/components/Dashboard/DashboardHome'







const TraceMobile = StackNavigator ({
	LoginPage: {screen: LoginPage},
	DashboardHome: {screen: DashboardHome}
})





AppRegistry.registerComponent('trace_mobile', () => TraceMobile);
