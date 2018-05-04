import React, { Component } from 'react';
import {Platform, StyleSheet, Text, View, TextInput,
 AsyncStorage, TouchableOpacity, KeyboardAvoidingView, 
 Dimensions, ScrollView, Modal, ActivityIndicator, Image, findNodeHandle} from 'react-native';
 import {DrawerStack} from '../Dashboard/DashboardHome';
 import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'


export default class SignUp extends Component {

	static navigationOptions = {
		header: null
	}

	constructor(props) {
		super(props);
		this.state = {
			email: '',
			first_name: '',
			last_name: '',
			tel: '', 
			password: '', 
			password_confirm: '',
			signed_up: false,
			signing_up: false,
			logging_in: false,
			loggingInModalVisible: false,
			signingUpModalVisible: false,
			xPasswordModalVisible: false			
		};
		this._signUp = this._signUp.bind(this);
		this._backToLogin = this._backToLogin.bind(this);					
	}


	_hideSigningUpModal = () => this.setState({ signingUpModalVisible: false })
	_hidexPasswordModal = () => this.setState({ xPasswordModalVisible: false })
	_hideLoggingInModal = () => this.setState({ loggingInModalVisible: false })

	_scrollToInput = (reactNode: any) => {	  
	  this.scroll.props.scrollToFocusedInput(reactNode)
	}
	_backToLogin () {
		this.props.navigation.navigate('Login')
	}
	

