import React, { Component } from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';




export class Bookings extends Component {

	
	static navigationOptions = {
		title: 'Bookings'
	}

	render() {
		return(  
			<View style={{paddingLeft: 10, paddingRight: 10, paddingTop: 30}}>
				<Text>
					BOOKINGS SCREEN
				</Text>
			</View>
		)
	}
}
