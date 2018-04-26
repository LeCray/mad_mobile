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
			modalVisible: false,			
		};
		this._signUp = this._signUp.bind(this);
		
		
		
	}

	componentWillMount() {
		
	}


	_hideModal = () => this.setState({ modalVisible: false })
	

	 async _signUp() {
	 	this.setState({'signing_up': true})
	 	this.setState({"modalVisible": true})

        await fetch("http://10.0.1.218/api/v1/sign_up", {
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
	  	})
        .catch((error) => {
          console.error(error);
        })
        .done();
    }

    _scrollToInput = (reactNode: any) => {
	  // Add a 'scroll' ref to your ScrollView
	  this.scroll.props.scrollToFocusedInput(reactNode)
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
							
							<TextInput style = {styles.input} 
									onFocus={(event: Event) => {
										this._scrollToInput(findNodeHandle(event.target))
									}} 
									blurOnSubmit={ false }
									autoCapitalize="none" 
									onSubmitEditing={() => this.last_nameInput.focus()} 
									autoCorrect={false} 
									keyboardType='email-address' 
									returnKeyType="next" 
									placeholder='First Name:' 
									placeholderTextColor='black'
									onChangeText={(first_name) => this.setState({first_name})} />
							
							<TextInput style = {styles.input} 
									onFocus={(event: Event) => {
										this._scrollToInput(findNodeHandle(event.target))
									}} 
									blurOnSubmit={ false }
									autoCapitalize="none" 
									onSubmitEditing={() => this.emailInput.focus()} 
									ref={(input)=> this.last_nameInput = input} 
									autoCorrect={false} 
									keyboardType='email-address' 
									returnKeyType="next" 
									placeholder='Last Name:' 
									placeholderTextColor='black'
									onChangeText={(last_name) => this.setState({last_name})} />
							
							
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
							

							<TextInput style = {styles.input} 
									onFocus={(event: Event) => {
										this._scrollToInput(findNodeHandle(event.target))
									}} 
									blurOnSubmit={ false }
									autoCapitalize="none" 
									onSubmitEditing={() => this.passwordInput.focus()} 
									ref={(input)=> this.telInput = input} 
									autoCorrect={false} 
									keyboardType='email-address' 
									returnKeyType="next" 
									placeholder='Cell Number:' 
									placeholderTextColor='black'
									onChangeText={(tel) => this.setState({tel})} />

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
									onChangeText={(passwordConfirm) => this.setState({passwordConfirm})} />

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
									<ActivityIndicator animating={this.state.signing_up} size="large" color="#666666" />
									<View style={{flexDirection: "column", justifyContent: "center"}}>
										<Text style={{fontSize: 16, marginLeft: 14}}>Signing Up...</Text>
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
	}
})