	async _signUp() {
	 	console.log(this.state.password + this.state.password_confirm)
		if (this.state.password != this.state.password_confirm) {

	 		this.setState({"xPasswordModalVisible": true})
	 		setTimeout(() => {this.setState({xPasswordModalVisible: false})}, 2000)
	 		this.passwordInput.focus()

		} else  {
		
		 	this.setState({"signingUpModalVisible": true, 'signing_up': true})	

	        await fetch("http://mad-beta.herokuapp.com/api/v1/mobile_sign_up", {
				method: "POST", 
				headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
				body: JSON.stringify({
					first_name: this.state.first_name,
					last_name: this.state.last_name,
					tel: this.state.tel,
					email: this.state.email, 
					password: this.state.password,
					password_confirm: this.state.password_confirm
				}), 

	        })
	        .then(response => response.json())
	        .then((responseData) => {
				console.log(responseData);
				if (responseData.signUp == "Successfull") {
					this.setState({"signingUpModalVisible": false, 'signing_up': false})	
					this.setState({"loggingInModalVisible": true, 'logging_in': true})	

					AsyncStorage.setItem('email', this.state.email)
				
					setTimeout(() => {this.props.navigation.navigate('Main')}, 4000);
					setTimeout(() => {this.setState({"loggingInModalVisible": false, 'logging_in': false})}, 5000)
				}
		  	})
	        .catch((error) => {
	          console.error(error);
	        })
	        .done();
	    }
    }

    
	render() {
		const {navigate} = this.props.navigation
		
		return(  
			<KeyboardAwareScrollView innerRef={ref => {this.scroll = ref}}>
				<View  style={styles.container}>
					<View style={styles.header}>

						<View style={{flexDirection: "row", paddingLeft: 25}}>												
							<Image
							  style={{width: 60, height: 60, marginTop: -20}}							    							    							  
							  source={require('../../app/src/main/res/mad_logo_min.png')}
							/>								
							<Text style={{marginTop: 3, marginLeft: 10, fontSize: 20}}> SIGN UP </Text>
						</View>						
														
						<View style={styles.inputSection}>
							{/* FIRST NAME */}
							<TextInput style = {styles.input} 
								onFocus={(event: Event) => {
									this._scrollToInput(findNodeHandle(event.target))
								}} 
								blurOnSubmit={ false }
								autoCapitalize="sentences" 
								onSubmitEditing={() => this.last_nameInput.focus()} 
								autoCorrect={false} 
								keyboardType='email-address' 
								returnKeyType="next" 
								placeholder='First Name:' 
								placeholderTextColor='black'
								onChangeText={(first_name) => this.setState({first_name})} />

							{/* LAST NAME */}
							<TextInput style = {styles.input} 
								onFocus={(event: Event) => {
									this._scrollToInput(findNodeHandle(event.target))
								}} 
								blurOnSubmit={ false }
								autoCapitalize="sentences" 
								onSubmitEditing={() => this.emailInput.focus()} 
								ref={(input)=> this.last_nameInput = input} 
								autoCorrect={false} 
								keyboardType='email-address' 
								returnKeyType="next" 
								placeholder='Last Name:' 
								placeholderTextColor='black'
								onChangeText={(last_name) => this.setState({last_name})} />
						
							{/* EMAIL */}
							<TextInput style = {styles.input} 
								onFocus={(event: Event) => {
									this._scrollToInput(findNodeHandle(event.target))
								}} 
								blurOnSubmit={ false }
								autoCapitalize="none" 
								onSubmitEditing={() => this.telInput.focus()} 
								ref={(input)=> this.emailInput = input} 
								autoCorrect={false} 
								keyboardType='email-address' 
								returnKeyType="next" 
								placeholder='Email:' 
								placeholderTextColor='black'
								onChangeText={(email) => this.setState({email})} />
							
							{/* CELLPHONE NUMBER */}
							<TextInput style = {styles.input} 
								onFocus={(event: Event) => {
									this._scrollToInput(findNodeHandle(event.target))
								}} 
								blurOnSubmit={ false }
								autoCapitalize="none" 
								onSubmitEditing={() => this.passwordInput.focus()} 
								ref={(input)=> this.telInput = input} 
								autoCorrect={false} 
								keyboardType='numeric' 
								returnKeyType="next" 
								placeholder='Cell Number:' 
								placeholderTextColor='black'
								onChangeText={(tel) => this.setState({tel})} />
							
							{/* PASSWORD */}
							<TextInput style = {styles.input}   
								onFocus={(event: Event) => {
									this._scrollToInput(findNodeHandle(event.target))
								}} 
								blurOnSubmit={ false }
								autoCapitalize="none"
								returnKeyType="next" 
								onSubmitEditing={() => this.confirm_passwordInput.focus()} 
								ref={(input)=> this.passwordInput = input} 
								placeholder='Password:' 
								placeholderTextColor='black' 
								secureTextEntry
								onChangeText={(password) => this.setState({password})} />
							
							{/* CONFIRM PASSWORD */}
							<TextInput style = {styles.input}   
								onFocus={(event: Event) => {
									this._scrollToInput(findNodeHandle(event.target))
								}} 									
								autoCapitalize="none"
								returnKeyType="go" 
								onSubmitEditing={this._signUp} 
								ref={(input)=> this.confirm_passwordInput = input} 
								placeholder='Confirm Password:' 
								placeholderTextColor='black' 
								secureTextEntry
								onChangeText={(password_confirm) => this.setState({password_confirm})} />
							
							<View style={{flexDirection: "row", justifyContent: "center"}}>
								<View style={styles.buttonContainer}>
									<TouchableOpacity onPress={this._signUp} >      
											<Text style={styles.signUpButtonText}>SIGN UP</Text>
									</TouchableOpacity>
								</View>
							</View>
							<View style={{flexDirection: "row", justifyContent: "center"}}>
								<TouchableOpacity style={{marginTop: 15}} onPress={this._backToLogin} >      
										<Text style={styles.buttonText}>BACK</Text>
								</TouchableOpacity>
							</View>
						</View> 
					</View>


					<Modal
						animationType={'none'}
						transparent={true}
						visible = {this.state.signingUpModalVisible}
						onRequestClose={this._hideSigningUpModal}>
						
						<View style={styles.modalBackground}>
							<View style={styles.activityIndicatorWrapper}>
								<View style={{flexDirection: "row"}}>
									<ActivityIndicator animating={this.state.signing_up} size="large" color="#666666" />
									<View style={{flexDirection: "column", justifyContent: "center"}}>
										<Text style={{fontSize: 16, marginLeft: 14}}>Signing Up...</Text>
									</View>
								</View>

							</View>
						</View>
			        </Modal>

			        <Modal
						animationType={'none'}
						transparent={true}
						visible = {this.state.loggingInModalVisible}
						onRequestClose={this._hideLoggingInModal}>
						
						<View style={styles.modalBackground}>
							<View style={styles.loggingInModalWrapper}>
								<View style={{flexDirection: "row"}}>
									<ActivityIndicator animating={this.state.logging_in} size="large" color="#666666" />
									<View style={{flexDirection: "column", justifyContent: "center", marginLeft: 20}}>
										<Text style={{fontSize: 16, color: "#47969e"}}>Success!</Text>
										<Text style={{fontSize: 16}}>Logging In...</Text>
									</View>
								</View>

							</View>
						</View>
			        </Modal>

			        <Modal
						animationType={'none'}
						transparent={true}
						visible = {this.state.xPasswordModalVisible}
						onRequestClose={this._hidexPasswordModal}>
						
						<View style={styles.modalBackground}>
							<View style={styles.xPasswordWrapper}>
								<View style={{flexDirection: "row"}}>
									<View style={{flexDirection: "column", justifyContent: "center"}}>
										<Text style={{fontSize: 16, color: "red"}}>Passwords do not match</Text>
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
    	marginTop: 10  	
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
    	marginTop: 30,
    	borderWidth: 1,    	   	
    	borderRadius: 5,
    	padding: 10,
    	marginTop: 10,
    	width: "50%"
    },
    signUpButtonText:{    	
        color: "#47969e",
        textAlign: 'center',
        fontWeight: '700'
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
	loggingInModalWrapper: {
		backgroundColor: '#FFFFFF',
	    height: 80,
	    width: 250,
	    borderRadius: 10,
	    display: 'flex',
	    alignItems: 'center',
	    justifyContent: 'space-around'
	},
	xPasswordWrapper: {
	    backgroundColor: '#FFFFFF',
	    height: 80,
	    width: 250,
	    borderRadius: 10,
	    display: 'flex',
	    alignItems: 'center',
	    justifyContent: 'space-around'
	},
	image: {
		flexDirection: "row", 
		justifyContent: "center", 									
	}
})

