import React, { Component } from 'react';
import {Platform, StyleSheet, Text, View, TextInput,
 AsyncStorage, TouchableOpacity, KeyboardAvoidingView, 
 Dimensions, ScrollView, Modal, ActivityIndicator, Image, findNodeHandle} from 'react-native';
 import {DrawerStack} from '../Dashboard/DashboardHome';
 import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
 import Feather from 'react-native-vector-icons/Feather';


export default class Login extends Component {

	static navigationOptions = {
		header: null
	}

	constructor(props) {
		super(props);
		this.state = {
			email: '', 
			password: '', 
			logged_in: false,
			logging_in: false,
			modalVisible: false,
			invalidModalVisible: false
		};
		this._login = this._login.bind(this);
		this._signUp = this._signUp.bind(this);
					
	}

	componentWillMount() {
		AsyncStorage.getItem('email')
		.then((value) => { 
			if (value !== null){
				this.props.navigation.navigate('Main');
				console.log('Automatically validated')
			} else if (value == null) {
				console.log('Not Automatically Validated')
			}
		});
	}


	_hideModal = () => this.setState({ modalVisible: false })
	_hideInvalidModal = () => this.setState({ invalidModalVisible: false })
	

	 async _login() {
	 	this.setState({'logging_in': true})
	 	this.setState({"modalVisible": true})

        await fetch("http://mad-beta.herokuapp.com/api/v1/mobile_login", {
			method: "POST", 
			headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
			body: JSON.stringify({
				email: this.state.email, 
				password: this.state.password
			}), 

        })
        .then(response => response.json())
        .then((responseData) => {
			console.log(responseData);
			
			if (responseData.admin_authenticated == true){
				//ADMIN THINGS
				console.log("You're logged in as ADMIN");			
				AsyncStorage.setItem('email', responseData.email)
			
				AsyncStorage.getItem('email')
				.then((value) => {
					this.setState({'email': value})
					console.log("Async has stored user email: ", value)
				})
				.catch((error) => {
					console.error(error);
				})
				

				this.setState({'logging_in': false})
				this.setState({"modalVisible": false})
				this.props.navigation.navigate('Main');

			} else if (responseData.driver_authenticated == true) {
				//DRIVER THINGS
				console.log("You're logged in as DRIVER")
				AsyncStorage.setItem('email', responseData.email)
			
				AsyncStorage.getItem('email')
				.then((value) => {
					this.setState({'email': value})
					console.log("Async has stored user email: ", value)
				})
				.catch((error) => {
					console.error(error);
				})
				
				this.setState({'logging_in': false})
				this.setState({"modalVisible": false})
				this.props.navigation.navigate('Main');
			} else {
				console.log("Invalid User")
				this.setState({invalidModalVisible: true})

				this.setState({'logging_in': false})
				this.setState({"modalVisible": false})
			}
        })
        .catch((error) => {
          console.error(error);
        })
        .done();
    }

	_signUp() {
		this.props.navigation.navigate('SignUp')
	}

	_scrollToInput = (reactNode: any) => {
	  // Add a 'scroll' ref to your ScrollView
	  this.scroll.props.scrollToFocusedInput(reactNode)
	}
    


	render() {
		//const {navigate} = this.props.navigation

		return(  
			   <KeyboardAwareScrollView innerRef={ref => {this.scroll = ref}}>		
				<View  style={styles.container}>
					<View style={styles.header}>
						<View style={styles.image}>							
							<Image
							  style={{	
							  	marginTop: 20,
							    width: "80%",
							    height: "80%"
							  }}
							  source={require('../../app/src/main/res/mad_logo.png')}
							/>									
						</View>
						<Text style={{alignSelf: "center", fontStyle: "italic", fontSize: 17}}>Leading The Way Forward!!</Text>
								
						<View style={styles.inputSection}>
							<TextInput style = {styles.input} 
									onFocus={(event: Event) => {
										this._scrollToInput(findNodeHandle(event.target))
									}} 
									autoCapitalize="none" 
									onSubmitEditing={() => this.passwordInput.focus()} 
									blurOnSubmit={ false }
									autoCorrect={false} 
									keyboardType='email-address' 
									returnKeyType="next" 
									placeholder='Email:' 
									placeholderTextColor='black'
									onChangeText={(email) => this.setState({email})} />

							<TextInput style = {styles.input} 
									onFocus={(event: Event) => {
										this._scrollToInput(findNodeHandle(event.target))
									}}   
									autoCapitalize="none" 
									returnKeyType="go" 
									ref={(input)=> this.passwordInput = input} 
									onSubmitEditing={this._login} 
									placeholder='Password:' 
									placeholderTextColor='black' 
									secureTextEntry
									onChangeText={(password) => this.setState({password})} />

							<TouchableOpacity style={styles.buttonContainer} onPress={this._login} >      
									<Text style={styles.buttonText}>LOGIN</Text>
							</TouchableOpacity>
							<TouchableOpacity style={styles.buttonContainer} onPress={this._signUp} >      
									<Text style={styles.buttonText}>SIGN UP</Text>
							</TouchableOpacity>
						</View> 
					</View>


					<Modal
						animationType={'none'}
						transparent={true}
						visible = {this.state.modalVisible}
						onRequestClose={this._hideModal}>
						
						<View style={styles.modalBackground}>
							<View style={styles.activityIndicatorWrapper}>
								<View style={{flexDirection: "row"}}>
									<ActivityIndicator animating={this.state.logging_in} size="large" color="#666666" />
									<View style={{flexDirection: "column", justifyContent: "center"}}>
										<Text style={{fontSize: 16, marginLeft: 14}}>Logging in...</Text>
									</View>
								</View>

							</View>
						</View>
			        </Modal>

			        <Modal
						animationType={'none'}
						transparent={true}
						visible = {this.state.invalidModalVisible}
						onRequestClose={this._hideInvalidModal}>
						
						<View style={styles.modalBackground}>
							<View style={styles.activityIndicatorWrapper}>
								<View style={{flexDirection: "row"}}>
									<Feather name="x" style={styles.modalxIcon} />
									<View style={{flexDirection: "column", justifyContent: "center"}}>
										<Text style={{fontSize: 16, marginLeft: 14}}>Invalid</Text>
									</View>
								</View>

							</View>
						</View>
			        </Modal>

				</View>	
			</KeyboardAwareScrollView>
		)
	}
}

const styles = StyleSheet.create({
    container: {
        height: Dimensions.get('window').height,
    },
    header: {
    	flex: 1,
    	backgroundColor: "white",
    	borderRadius: 4,
    	padding: 20,
    },
    inputSection: {    	    
    	marginTop: 20  	
    },
    input:{
		margin: 20,
		marginBottom: 0,
		height: 50,
		paddingHorizontal: 10,
		fontSize: 16,
    },
    hr: {
		borderBottomColor: '#d3d3d3',
		borderBottomWidth: 1,
		marginTop: 10,
		marginBottom: -10,
		width: '100%',
		alignSelf: 'center'
    },
    buttonContainer:{
    	marginTop: 20,
    },
    buttonText:{
        color: "black",
        textAlign: 'center',
        fontWeight: '700'
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
	},
	image: {
		flexDirection: "row", 
		justifyContent: "center", 
		height: "30%", 
		marginTop: "20%", 
		marginBottom: -10, 
		paddingLeft: 15,		
	},
	modalxIcon: {
		fontSize: 25,				
		color: "rgba(231,76,60,1)",
	},
})

