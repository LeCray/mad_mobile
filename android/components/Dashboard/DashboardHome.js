import React, { Component } from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity, AsyncStorage} from 'react-native';
import FCM, { FCMEvent } from "react-native-fcm";


export class DashboardHome extends Component {
	

	constructor(props) {
		super(props);
		this.DataStreamBtn = this.DataStreamBtn.bind(this);
		this.BookingBtn = this.BookingBtn.bind(this);
		this.InvoicesBtn = this.InvoicesBtn.bind(this);
		this.CsiBtn = this.CsiBtn.bind(this);
		this.QuotesBtn = this.QuotesBtn.bind(this);

		this.state = {
			fcm_token: "",
			email: ""
		};
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

	componentDidMount () {
		FCM.on(FCMEvent.RefreshToken, token => {
		  console.log("FCM Token Refresh: ",token);
		});

		FCM.on('FCMTokenRefreshed', token => {
		  console.log("FCM Token Refresh: ", token);
		});

		FCM.requestPermissions();
		FCM.getFCMToken().then(token => {
			this.setState({ fcm_token: token });
			console.log('getFCMToken: ', token)
			
			//updating fcm token on rails server.
			fetch("http://192.168.43.42:3000/api/v1/fcm", {
				method: "POST", 
				headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
				body: JSON.stringify({
					fcm_token: token,
					email: "captain@gmail.com"
				}), 
	        })
	        .then(() => {
				console.log('FCM Token sent to rails server: ', token)
	        })
	        .catch((error) => {
	          console.error(error);
	        })
	        .done();
		});
	}
	
  render() {
    return(  
		<View style={styles.container}>		
			<View style={styles.buttonContainer}>
				<TouchableOpacity onPress={this.BookingBtn}>       
					<Text style={{color:'rgba(231,76,60,1)', textAlign: 'center'}}>Bookings</Text>
				</TouchableOpacity>
			</View>
			
			<View style={styles.buttonContainer}>
				<TouchableOpacity onPress={this.QuotesBtn}>       
					<Text style={{color:'rgba(231,76,60,1)', textAlign: 'center'}}>Quotes</Text>
				</TouchableOpacity>
			</View>

			<View style={styles.buttonContainer}>
				<TouchableOpacity onPress={this.InvoicesBtn}>       
					<Text style={{color:'rgba(231,76,60,1)', textAlign: 'center'}}>Invoices</Text>
				</TouchableOpacity>
			</View>
			
			<View style={styles.buttonContainer}>		
				<TouchableOpacity onPress={this.CsiBtn}>       
					<Text style={{color:'rgba(231,76,60,1)', textAlign: 'center'}}>CSI</Text>
				</TouchableOpacity>
			</View>

			<View style={styles.buttonContainer}>
				<TouchableOpacity onPress={this.DataStreamBtn}>       
					<Text style={{color:'rgba(231,76,60,1)', textAlign: 'center'}}>Data Stream</Text>
				</TouchableOpacity>
			</View>
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

})