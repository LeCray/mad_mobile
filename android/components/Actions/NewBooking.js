import React, { Component } from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity, AsyncStorage} from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';


export class NewBooking extends Component {

	
	static navigationOptions = {
		title: 'New Booking',
		mode: 'modal',
		headerMode: 'none'
	}

	constructor(props) {
		super(props);
		this.state = {isDateTimePickerVisible: false,};
	}

	_showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true })

  	_hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false })

	_handleDateTimePicked = (dateTime) => {
		console.log('A date has been picked: ', dateTime);
		this._hideDateTimePicker();
	}

	render() {
		return(  
			<View style={{ flex: 1 }}>
				<TouchableOpacity style={styles.buttonContainer} onPress={this._showDateTimePicker}>
					<Text style={{color: 'white', textAlign: 'center'}}>Select Date & Time</Text>
				</TouchableOpacity>
				<DateTimePicker
				isVisible={this.state.isDateTimePickerVisible}
				onConfirm={this._handleDateTimePicked}
				onCancel={this._hideDateTimePicker}
				mode="datetime"
				/>
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
	  marginTop: 10,
	  width: 250,
    },

})