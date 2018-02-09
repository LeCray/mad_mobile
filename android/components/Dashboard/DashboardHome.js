import React, { Component } from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity, AsyncStorage} from 'react-native';




export class DashboardHome extends Component {
	

	constructor(props) {
		super(props);
		this.DataStreamBtn = this.DataStreamBtn.bind(this);
		this.BookingBtn = this.BookingBtn.bind(this);
		this.InvoicesBtn = this.InvoicesBtn.bind(this);
		this.CsiBtn = this.CsiBtn.bind(this);
		this.QuotesBtn = this.QuotesBtn.bind(this);
	}

	
	static navigationOptions = {
		drawerLabel: 'Dashboard'
	}

	
	DataStreamBtn = function () {
		console.log('DataStream is running')
		this.props.navigation.dispatch({
			type: 'Navigation/NAVIGATE',
			routeName: 'OBDReader'
		});
	}

	BookingBtn = function () {
		console.log('Booking is running')
		this.props.navigation.dispatch({
			type: 'Navigation/NAVIGATE',
			routeName: 'Bookings'
		});
	}
	
	QuotesBtn = function () {
		console.log('Quotes is running')
		this.props.navigation.dispatch({
			type: 'Navigation/NAVIGATE',
			routeName: 'Quotes'
		});
	}

	InvoicesBtn = function () {
		console.log('Invoices is running')
		this.props.navigation.dispatch({
			type: 'Navigation/NAVIGATE',
			routeName: 'Invoices'
		});
	}

	CsiBtn = function () {
		console.log('Csi is running')
		this.props.navigation.dispatch({
			type: 'Navigation/NAVIGATE',
			routeName: 'Csi'
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
		<View style={styles.container}>

			<TouchableOpacity style={styles.buttonContainer} onPress={this.BookingBtn}>       
				<Text style={{color: 'white', textAlign: 'center'}}>Bookings</Text>
			</TouchableOpacity>

			<TouchableOpacity style={styles.buttonContainer} onPress={this.QuotesBtn}>       
				<Text style={{color: 'white', textAlign: 'center'}}>Quotes</Text>
			</TouchableOpacity>

			<TouchableOpacity style={styles.buttonContainer} onPress={this.InvoicesBtn}>       
				<Text style={{color: 'white', textAlign: 'center'}}>Invoices</Text>
			</TouchableOpacity>

			<TouchableOpacity style={styles.buttonContainer} onPress={this.CsiBtn}>       
				<Text style={{color: 'white', textAlign: 'center'}}>CSI</Text>
			</TouchableOpacity>

			<TouchableOpacity style={styles.buttonContainer} onPress={this.DataStreamBtn}>       
				<Text style={{color: 'white', textAlign: 'center'}}>Data Stream</Text>
			</TouchableOpacity>
		</View>
    )
  }
}

const styles = StyleSheet.create({
    container: {
		flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        paddingLeft: 10, 
        paddingRight: 10,
        paddingTop: 30,
    },

	buttonContainer: {
      backgroundColor: "#2980b6", 
	  paddingVertical: 15, 
	  marginTop: 20,
	  width: 200,


    },

})