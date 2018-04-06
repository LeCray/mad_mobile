import React, { Component } from 'react';
import {Platform, StyleSheet, Text, View, 
		TouchableOpacity, AsyncStorage, ScrollView} from 'react-native';
import FCM, { FCMEvent } from "react-native-fcm";
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import { withNavigation } from 'react-navigation';
var { Dimensions } = require('react-native')


export class DashboardHome extends Component {
	

	constructor(props) {
		super(props);
		this.DataStreamBtn = this.DataStreamBtn.bind(this);
		this.BookingBtn = this.BookingBtn.bind(this);
		this.InvoicesBtn = this.InvoicesBtn.bind(this);
		this.CsiBtn = this.CsiBtn.bind(this);
		this.QuotationsBtn = this.QuotationsBtn.bind(this);

		this.state = {
			fcm_token: "",
			email: ""
		};
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
	
	QuotationsBtn = function () {
		console.log('Quotations is running')
		this.props.navigation.dispatch({
			type: 'Navigation/NAVIGATE',
			routeName: 'Quotations'
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
			fetch("http://10.0.0.12:3000/api/v1/fcm", {
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
	const {navigate} =this.props.navigation;



    return(  
    	<ScrollView>
			<View style={styles.container}>		

				<View style={styles.header}>
					<View style={{flexDirection: "row"}}>	
						<Text style={{fontSize: 30, color: "#4F8EF7"}}>MAD APP</Text>
					</View>
					<Text>Manage your account</Text>
				</View>

				<View style={styles.btnsCard}>

					<View style={styles.buttonContainer}>
						<Feather name="calendar" color="#4F8EF7" style={styles.cardIcon} />      
						<View style={{flexDirection: "column", justifyContent: 'center'}}>
							<TouchableOpacity onPress={this.BookingBtn}>       
								<Text style={styles.text}>Bookings</Text>
							</TouchableOpacity>
						</View>
					</View>
					
					<View style={styles.buttonContainer}>
						<Feather name="bell" color="#4F8EF7" style={styles.cardIcon} />      
						<View style={{flexDirection: "column", justifyContent: 'center'}}>
							<TouchableOpacity onPress={this.QuotationsBtn}>       
								<Text style={styles.text}>Quotations</Text>
							</TouchableOpacity>
						</View>
					</View>

					<View style={styles.buttonContainer}>
						<Feather name="file-text" color="#4F8EF7" style={styles.cardIcon} />      
						<View style={{flexDirection: "column", justifyContent: 'center'}}>
							<TouchableOpacity onPress={this.InvoicesBtn}> 
								<Text style={styles.text}>Invoices</Text>
							</TouchableOpacity>
						</View>
					</View>
					
					<View style={styles.buttonContainer}>	
						<Feather name="shield" color="#4F8EF7" style={styles.cardIcon} />      
						<View style={{flexDirection: "column", justifyContent: 'center'}}>	
							<TouchableOpacity >       
								<Text style={styles.text}>CSI</Text>
							</TouchableOpacity>
						</View>
					</View>

					<View style={styles.buttonContainer}>
						<FontAwesome name="car" color="#4F8EF7" style={styles.cardIcon} />      
						<View style={{flexDirection: "column", justifyContent: 'center'}}>
							<TouchableOpacity onPress={this.DataStreamBtn}>       
								<Text style={styles.text}>Data Stream</Text>
							</TouchableOpacity>
						</View>
					</View>
				</View>
			</View>
		</ScrollView>
    )
  }
}

const styles = StyleSheet.create({
	container: {
        height: Dimensions.get('window').height,
        padding: 20,
    },
	header: {
    	backgroundColor: "white",
    	borderRadius: 4,
    	padding: 10,
    	height: "25%",
    	padding: 20
    },
	buttonContainer: {
		//borderBottomWidth: 1,
		//borderBottomColor: '#d3d3d3',
		flexDirection: "row",
		paddingVertical: 15, 
		marginTop: 0,
		width: 250,
		alignSelf: 'center'
    },
    text: {
    	color: '#4F8EF7', 
    	textAlign: 'center'
    },
    btnsCard: {	
    	backgroundColor: "white",
    	borderRadius: 4,
    	marginTop: 10,
    	padding: 20,
    	flex: 1
    },
	cardIcon: {
		fontSize: 25,
		height: 40,
		marginRight: 10,
		color: "#4F8EF7",
		paddingTop: 8
	},

})