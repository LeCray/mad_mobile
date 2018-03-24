import React, { Component } from 'react';

import {Platform, StyleSheet, Text, View, TouchableOpacity, 
		AsyncStorage, Modal, TouchableHighlight, 
		TextInput, KeyboardAvoidingView, ToastAndroid} from 'react-native';

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
			isBookingPlaced: "",
			isDateTimePickerVisible: false,
			isBookingMade: false,
			modalVisible: false,
			date: "",
			time: "",
			description: "",
			carMake: "",
			carModel: "",
			isBookingDataProvided: false
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

	componentWillMount() {
		AsyncStorage.getItem('isBookingPlaced')
		.then((value) => {
			this.setState({'isBookingPlaced': value})
			console.log('CWM isBookingPlaced: ', this.state.isBookingPlaced)
		})

		AsyncStorage.getItem('date')
		.then((date) => this.setState({'date': date}))

		AsyncStorage.getItem('time')
		.then((time) => this.setState({'time': time}))
		
		AsyncStorage.getItem('description')
		.then((description) => this.setState({'description': description}))

		AsyncStorage.getItem('carMake')
		.then((carMake) => this.setState({'carMake': carMake}))

		AsyncStorage.getItem('carModel')
		.then((carModel) => this.setState({'carModel': carModel}))
	}



	_showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true })
  	_hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false })
  	
	_handleDateTimePicked = (datetime) => {	
		var dateFormat = require('dateformat');
		date = dateFormat(datetime, "dddd, mmmm dS, yyyy");
		time = dateFormat(datetime, "h:MM TT");

		this.setState({date: date, time: time});
		this.setState({isBookingPlaced: ""});

		this.setState({isBookingDataProvided: true})

		console.log('Date: ', this.state.date);	
		console.log('Time: ', this.state.time);
	}

	_showModal = () => this.setState({ modalVisible: true })
	_hideModal = () => this.setState({ modalVisible: false })

	_newBooking = () => {

		if ( this.state.date && this.state.time ){ 
			AsyncStorage.setItem('date', this.state.date);
			AsyncStorage.setItem('time', this.state.time);
			AsyncStorage.setItem('description', this.state.description);
			AsyncStorage.setItem('carMake', this.state.carMake);
			AsyncStorage.setItem('carModel', this.state.carModel);
			AsyncStorage.setItem('isBookingPlaced', "true");
			this.setState({ isBookingPlaced: true });
		
			fetch("http://192.168.43.42:3000/api/v1/new_booking", {
				method: "POST", 
				headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
				body: JSON.stringify({
					email: "captain@gmail.com", 
					date: this.state.date,
					time: this.state.time,
					description: this.state.description,
					carMake: this.state.carMake,
					carModel: this.state.carModel
				}), 
	        })
	        .then(responseData => responseData.json())
	        .then((responseData) => {
				console.log("Below is response from mobile side")
				console.log(responseData);
				ToastAndroid.show('Booking Request Sent', ToastAndroid.LONG);	
	        })
	        .catch((error) => {
	          console.error(error);
	        })
	        .done();
		
		} else {
			ToastAndroid.show('Incomplete Data', ToastAndroid.SHORT);
			console.log("No date provided")
		};
		
		console.log('Booking Handled');
	}

	_cancelBooking = () => {
		AsyncStorage.setItem('date', "")
		this.setState({date: ""})
		AsyncStorage.setItem('time', "")
		this.setState({time: ""})
		AsyncStorage.setItem('description', "")
		this.setState({description: ""})
		AsyncStorage.setItem('carMake', "")
		this.setState({carMake: ""})
		AsyncStorage.setItem('carModel', "")
		this.setState({carModel: ""})

		AsyncStorage.setItem('isBookingPlaced', "")
		this.setState({ isBookingPlaced: "" })

		this.setState({isBookingDataProvided: ""})

		fetch("http://192.168.43.42:3000/api/v1/cancel_booking", {
			method: "POST", 
			headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
			body: JSON.stringify({
				email: "captain@gmail.com", 
				date: "",
				time: "",
				description: "",
				carMake: "",
				carModel: ""
			}), 
        })
        .then(() => {
			console.log('Booking Cancelled')
			ToastAndroid.show('Booking Request Cancelled', ToastAndroid.LONG);
        })
        .catch((error) => {
          console.error(error);
        })
        .done();	
	}


	render() {
	
		return (
			<View style={styles.container}>
			<Text style={styles.booking}>DATE: 
					<Text style={{fontStyle: 'italic'}}> {this.state.date}</Text>
				</Text>
				<View style={styles.hr}/>

				<Text style={styles.booking}>TIME: 
					<Text style={{fontStyle: 'italic'}}> {this.state.time}</Text>
				</Text>
				<View style={styles.hr}/>

				<Text style={styles.booking}>DESCRIPTION: </Text>
				<Text style={{fontStyle: 'italic', marginLeft: 15}}>{this.state.description}</Text>
				<View style={styles.hr}/>

				{this.state.carMake || this.state.carModel? 
					<View>
						<Text style={styles.carDesc}>CAR MAKE: 
							<Text style={{fontStyle: 'italic'}}> {this.state.carMake}</Text>
						</Text>
						<Text style={styles.carDesc}>CAR MODEL: 
							<Text style={{fontStyle: 'italic'}}> {this.state.carModel}</Text>
						</Text>
					</View> 
					: null 
				}
				
							
				{!this.state.isBookingPlaced?
					<TouchableOpacity 
						style = {styles.buttonContainer}
						isVisible = {false}>
						<Text 	
							onPress={this._newBooking} 
							style={{color: 'rgba(231,76,60,1)', textAlign: 'center'}}>
							Place Booking
						</Text> 
					</TouchableOpacity>			
				:
					<View>
						<View style={styles.hr}/>
						<View style={{marginTop: 20, alignSelf: 'center'}}>
							<Text style={{fontSize: 15, color: "rgba(231,76,60,1)"}}> STATUS: 
								<Text style={{color: "#8c8c8c", fontWeight: 'bold'}}> PENDING</Text>
							</Text>
						</View> 
						<TouchableOpacity 
							style = {styles.buttonContainer}
							isVisible = {false}>
							<Text 	
								onPress={this._cancelBooking} 
								style={{color: 'rgba(231,76,60,1)', textAlign: 'center'}}>
								Cancel
							</Text>
						</TouchableOpacity>
					</View>
				}
				
				
				<Modal
					animationType="slide"
					transparent={true}
					visible = {this.state.modalVisible}
					onRequestClose={this._hideModal}>
					
					<View style={{paddingTop: 50, backgroundColor: '#00000080', flex: 1}}>
						<View  style={{backgroundColor: '#fff', padding: 20, flex: 1}}>
							
							<Text style={styles.descHeader}>Description</Text>
							<View style={styles.descHr}/>
							<View style={styles.descText}>
								<TextInput
						        	multiline = {true}
									numberOfLines = {2}
									onChangeText={(text) => this.setState({description: text})}
									placeholder = "Type problem here"
									style={{borderWidth: 0}}/>
								<TextInput
									onChangeText={(text) => this.setState({carMake: text})}
									placeholder = "Car Make e.g. BMW"
									returnKeyType="next"
									style={{borderWidth: 0}}/>
								<TextInput
									onChangeText={(text) => this.setState({carModel: text})}
									placeholder = "Car Model e.g. M4 Coupe"
									returnKeyType="done" 
									style={{borderWidth: 0}}/>
							</View>

							<TouchableHighlight style={styles.descButton} onPress={this._hideModal}>								
								<Text style={{color: '#9b59b6', textAlign: 'center'}}>Done</Text>
							</TouchableHighlight>

						</View>
					</View>

		        </Modal>
				

				<DateTimePicker
					isVisible={this.state.isDateTimePickerVisible}
					onConfirm={this._handleDateTimePicked}
					onCancel={this._hideDateTimePicker}
					mode="datetime"
		        />
				  
				<ActionButton buttonColor="rgba(231,76,60,1)">
					<ActionButton.Item buttonColor='#009900' title="New Booking" onPress={this._showDateTimePicker}>
						<Icon name="md-time" style={styles.actionButtonIcon} />
					</ActionButton.Item>
					<ActionButton.Item buttonColor='#9b59b6' title="Add Description" onPress={this._showModal}>
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
		//backgroundColor: '#f3f3f3',
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
	descHr: {
		borderBottomColor: '#d3d3d3',
		borderBottomWidth: 1,
		marginTop: 10,
		width: '80%',
		alignSelf: 'center'
    },
	buttonContainer: {
		//backgroundColor: "#2980b6", 
		borderTopWidth: 1,
		borderTopColor: '#d3d3d3',
		borderBottomWidth: 1,
		borderBottomColor: '#d3d3d3',
		paddingVertical: 15, 
		marginTop: 20,
		width: 250,
		alignSelf: 'center'
    },
	descButton: {
		borderTopWidth: 1,
		borderTopColor: '#d3d3d3',
		borderBottomWidth: 1,
		borderBottomColor: '#d3d3d3',
		paddingVertical: 15, 
		marginTop: 20,
		width: 250,
		alignSelf: 'center'
	},
    descHeader: {
    	alignSelf: 'center',
    	fontSize: 20,
    	color: '#9b59b6'
    },
    descText: {
    	paddingLeft: 30,
    	paddingRight: 30,

    },
    carDesc: {
		marginTop: 10,
    }

})
