import React, { Component } from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity} from 'react-native';




export class Logout extends Component {

	
	static navigationOptions = {
		drawerLabel: 'Logout'
	}

	render() {
		return(  
			<View style={{paddingLeft: 10, paddingRight: 10, paddingTop: '60%'}}>
			<Text style={{textAlign: 'center'}}> Are you sure you want to Logout? </Text>
				<View style={{marginTop: 30}}>
					<TouchableOpacity style={styles.buttonContainer}>       
						<Text style={{color: 'white', textAlign: 'center'}}>Logout</Text>
					</TouchableOpacity>
				</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
    container: {
        marginTop: '70%',
        padding: 20
    },

	buttonContainer: {
      backgroundColor: '#E73536', 
	  paddingVertical: 15, 
	  marginTop: 10
    },

})