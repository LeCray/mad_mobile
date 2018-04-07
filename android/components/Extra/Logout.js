import React, { Component } from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity, AsyncStorage} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';



export class Logout extends Component {

	constructor(props) {
		super(props);
		this.logout = this.logout.bind(this);
	}

	logout() {
		AsyncStorage.removeItem('email')
		this.props.navigation.navigate('LoginPage');
		console.log("You have benn logged out")
	}
	
	static navigationOptions = {
		drawerLabel: 'Logout', 
		drawerIcon: <Feather name="user-x" size={20} color="#0844aa"/>
	}

	render() {
		return(  
			<View style={{paddingLeft: 10, paddingRight: 10, paddingTop: '60%'}}>
			<Text style={{textAlign: 'center'}}> Are you sure you want to Logout? </Text>
				<View style={{marginTop: 30}}>
					<TouchableOpacity style={styles.buttonContainer} onPress={this.logout}>       
						<Text style={{color: 'white', textAlign: 'center'}}>Logout</Text>
					</TouchableOpacity>
				</View>
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
      backgroundColor: '#E73536', 
	  paddingVertical: 15, 
	  marginTop: 10
    },

})