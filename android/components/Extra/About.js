import React, { Component } from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';




export class About extends Component {

	
	static navigationOptions = {
		drawerLabel: 'About'
	}

	render() {
		return(  
			<View style={{paddingLeft: 10, paddingRight: 10, paddingTop: 30}}>
				<Text>
					ABOUT SCREEN
				</Text>
			</View>
		)
	}
}
