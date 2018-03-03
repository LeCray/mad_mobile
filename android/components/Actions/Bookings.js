import React, { Component } from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity, AsyncStorage} from 'react-native';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';


export class Bookings extends Component {

	static navigationOptions = {
		title: 'Bookings'
	}
	
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


	render() {
	
		var bookingDates = JSON.stringify(this.state.bookingDates)
		var bookingTimes = JSON.stringify(this.state.bookingTimes)

		
 
		return (
			<View style={styles.container}>
				<Text style={styles.booking}>DATE: </Text>
				<View style={styles.hr}/>

				<Text style={styles.booking}>TIME: </Text>
				<View style={styles.hr}/>

				<Text style={styles.booking}>DESCRIPTION: </Text>
				<View style={styles.hr}/>
				  
				
				
			</View>
		);
	}
}	

const styles = StyleSheet.create({
    container: {
    	flex: 1,
		backgroundColor: '#f3f3f3',
        padding: 20,
		
    },
    hr: {
		borderBottomColor: '#d3d3d3',
		borderBottomWidth: 1,
		marginTop: 10,
		width: '90%',
		alignSelf: 'center'
    },

	booking: {
		fontSize: 15,
		marginTop: 10,
    },

})
