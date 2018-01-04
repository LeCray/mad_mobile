import React, { Component } from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';




export class Contact extends Component {

	
	static navigationOptions = {
		drawerLabel: 'Contact'
	}

	render() {
		return(  
			<View style={{paddingLeft: 10, paddingRight: 10, paddingTop: 30}}>
				<Text>
					CONTACT SCREEN
				</Text>
			</View>
		)
	}
}
