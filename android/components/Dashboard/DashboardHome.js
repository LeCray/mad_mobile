import React, { Component } from 'react';
import {Platform, StyleSheet, Text, View, 
		TouchableOpacity, AsyncStorage, ScrollView, 
		Image, Modal, ActivityIndicator} from 'react-native';
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
			email: "",
			loading: true,
			loadingModalVisible: true
		};
	}

	
	static navigationOptions = {
		drawerLabel: 'Home',
		drawerIcon: <Feather name="layers" size={20} color="#0844aa"/>
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
			fetch("http://mad-beta.herokuapp.com/api/v1/fcm", {
				method: "POST", 
				headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
				body: JSON.stringify({
					fcm_token: token,
					email: this.state.email
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

	_endLoad = () => {
		this.setState({loading: false})	
		this.setState({loadingModalVisible: false})
	}
	_hideLoadingModal = () => this.setState({ loadingModalVisible: false })


  	render() {
	const {navigate} =this.props.navigation;



    return(  
    	<ScrollView>
			<View style={styles.container}>		

				<View style={styles.header}>
					<View style={styles.logo}>							
						<Image
						  style={{width: "80%", height: "100%"}}
						  onLoad={this._endLoad}							    					  							   						 
						  source={require('../mad_logo.png')}
						/>									
					</View>
					<Text style={{alignSelf: "center", fontSize: 17, marginTop: 10}}>Manage Your Account</Text>
				</View>

				<View style={styles.btnsCard}>

					<View style={styles.buttonContainer}>
						<Feather name="calendar" color="#51A8B1" style={styles.cardIcon} />      
						<View style={{flex: 1, flexDirection: "column", justifyContent: "center"}}>
							<TouchableOpacity style={styles.button} onPress={this.BookingBtn}>  							
								<Text style={styles.text}>BOOKINGS</Text>
							</TouchableOpacity>
						</View>
					</View>
					
					<View style={styles.buttonContainer}>
						<Feather name="bell" color="#4F8EF7" style={styles.cardIcon} />      
						<View style={{flex: 1, flexDirection: "column", justifyContent: 'center'}}>
							<TouchableOpacity style={styles.button} onPress={this.QuotationsBtn}>       
								<Text style={styles.text}>QUOTATIONS</Text>
							</TouchableOpacity>
						</View>
					</View>

					<View style={styles.buttonContainer}>
						<Feather name="file-text" color="#4F8EF7" style={styles.cardIcon} />      
						<View style={{flex: 1, flexDirection: "column", justifyContent: 'center'}}>
							<TouchableOpacity style={styles.button} onPress={this.InvoicesBtn}> 
								<Text style={styles.text}>INVOICES</Text>
							</TouchableOpacity>
						</View>
					</View>
					
					<View style={styles.buttonContainer}>	
						<Feather name="shield" color="#4F8EF7" style={styles.cardIcon} />      
						<View style={{flex: 1, flexDirection: "column", justifyContent: 'center'}}>	
							<TouchableOpacity style={styles.button} onPress={this.CsiBtn}>       
								<Text style={styles.text}>CSI</Text>
							</TouchableOpacity>
						</View>
					</View>

					<View style={styles.buttonContainer}>
						<FontAwesome name="car" color="#4F8EF7" style={styles.cardIcon} />      
						<View style={{flex: 1, flexDirection: "column", justifyContent: 'center'}}>
							<TouchableOpacity style={styles.button} onPress={this.DataStreamBtn}>       
								<Text style={styles.text}>DATA STREAM</Text>
							</TouchableOpacity>
						</View>
					</View>
				</View>

				<Modal
					animationType={'none'}
					transparent={true}
					visible = {this.state.loadingModalVisible}
					onRequestClose={this._hideLoadingModal}>
					
					<View style={styles.modalBackground}>
						<View style={styles.activityIndicatorWrapper}>
							<View style={{flexDirection: "row"}}>
								<ActivityIndicator animating={this.state.loading} size="large" color="#666666" />					
							</View>

						</View>
					</View>
		        </Modal>
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
		height: "35%",
    	backgroundColor: "white",
    	borderRadius: 4, 
    	padding: 30   	        
    },
	buttonContainer: {
		flexDirection: "row",
		paddingVertical: 15, 
		marginTop: 0,
		width: 250,
		alignSelf: 'center'
    },
    button: {
    	flexDirection: "row", 
    	paddingTop: 10,
    	paddingBottom: 10
    },
    text: {
    	color: '#6E6E6E', 
    	textAlign: 'center',
    	flexDirection: "column",
    	justifyContent: "center"
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
		color: "#51A8B1",
		paddingTop: 8
	},
	logo: {
		marginTop: -10,
		flexDirection: "row", 
		justifyContent: "center", 
		height: "90%", 		 				
	},
	modalBackground: {
	    flex: 1,
	    alignItems: 'center',
	    flexDirection: 'column',
	    justifyContent: 'space-around',
	    backgroundColor: '#00000040'
	},
	activityIndicatorWrapper: {
	    backgroundColor: '#FFFFFF',
	    height: 80,
	    width: 200,
	    borderRadius: 10,
	    display: 'flex',
	    alignItems: 'center',
	    justifyContent: 'space-around'
	}

})