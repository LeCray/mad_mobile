import React, { Component } from 'react';
import {Platform, StyleSheet, Dimensions, Text, View} from 'react-native';
import Pdf from 'react-native-pdf';




export class Invoices extends Component {

	static navigationOptions = {
		title: 'Invoices'
	}

/*
	componentWillMount() {

		fetch("http://10.199.253.13:3000/api/v1/invoices", {
			method: "POST", 
			headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
			body: JSON.stringify({
				email: "captain@gmail.com"
			}), 
        })
        .then((responseData) => {
			console.log('Booking Cancelled')
			ToastAndroid.show('Booking Request Cancelled', ToastAndroid.LONG);
        })
        .catch((error) => {
          console.error(error);
        })
        .done();
	}
*/
	render() {
		const source = {uri:'https://www.tke.org/files/file/The_48_Laws_of_Power.pdf'};
		return(  
			<View style={styles.container}>
				
				<Pdf
                    source={source}
                    onLoadComplete={(numberOfPages,filePath)=>{
                        console.log('number of pages: ', numberOfPages);
                    }}
                    onPageChanged={(page,numberOfPages)=>{
                        console.log('current page: ', page);
                    }}
                    onError={(error)=>{
                        console.log(error);
                    }}
                    style={styles.pdf}/>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 0,
    },

	buttonContainer: {
		backgroundColor: "#2980b6", 
		paddingVertical: 15, 
		marginTop: 10
    },
	pdf: {
        flex:1,
        width:Dimensions.get('window').width,
    }
 

})