import React, { Component } from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';




export class Invoices extends Component {

	
	static navigationOptions = {
		title: 'Invoices'
	}

	render() {
		return(  
			<View style={{paddingLeft: 10, paddingRight: 10, paddingTop: 30}}>
				<Text>
					INVOICES SCREEN
				</Text>
			</View>
		)
	}
}
