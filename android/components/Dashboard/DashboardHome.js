import React, { Component } from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity} from 'react-native';




export class DashboardHome extends Component {
  render() {
    return(  
		<View style={{paddingLeft: 10, paddingRight: 10}}>
			<TouchableOpacity style={styles.buttonContainer}>       
				<Text style={{color: 'white', textAlign: 'center'}}>Data Stream</Text>
			</TouchableOpacity>

			<TouchableOpacity style={styles.buttonContainer}>       
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