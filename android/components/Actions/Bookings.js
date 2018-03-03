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
		this.NewBookingBtn = this.NewBookingBtn.bind(this);
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

	NewBookingBtn = function () {
		console.log('NewBooking is running')
		this.props.navigation.dispatch({
			type: 'Navigation/NAVIGATE',
			routeName: 'NewBooking'
		});
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
				  
				<ActionButton buttonColor="rgba(231,76,60,1)">
					<ActionButton.Item buttonColor='#9b59b6' title="New Booking" onPress={this.NewBookingBtn}>
						<Icon name="md-create" style={styles.actionButtonIcon} />
					</ActionButton.Item>
				</ActionButton>
	
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
	actionButtonIcon: {
		fontSize: 20,
		height: 22,
		color: 'white',
	},

})
