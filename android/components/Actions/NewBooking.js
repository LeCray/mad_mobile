import React, { Component } from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity, AsyncStorage} from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';


export class NewBooking extends Component {


	constructor(props) {
		super(props);
		this.state = {isDateTimePickerVisible: false,};
		this.state = {dateTime: ""};
	}

	_showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true })

  	_hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false })

	_handleDateTimePicked = (dateTime) => {
		console.log('A date has been picked: ', dateTime);

		

		this.setState({dateTime: dateTime});

		var dateTimeStr = JSON.stringify(dateTime);
		

		this._hideDateTimePicker();
	};

	componentDidMount() {
		
		split = [];

		var words = this.state.dateTime.split(" ")
		split.push(words)
		console.log(this.state.dateTime)

	}

	render() {


		return(  
			<View style={{ flex: 1 }}>
				
				<Text style={styles.booking}>DATE: </Text>
				<View style={styles.hr}/>

				<Text style={styles.booking}>TIME: </Text>
				<View style={styles.hr}/>

				<Text style={styles.booking}>DESCRIPTION: </Text>
				<View style={styles.hr}/>

				<DateTimePicker
					isVisible={this.state.isDateTimePickerVisible}
					onConfirm={this._handleDateTimePicked}
					onCancel={this._hideDateTimePicker}
					mode="datetime"
		        />
				  
				<ActionButton buttonColor="rgba(231,76,60,1)">
					<ActionButton.Item buttonColor='#9b59b6' title="New Date/Time" onPress={this._showDateTimePicker}>
						<Icon name="md-create" style={styles.actionButtonIcon} />
					</ActionButton.Item>
				</ActionButton>
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

})