import React, { Component } from 'react';
import {Platform, TextInput, TouchableOpacity, StyleSheet, Text, View, AsyncStorage } from 'react-native';
import {DrawerStack} from 
'../Dashboard/DashboardHome';





export class StreamChannel extends Component {


	constructor(props) {
		super(props);
		this.cmdDataPost = this.cmdDataPost.bind(this);
	}
   

    cmdDataPost = function() {
        fetch("http://10.0.0.6:5000/api/v1/data_stream", {
			method: "POST", 
			headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},

			body: JSON.stringify({
				cmdData: this.props.cmdData 
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


	componentWillMount() {
	
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

