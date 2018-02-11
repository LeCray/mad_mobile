import React, { Component } from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity, AsyncStorage} from 'react-native';




export class Bookings extends Component {

/*
	await AsyncStorage.getItem('email')
	.then((value) => { 
		this.setState({'email': value})	
		console.log(this.state.email)
	});
*/	
	
	constructor(props) {
		super(props);
		this.state = {email: "", bookings: {}};

	}

	async componentWillMount() {

		
		const email = await AsyncStorage.getItem('email')
		.then((email) => {
			console.log(email)
			this.setState({ email: email });		
		})

		fetch("http://10.0.0.11:3000/api/v1/bookings", {
			method: "POST", 
			headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
			body: JSON.stringify({
				email: "captain@gmail.com", 
			}), 
        })
        .then(response => response.json())
        .then((responseData) => {
			responseData = responseData.json()
			console.log(responseData);
			this.setState({
				bookings: responseData
			})
        })
        .catch((error) => {
          console.error(error);
        })
        .done();

	
	}


	
	static navigationOptions = {
		title: 'Bookings'
	}


	render() {
		
		
		var bookings = JSON.stringify(this.state.bookings)
 
		return (
			<View style={styles.Container}>
 
				
				<Text>{bookings}</Text>
				
 
			</View>
		);
	}
}	

const styles = StyleSheet.create({
    container: {

        marginTop: '70%',
        padding: 20
    },

	buttonContainer: {
      backgroundColor: "#2980b6", 
	  paddingVertical: 15, 
	  marginTop: 10
    },

})
