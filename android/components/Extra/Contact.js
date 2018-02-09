import React, { Component } from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';




export class Contact extends Component {

	
	static navigationOptions = {
		drawerLabel: 'Contact'
	}

	render() {
		return(  
			<View style={styles.container}>
				<Text>
					CONTACT SCREEN
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
