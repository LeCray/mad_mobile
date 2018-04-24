import React, { Component } from 'react';
import { StackNavigator, DrawerNavigator } from 'react-navigation';
import {DrawerStack} from './DrawerStack';
//import {DataStream} from './Actions/DataStream'
import {Bookings} from './Actions/Bookings';
import {Invoices} from './Actions/Invoices';
import {Csi} from './Actions/Csi';
import {Quotations} from './Actions/Quotations';
import Login from './Extra/Login';
import SignUp from './Extra/SignUp';
import OBDReader from './Actions/OBDReader';
import Settings from './Actions/Settings';
import RootRouter from './RootRouter';
import Entypo from 'react-native-vector-icons/Entypo';

import {Platform, StyleSheet, Text, 
		View, TouchableOpacity, TouchableHighlight, Button
		} from 'react-native';



export const MainScreen = StackNavigator({
	//Stack where hamburger is to be placed
	Login: { screen: Login },
	SignUp: { screen: SignUp },
	Main: { screen: DrawerStack,
			navigationOptions: ({ navigation }) => ({
	    	headerLeft: <Entypo name="menu" style={{marginLeft: 10}} size={35} color="white" onPress={()=>{
						if (navigation.state.index === 0) {
						  navigation.navigate('DrawerOpen')
						} else {
						  navigation.navigate('DrawerClose')
						}
					}}/>
			})
 	},

	//Screens that are accessed by DashboardHome.js
	OBDReader: 		{ screen: OBDReader},
	Settings: 		{ screen: Settings },
	Bookings: 		{ screen: Bookings },
	Invoices: 		{ screen: Invoices},
	Csi: 			{ screen: Csi},
	Quotations: 	{ screen: Quotations},
	}, {navigationOptions: {
			title: 'M.A.D',
			headerStyle: {backgroundColor:"#47969e"},
			headerTintColor: 'white',			
		}
	})

//#51A8B1  #b30000

	

