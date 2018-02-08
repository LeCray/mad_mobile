import React, { Component } from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';




export class Emergency extends Component {

	
	static navigationOptions = {
		drawerLabel: 'Emergency'
	}

	render() {
		return(  
			<View style={{paddingLeft: 10, paddingRight: 10, paddingTop: 30}}>
				<Text>
					EMERGENCY SCREEN
				</Text>
			</View>
		)
	}
}
