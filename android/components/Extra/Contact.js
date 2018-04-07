import React, { Component } from 'react';
import {Platform, StyleSheet, Text, View, Dimensions, ScrollView} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';




export class Contact extends Component {

	
	static navigationOptions = {
		drawerLabel: 'Contact',
		drawerIcon: <Feather name="phone" size={20} color="#0844aa"/>
	}

	render() {
		return(  
			<ScrollView>
				<View style={styles.container}>

					<View style={styles.header}>
						<View style={{flexDirection: "row"}}>	
							<Text style={{fontSize: 30, color: "#4F8EF7"}}>Contact</Text>
						</View>
						<View style={styles.hr}/>
						<Text>
					
						</Text>
						<Text style={{marginTop: 10}}>
					
						</Text>

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
    	height: "50%",
    	padding: 20
    },

	buttonContainer: {
      backgroundColor: "#2980b6", 
	  paddingVertical: 15, 
	  marginTop: 10
    },
    hr: {
		borderBottomColor: '#d3d3d3',
		borderBottomWidth: 1,
		marginTop: 10,
		marginBottom: 15,
		width: '100%',
		alignSelf: 'center'
    },

})