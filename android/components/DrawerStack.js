import { DrawerNavigator } from 'react-navigation';
import {DashboardHome} from	'./Dashboard/DashboardHome';
import {About} from	'./Extra/About';
import {Contact} from './Extra/Contact';
import {Emergency} from './Extra/Emergency';
import Logout from './Extra/Logout';
import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';




export const DrawerStack = DrawerNavigator ({

  DashboardHome: { screen: DashboardHome },
  Contact: { screen: Contact},
  About: { screen: About },
  //Emergency: { screen: Emergency},
  Logout: { screen: Logout }
 		
})







