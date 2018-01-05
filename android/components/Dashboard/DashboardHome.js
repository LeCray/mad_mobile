import React, { Component } from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity, AsyncStorage} from 'react-native';




export class DashboardHome extends Component {

	constructor(props) {
		super(props);
		this.goBook = this.goBook.bind(this);
	}

	componentWillMount() {
		AsyncStorage.getItem('email')
		.then((value) => { 
			this.setState({'email': value})	
			console.log(this.state.email)
		});
	}
	
	static navigationOptions = {
		drawerLabel: 'Dashboard'
	}

	goBook = function () {
		console.log('goBook is running')
		this.props.navigation.dispatch({
			type: 'Navigate',
			routeName: 'MainScreen',
			action: {
				type: 'Navigate',
				routeName: 'Bookings',
			},
		});
	}
	
  render() {
    return(  
		<View style={{paddingLeft: 10, paddingRight: 10, paddingTop: 30}}>
			<TouchableOpacity style={styles.buttonContainer}>       
				<Text style={{color: 'white', textAlign: 'center'}}>Data Stream</Text>
			</TouchableOpacity>

			<TouchableOpacity style={styles.buttonContainer} onPress={this.goBook} navigation={this.props.navigation}>       
				<Text style={{color: 'white', textAlign: 'center'}}>Bookings</Text>
			</TouchableOpacity>

			<TouchableOpacity style={styles.buttonContainer}>       
				<Text style={{color: 'white', textAlign: 'center'}}>Invoices</Text>
			</TouchableOpacity>

			<TouchableOpacity style={styles.buttonContainer}>       
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