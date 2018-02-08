import React, { Component } from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';




export class Quotes extends Component {

	
	static navigationOptions = {
		title: 'Quotes'
	}

	render() {
		return(  
			<View style={{paddingLeft: 10, paddingRight: 10, paddingTop: 30}}>
				<Text>
					QUOTES SCREEN
				</Text>
			</View>
		)
	}
}
