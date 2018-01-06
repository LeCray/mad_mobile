import React, { Component } from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';




export class DataStream extends Component {

	
	static navigationOptions = {
		title: 'DataStream'
	}

	render() {
		return(  
			<View style={{paddingLeft: 10, paddingRight: 10, paddingTop: 30}}>
				<Text>
					DATASTREAM SCREEN
				</Text>
			</View>
		)
	}
}
