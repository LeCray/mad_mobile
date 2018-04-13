import React, { Component } from 'react';

import {Platform, StyleSheet, Text, View, TouchableOpacity, 
		AsyncStorage, Modal, TouchableHighlight, 
		TextInput, KeyboardAvoidingView, ToastAndroid, ScrollView} from 'react-native';

import DateTimePicker from 'react-native-modal-datetime-picker';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
var { Dimensions } = require('react-native')



export class Bookings extends Component {

	static navigationOptions = {
		title: 'Back'
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
			status: "PENDING",
			isBookingDataProvided: false,
		};
	}
/*
	async componentWillMount() {

		const email = await AsyncStorage.getItem('email')
		.then((email) => {
			console.log(email)
			this.setState({ email: email });		
		})

		
	}
*/
	componentWillMount() {
		
		fetch("http://192.168.43.42:3000/api/v1/mobile_check_booking", {
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

			if ( responseData.booking == null ) {
				console.log(" Booking from server is null")
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

			} else {

				AsyncStorage.getItem('isBookingPlaced')
				.then((value) => this.setState({'isBookingPlaced': value}))
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
				
				if ( responseData.booking == "Confirmed" ) {
					AsyncStorage.setItem('status', "CONFIRMED")
					this.setState({status: "CONFIRMED"})
				}
			} 
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
		this.setState({isBookingPlaced: ""});

		this.setState({ modalVisible: true })

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
			
		
			fetch("192.168.43.42:3000/api/v1/new_booking", {
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
				this.setState({ status: "PENDING" });	
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

		fetch("192.168.43.42:3000/api/v1/cancel_booking", {
			method: "POST", 
			headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
			body: JSON.stringify({
				email: "captain@gmail.com"
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
			<ScrollView>
				<View style={styles.container}>
					<View style={styles.header}>
						<View style={{flexDirection: "row"}}>	
							<Text style={{fontSize: 30, color: "#4F8EF7"}}>Bookings</Text>
						</View>
						<Text>Place and manage your bookings</Text>
					</View>

					<View style={styles.actionCard}>
						<View style={{flexDirection: 'row', marginBottom: -15}}>
							<Feather name="bell" style={styles.headingIcon} />
							<Text style={{fontSize: 18, color: "#4F8EF7"}}> Current Booking </Text>
						</View>
						<View style={styles.bookingsHr}/> 
						
						{this.state.isBookingPlaced?
							<View style={{marginTop: 15, alignSelf: 'center', flexDirection: "row"}}>
								<Text style={{fontSize: 20, color: "rgba(231,76,60,1)"}}>STATUS: </Text>
								<Text style={{fontSize: 20, color: "#8c8c8c"}}>{this.state.status}</Text>			
							</View> 
						: 
							<View>
								<View style={{flexDirection: "row" }}>
									<Feather name="plus" style={styles.cardIcon} />
									<View style={{flex: 1, flexDirection: "column", justifyContent: "center"}}>
										<TouchableOpacity style={styles.button} onPress={this._showDateTimePicker}>
											<Text>NEW BOOKING</Text>
										</TouchableOpacity>
									</View>
								</View>
							</View>
						}
					</View>
				
					
					<View style={styles.bookingsCard}>
						<View style={{flexDirection: 'row', marginBottom: -15}}>
							<Feather name="calendar" style={styles.headingIcon} />
							<Text style={{fontSize: 18, color: "#4F8EF7", paddingLeft: 5}}>Your Booking</Text>
						</View>
						<View style={styles.bookingsHr}/> 
						
						<View style={{flexDirection: "row" }}>
							<Entypo name="bookmarks" style={styles.cardIcon} />
							<View style={{flexDirection: "column", justifyContent: "center"}}>
								<Text><Text style={{fontWeight: 'bold'}}>Date: </Text> {this.state.date}</Text>
							</View>
						</View>
						<View style={styles.hr}/>

						<View style={{flexDirection: "row" }}>
							<Feather name="clock" style={styles.cardIcon} />
							<View style={{flexDirection: "column", justifyContent: "center"}}>
								<Text><Text style={{fontWeight: 'bold'}}>Time: </Text> {this.state.time}</Text>
							</View>
						</View>
						<View style={styles.hr}/>

 						<View style={{flexDirection: "row" }}>
							<Feather name="feather" style={styles.cardIcon} />
							<View style={{flexDirection: "column", justifyContent: "center"}}>
								<Text><Text style={{fontWeight: 'bold'}}>Description: </Text> {this.state.description}</Text>
							</View>
						</View>
						<View style={styles.hr}/>

						{this.state.carMake || this.state.carModel? 
							<View style={{flexDirection: "row", marginTop: 5, marginBottom: 5}}>
								<View style={{flexDirection: "column", justifyContent: "center"}}>
									<FontAwesome name="car" style={styles.cardIcon} />
								</View>
								<View style={{flexDirection: "column", justifyContent: "center"}}>
									<Text><Text style={{fontWeight: 'bold'}}>Make: </Text> {this.state.carMake}</Text>
									<Text><Text style={{fontWeight: 'bold'}}>Model: </Text> {this.state.carModel}</Text>
								</View>
							</View> 
							: null 
						}
						
						{this.state.isBookingPlaced?
							<View>
								<View style={styles.cancelHr}/>
								<View style={{flexDirection: "row", justifyContent: "center"}}>
									<View style={{flexDirection: "column", justifyContent: "center"}}>
										<Feather name="x" style={styles.cancelIcon} />
									</View>
									<TouchableOpacity  onPress={this._cancelBooking} >
										<Text style={{marginTop: 2}}>
											CANCEL BOOKING
										</Text>
									</TouchableOpacity>
								</View>
							</View>
						: 
							<View style={{flexDirection: "row", justifyContent: "center", marginTop: 10}}>
								<View style={{flexDirection: "column", justifyContent: "center", paddingLeft: 70}}>
									<Feather name="check" style={styles.placeBookingIcon} />
								</View>

								<TouchableOpacity style={{paddingRight: 70}} onPress={this._newBooking}>
									<Text style={{textAlign: 'center', marginTop: 2}}>
										PLACE BOOKING
									</Text> 
								</TouchableOpacity>	
							</View>									
						}

					</View>
				
				
					<Modal
						animationType="slide"
						transparent={true}
						visible = {this.state.modalVisible}
						onRequestClose={this._hideModal}>
						
						<View style={{paddingTop: 50, backgroundColor: '#00000080', flex: 1}}>
							<View  style={{backgroundColor: '#fff', padding: 20, flex: 1}}>
								<View style={{flexDirection: "row" }}>
									<Feather name="feather" style={styles.cardIcon} />
									<View style={{flexDirection: "column", justifyContent: "center"}}>
										<Text size={{fontSize: 20}}>DESCRIPTION</Text>
									</View>
								</View>
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
								<View style={{flexDirection: "row", justifyContent: "center", marginTop: 10}}>									
									<Feather name="check" style={styles.cardIcon} />									
									<TouchableOpacity  onPress={this._hideModal} >
										<Text style={{marginTop: 10}}>
											DONE
										</Text>
									</TouchableOpacity>
								</View>

							</View>
						</View>

			        </Modal>
				

					<DateTimePicker
						isVisible={this.state.isDateTimePickerVisible}
						onConfirm={this._handleDateTimePicked}
						onCancel={this._hideDateTimePicker}
						mode="datetime"
			        />
					  

				</View>
			</ScrollView>

		);
	}
}	

const styles = StyleSheet.create({
	container: {
        height: Dimensions.get('window').height + 50,
        padding: 20,
    },
	header: {
    	backgroundColor: "white",
    	borderRadius: 4,
    	padding: 10,
    	height: "25%",
    	padding: 20
    },
    actionCard: {
    	backgroundColor: "white",
    	borderRadius: 4,
    	marginTop: 10,
    	padding: 20,
    },
    bookingsCard: {	
    	backgroundColor: "white",
    	borderRadius: 4,
    	marginTop: 10,
    	marginBottom: 20,
    	padding: 20,
    	flex: 1
    	
    },
	headingIcon: {
		fontSize: 25,
		height: 40,
		marginRight: 10,
		color: "#4F8EF7",
	},
	cardIcon: {
		fontSize: 25,
		height: 40,
		marginRight: 10,
		color: "#4F8EF7",
		paddingTop: 8
	},
	cancelIcon: {
		fontSize: 25,
		height: 40,
		marginRight: 10,
		color: "#4F8EF7",
		paddingTop: 0,
		color: "rgba(231,76,60,1)"
	},
	placeBookingIcon: {
		fontSize: 25,
		height: 40,
		marginRight: 10,
		color: "#4F8EF7",
		paddingTop: 0,
		color: "#4F8EF7"
	},
	bookingsHr: {
		borderBottomColor: '#d3d3d3',
		borderBottomWidth: 1,
		marginTop: 10,
		marginBottom: 5,
		width: '100%',
		alignSelf: 'center'
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
		marginTop: 5,
		marginBottom: 5,
		width: '90%',
		alignSelf: 'center'
    },
	descHr: {
		borderBottomColor: '#d3d3d3',
		borderBottomWidth: 1,
		marginTop: 10,
		width: '90%',
		alignSelf: 'center'
    },
	cancelHr: {
		borderBottomColor: '#d3d3d3',
		borderBottomWidth: 1,
		width: '100%',
		alignSelf: 'center',
		marginTop: 10,
		marginBottom: 15
    },
	buttonContainer: { 
		paddingVertical: 15, 
		marginTop: 20,
		width: 250,
		alignSelf: 'center'
    },
    button: {
    	flexDirection: "row", 
    	paddingTop: 10,
    	paddingBottom: 10
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
