import React, { Component } from 'react';
import {Platform, TextInput, TouchableOpacity, StyleSheet, Text, View, AsyncStorage } from 'react-native';
import {DashboardHome} from '../Dashboard/DashboardHome';





export class LoginForm extends Component {
   

   _onPressButtonPOST = function() {
        fetch("http://192.168.43.42:5000/api/v1/mobile_login", {
          method: "POST", 
          headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},

          body: JSON.stringify({
          email: this.state.email, 
          password: this.state.password
          }), 

        })
        .then((response) => response.json())
        .then((responseData) => {
          console.log(responseData);
          if (responseData.admin_authenticated == true){
            //ADMIN THINGS
            console.log("You're logged in as ADMIN");
			this.props.navigation.navigate('DashboardHome');

			
			AsyncStorage.setItem({'email': this.state.email})
					
		
			

			AsyncStorage.getItem('email').then((res) => console.log(res));
			
			 

          } else if (responseData.driver_authenticated == true) {
            //DRIVER THINGS
            console.log("You're logged in as DRIVER")

          }
        })
        .catch((error) => {
          console.error(error);
        })
        .done();
  }


  constructor(props) {
    super(props);
    this.state = {email: '', password: '', logged_in: false};
    this._onPressButtonPOST = this._onPressButtonPOST.bind(this);
  }

  componentWillMount() {
  	  AsyncStorage.getItem('email')
	  .then((value) => { 
		this.setState({ 'email': value })
		console.log({Email: this.state.email})
	  });
  }

  
  
  render() {
	const {navigate} = this.props.navigation;
    return(   
    <View style={{marginTop: 120, padding: 20}}> 
        <Text>{this.state.email}</Text>
        <Text>{this.state.password}</Text>

        <TextInput style = {styles.input} 
               autoCapitalize="none" 
               onSubmitEditing={() => this.passwordInput.focus()} 
               autoCorrect={false} 
               keyboardType='email-address' 
               returnKeyType="next" 
               placeholder='Email:' 
               placeholderTextColor='white'
               onChangeText={(email) => this.setState({email})} />

        <TextInput style = {styles.input}   
              returnKeyType="go" 
              ref={(input)=> this.passwordInput = input} 
              placeholder='Password:' 
              placeholderTextColor='white' 
              secureTextEntry
              onChangeText={(password) => this.setState({password})} />

        <TouchableOpacity style={styles.buttonContainer} onPress={this._onPressButtonPOST} >       
             <Text style={styles.buttonText}>LOGIN</Text>
        </TouchableOpacity> 
      </View>
    )
   }
  
     
}

const styles = StyleSheet.create({
    container: {
     padding: 20
    },
    input:{
        height: 40,
        backgroundColor: '#1a1a1a',
        marginBottom: 10,
        padding: 10,
        color: 'white'
    },
    buttonContainer:{
        backgroundColor: '#2980b6',
        paddingVertical: 15
    },
    buttonText:{
        color: '#fff',
        textAlign: 'center',
        fontWeight: '700'
    }
  }
)

