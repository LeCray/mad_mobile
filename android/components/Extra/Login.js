import React, { Component } from 'react';
import {Platform, StyleSheet, Text, View, TextInput,
 AsyncStorage, TouchableOpacity, KeyboardAvoidingView, Dimensions, ScrollView} from 'react-native';
 import {DrawerStack} from '../Dashboard/DashboardHome';


export default class Login extends Component {

	static navigationOptions = {
		header: null
	}

	constructor(props) {
		super(props);
		this.state = {
			email: '', 
			password: '', 
			logged_in: false
		};
		
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

	 _login = function() {
        fetch("http://192.168.43.42:3000/api/v1/mobile_login", {
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

				this.props.navigation.navigate('Main');
			}
        })
        .catch((error) => {
          console.error(error);
        })
        .done();
    }


	render() {
		const {navigate} = this.props.navigation

		return(  
			   <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={-150} style={{flex: 1}}>			
				<View  style={styles.container}>
					<View style={styles.header}>
						<View style={{alignSelf: "center"}}>								
							<Text style={{fontSize: 70, color: "#4F8EF7"}}>
								MAD 
							</Text>
						</View>
						<Text style={{alignSelf: "center"}}>Leading the way forward</Text>
													
						<View style={styles.inputSection}>
							<TextInput style = {styles.input} 
									autoCapitalize="none" 
									onSubmitEditing={() => this.passwordInput.focus()} 
									autoCorrect={false} 
									keyboardType='email-address' 
									returnKeyType="next" 
									placeholder='Email:' 
									placeholderTextColor='black'
									onChangeText={(email) => this.setState({email})} />

							<TextInput style = {styles.input}   
									returnKeyType="go" 
									ref={(input)=> this.passwordInput = input} 
									placeholder='Password:' 
									placeholderTextColor='black' 
									secureTextEntry
									onChangeText={(password) => this.setState({password})} />

							<TouchableOpacity style={styles.buttonContainer} onPress={this._login} >      
									<Text style={styles.buttonText}>LOGIN</Text>
							</TouchableOpacity>
						</View> 
					</View>
				</View>	
			</KeyboardAvoidingView>
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
    	marginTop: 100  	
    },
    input:{
		margin: 20,
		marginBottom: 0,
		height: 50,
		paddingHorizontal: 10,
		borderRadius: 4,
		borderWidth: 1,
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
})

