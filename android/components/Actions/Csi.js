import React, { Component } from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';




export class Csi extends Component {

	
	static navigationOptions = {
		title: 'CSI'
	}

	render() {
		return(  
			<View style={{paddingLeft: 10, paddingRight: 10, paddingTop: 30}}>
				<Text>
					CLIENT SATISFACTION INSURANCE SCREEN
				</Text>
			</View>
		)
	}
}
