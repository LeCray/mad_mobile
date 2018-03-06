import React, { Component } from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity, AsyncStorage, Modal, TouchableHighlight} from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';


import {NewBooking} from './NewBooking';

export class Bookings extends Component {

	static navigationOptions = {
		title: 'Bookings'
	}
	
	constructor(props) {
		super(props);
		this.state = {
			email: "", 
			bookingDates: "", 
			bookingTimes: {},
			isDateTimePickerVisible: false,
			isBookingMade: false,
			modalVisible: false,
			date: "",
			time: ""
		};
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


	_showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true })
  	_hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false })
  	
	_handleDateTimePicked = (datetime) => {	
		var dateFormat = require('dateformat');

		date = dateFormat(datetime, "dddd, mmmm dS, yyyy");
		time = dateFormat(datetime, "h:MM TT");
		this.setState({date: date, time: time});
		this.setState({isBookingMade: true});
		this.setState({isNewBookingMade: true});

		console.log('Date: ', this.state.date);	
		console.log('Time: ', this.state.time);
	}

	_showModal = () => this.setState({ modalVisible: true })
	_hideModal = () => this.setState({ modalVisible: false })
	


	render() {
	
		return (
			<View style={styles.container}>
				<Text style={styles.booking}>DATE: {this.state.date}</Text>
				<View style={styles.hr}/>

				<Text style={styles.booking}>TIME: {this.state.time}</Text>
				<View style={styles.hr}/>

				<Text style={styles.booking}>DESCRIPTION: </Text>
				<View style={styles.hr}/>

				<TouchableOpacity 
					style = {styles.buttonContainer}
					isVisible = {false}>
					<Text style={{color: 'white', textAlign: 'center'}}>Place Booking</Text>
				</TouchableOpacity>

				<Modal
					animationType="slide"
					transparent={false}
					visible = { this.state.modalVisible }
					onRequestClose={() => {
						alert('Modal has been closed.');
					}}>
					<View style={{marginTop: 22}}>
						<View>
							<Text>Hello World!</Text>

							<TouchableHighlight onPress = {this._hideModal}>								
								<Text>Hide Modal</Text>
							</TouchableHighlight>
						</View>
					</View>
		        </Modal>

		        <TouchableHighlight onPress = {this._showModal}>
	        		<Text>Show Modal</Text>
		        </TouchableHighlight>

				<DateTimePicker
					isVisible={this.state.isDateTimePickerVisible}
					onConfirm={this._handleDateTimePicked}
					onCancel={this._hideDateTimePicker}
					mode="datetime"
		        />
				  
				<ActionButton buttonColor="rgba(231,76,60,1)">
					<ActionButton.Item buttonColor='#9b59b6' title="New Booking" onPress={this._showDateTimePicker}>
						<Icon name="md-create" style={styles.actionButtonIcon} />
					</ActionButton.Item>
					<ActionButton.Item buttonColor='#9b59b6' title="Add Description" onPress={this._showModal}>
						<Icon name="md-clipboard" style={styles.actionButtonIcon} />
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
 

	actionButtonIcon: {
		fontSize: 20,
		height: 22,
		color: 'white',
	},
	booking: {
		fontSize: 15,
		marginTop: 10,
    },
	hr: {
		borderBottomColor: '#d3d3d3',
		borderBottomWidth: 1,
		marginTop: 10,
		width: '90%',
		alignSelf: 'center'
    },
	buttonContainer: {
      backgroundColor: "#2980b6", 
	  paddingVertical: 15, 
	  marginTop: 20,
	  width: 250,
	  alignSelf: 'center'
    }

})
