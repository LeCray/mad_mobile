import React, { Component } from 'react';
import {Platform, StyleSheet, Text, View, Dimensions, ScrollView, Image} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';




export class Contact extends Component {

	
	static navigationOptions = {
		drawerLabel: 'Contact',
		drawerIcon: <Feather name="phone" size={20} color="#51A8B1"/>
	}

	render() {
		return(  
			<ScrollView>
				<View style={styles.container}>

					<View style={styles.header}>
						<View style={{flexDirection: "row"}}>	
							<Text style={{fontSize: 30, color: "#51A8B1"}}>Contact</Text>
						</View>
						<View style={styles.hr}/>
						
						<View style={{flexDirection: "column"}}>

							<View style={{flexDirection: "row", marginTop: 20}}>
								<View style={{height: 60, width: 60, marginBottom: 0, flexDirection: "row", justifyContent: "center"}}>
									<Image
									style={{width: "80%", height: "80%"}}								  								    							    							 
									source={require('../email_pic.png')}/>								
								</View>
								<View style={{flex: 1, flexDirection: "column", marginLeft: 10}}>
									<Text style={{fontWeight: "bold", fontSize: 15}}>
										Email Us
									</Text>
									<View style={styles.smallHr}/>
									<Text style={{fontSize: 15}}>
										info@madb.co.za
									</Text>
								</View>
							</View>

							<View style={{flexDirection: "row", marginTop: 20}}>
								<View style={{height: 60, width: 60, marginBottom: 0, flexDirection: "row", justifyContent: "center"}}>
									<Image
									style={{width: "80%", height: "80%"}}								  								    							    							 
									source={require('../call_pic.png')}/>								
								</View>
								<View style={{flex: 1, flexDirection: "column", marginLeft: 10}}>
									<Text style={{fontWeight: "bold", fontSize: 15}}>
										Call Us
									</Text>
									<View style={styles.smallHr}/>
									<Text style={{fontSize: 15}}>
										+27 016 421 1318
									</Text>
								</View>
							</View>

							<View style={{flexDirection: "row", marginTop: 20}}>
								<View style={{height: 60, width: 60, marginBottom: 0, flexDirection: "row", justifyContent: "center"}}>
									<Image
									style={{width: "80%", height: "80%"}}								  								    							    							 
									source={require('../fax_pic.png')}/>								
								</View>
								<View style={{flex: 1, flexDirection: "column", marginLeft: 10}}>
									<Text style={{fontWeight: "bold", fontSize: 15}}>
										Fax Us
									</Text>
									<View style={styles.smallHr}/>
									<Text style={{fontSize: 15}}>
										+27 086 600 0148
									</Text>
								</View>
							</View>

							<View style={{flexDirection: "row", marginTop: 20}}>
								<View style={{height: 60, width: 60, marginBottom: 0, flexDirection: "row", justifyContent: "center"}}>
									<Image
									style={{width: "80%", height: "80%"}}								  								    							    							 
									source={require('../visit_pic.png')}/>								
								</View>
								<View style={{flex: 1, flexDirection: "column", marginLeft: 10}}>
									<Text style={{fontWeight: "bold", fontSize: 15}}>
										Visit Us
									</Text>
									<View style={styles.smallHr}/>
									<Text style={{fontSize: 15}}>
										17A Telford Street, Stand Number 4, Duncanville, Vereeniging
									</Text>
								</View>
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
    	flex: 1,
    	backgroundColor: "white",
    	borderRadius: 4,    	
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
    smallHr: {
		borderBottomColor: '#d3d3d3',
		borderBottomWidth: 1,
		marginTop: 5,
		marginBottom: 5,
		width: '80%',
		
    }

})