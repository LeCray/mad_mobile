import App from './App';
import { AppRegistry } from 'react-native';
import React, { Component } from 'react';
import { StackNavigator, DrawerNavigator } from 'react-navigation';
import {Platform,StyleSheet,Text,View} from 'react-native';
import {LoginPage} from './android/components/Login/LoginPage';
import {MainScreen} from './android/components/MainScreen';
import {DashboardHome} from	'./android/components/Dashboard/DashboardHome'




const MadMobile = StackNavigator ({
	LoginPage: {screen: LoginPage},
	MainScreen: {screen: MainScreen}
	}, {
	  // Default config for all screens
	  headerMode: 'none',
	  title: 'Main',
	})





AppRegistry.registerComponent('mad_mobile', () => MadMobile);
