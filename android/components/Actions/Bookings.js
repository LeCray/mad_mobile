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
/*
	async componentWillMount() {

		
		const email = await AsyncStorage.getItem('email')
		.then((email) => {
			console.log(email)
			this.setState({ email: email });		
		})

		fetch("http://10.0.0.11:5000/api/v1/bookings", {
			method: "POST", 
			headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
			body: JSON.stringify({
				email: this.state.email, 
			}), 
        })
        .then(response => response.json())
        .then((responseData) => {
			responseData = responseData.toString()
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

*/
	
	static navigationOptions = {
		title: 'Bookings'
	}


	render() {
		return(  
			<View style={styles.container}>
				<Text>
					BOOKINGS SCREEN
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
