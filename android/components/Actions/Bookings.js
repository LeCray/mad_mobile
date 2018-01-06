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
		/*
		const value = AsyncStorage.getItem('email')
		.then((value) => {
			email = value
			console.log(email)
			return email;
		})
		*/
		this.state = {email: ""};
	}

	  



	async componentWillMount() {

		const email = await AsyncStorage.getItem('email')
		.then((email) => {
			console.log(email)
			this.setState({ email: email });		
		})
	
		fetch("http://10.0.0.6:5000/api/v1/bookings", {
			method: "POST", 
			headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
			body: JSON.stringify({
				email: this.state.email, 
			}), 
        })
        .then(response => response.json())
        .then((responseData) => {
			console.log(responseData);
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
		
	

		return(  
			<View style={{paddingLeft: 10, paddingRight: 10, paddingTop: 30}}>
				<Text>
					BOOKINGS SCREEN
				</Text>
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
      backgroundColor: "#2980b6", 
	  paddingVertical: 15, 
	  marginTop: 10
    },

})
