import React, { Component } from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';




export class About extends Component {

	
	static navigationOptions = {
		drawerLabel: 'About'
	}

	render() {
		return(  
			<View style={styles.container}>
				<Text>
					ABOUT SCREEN
				</Text>
			</View>
		)
	}
}

const styles = StyleSheet.create({
    container: {
		paddingLeft: 10, 
		paddingRight: 10, 
        padding: 20,
        marginTop: '40%',
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
    },

	buttonContainer: {
      backgroundColor: "#2980b6", 
	  paddingVertical: 15, 
	  marginTop: 10
    },

})