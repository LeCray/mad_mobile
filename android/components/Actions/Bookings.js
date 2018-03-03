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
		this.state = {email: "", bookingDates: "", bookingTimes: {}};

	}

	async componentWillMount() {

		
		const email = await AsyncStorage.getItem('email')
		.then((email) => {
			console.log(email)
			this.setState({ email: email });		
		})

		fetch("http://192.168.43.42:3000/api/v1/bookings", {
			method: "POST", 
			headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
			body: JSON.stringify({
				email: "captain@gmail.com", 
			}), 
        })
        .then(responseData => responseData.json())
        .then((responseData) => {
			//responseData.json()
			console.log("Below is response from mobile side")
			console.log(responseData);

			responseData.date.map((dates) => {
			    console.log(dates);
			});

			this.setState({
				bookingDates: responseData.date,
				bookingTimes: responseData.time
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
		
		
		var bookingDates = JSON.stringify(this.state.bookingDates)
		var bookingTimes = JSON.stringify(this.state.bookingTimes)

		
 
		return (
			<View style={styles.Container}>

					{this.state.bookingDates.map((dates) =>
						<Text>{dates}</Text>		
					)}

					{this.state.bookingTimes.map((times) =>
						<Text>{times}</Text>		
					)}
				
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
