import React, { Component } from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import Pdf from 'react-native-pdf';




export class Invoices extends Component {

	static navigationOptions = {
		title: 'Invoices'
	}

/*
	componentWillMount() {

		fetch("http://10.199.253.13:3000/api/v1/invoices", {
			method: "POST", 
			headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
			body: JSON.stringify({
				email: "captain@gmail.com"
			}), 
        })
        .then((responseData) => {
			console.log('Booking Cancelled')
			ToastAndroid.show('Booking Request Cancelled', ToastAndroid.LONG);
        })
        .catch((error) => {
          console.error(error);
        })
        .done();
	}
*/
	render() {
		return(  
			<View style={styles.container}>
		
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