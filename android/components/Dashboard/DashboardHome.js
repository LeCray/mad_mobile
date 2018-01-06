import React, { Component } from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity, AsyncStorage} from 'react-native';




export class DashboardHome extends Component {
	

	constructor(props) {
		super(props);
		this.DataStreamBtn = this.DataStreamBtn.bind(this);
		this.BookingBtn = this.BookingBtn.bind(this);
		this.InvoicesBtn = this.InvoicesBtn.bind(this);
		this.CarsBtn = this.CarsBtn.bind(this);
	}

	
	static navigationOptions = {
		drawerLabel: 'Dashboard'
	}

	
	DataStreamBtn = function () {
		console.log('DataStream is running')
		this.props.navigation.dispatch({
			type: 'Navigation/NAVIGATE',
			routeName: 'DataStream'
		});
	}

	BookingBtn = function () {
		console.log('Booking is running')
		this.props.navigation.dispatch({
			type: 'Navigation/NAVIGATE',
			routeName: 'Bookings'
		});
	}

	InvoicesBtn = function () {
		console.log('Invoices is running')
		this.props.navigation.dispatch({
			type: 'Navigation/NAVIGATE',
			routeName: 'Invoices'
		});
	}

	CarsBtn = function () {
		console.log('Cars is running')
		this.props.navigation.dispatch({
			type: 'Navigation/NAVIGATE',
			routeName: 'Cars'
		});
	}

	componentWillMount() {
		AsyncStorage.getItem('email')
		.then((value) => { 
			this.setState({'email': value})	
		});
	}
	
  render() {
    return(  
		<View style={{paddingLeft: 10, paddingRight: 10, paddingTop: 30}}>
			<TouchableOpacity style={styles.buttonContainer} onPress={this.DataStreamBtn}>       
				<Text style={{color: 'white', textAlign: 'center'}}>Data Stream</Text>
			</TouchableOpacity>

			<TouchableOpacity style={styles.buttonContainer} onPress={this.BookingBtn} >       
				<Text style={{color: 'white', textAlign: 'center'}}>Bookings</Text>
			</TouchableOpacity>

			<TouchableOpacity style={styles.buttonContainer} onPress={this.InvoicesBtn.bind(this)}>       
				<Text style={{color: 'white', textAlign: 'center'}}>Invoices</Text>
			</TouchableOpacity>

			<TouchableOpacity style={styles.buttonContainer} onPress={this.CarsBtn}>       
				<Text style={{color: 'white', textAlign: 'center'}}>Cars</Text>
			</TouchableOpacity>
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