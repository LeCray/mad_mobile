import App from './App';
import { AppRegistry } from 'react-native';
import React, { Component } from 'react';
import { StackNavigator, DrawerNavigator } from 'react-navigation';
import {Platform,StyleSheet,Text,View} from 'react-native';
import {LoginPage} from './android/components/Login/LoginPage';
import {MainDrawerNavigation} from './android/components/MainDrawerNavigation';
import {DashboardHome} from	'./android/components/Dashboard/DashboardHome'
import {Main} from './android/components/Main'



const MadMobile = StackNavigator ({
	LoginPage: {screen: LoginPage},
	DrawerStack: {screen: MainDrawerNavigation}
	}, {
	  // Default config for all screens
	  headerMode: 'none',
	  title: 'Main',
	})





AppRegistry.registerComponent('mad_mobile', () => MadMobile);
