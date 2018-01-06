import React, { Component } from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';




export class Cars extends Component {

	
	static navigationOptions = {
		title: 'Cars'
	}

	render() {
		return(  
			<View style={{paddingLeft: 10, paddingRight: 10, paddingTop: 30}}>
				<Text>
					CARS SCREEN
				</Text>
			</View>
		)
	}
}
