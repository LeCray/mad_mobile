import React, { Component } from 'react';
import {Platform, StyleSheet, Text, View, ScrollView,
	Dimensions, TouchableOpacity} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';




export class Csi extends Component {

	
	static navigationOptions = {
		title: 'Back'
	}

	constructor(props) {
		super(props);
		this.state = {
			email: 		"", 
			vehicleReg: [],
			carMake: 	[],
			carModel: 	[],
			carStatus: 	[], 
		};
	}

	componentWillMount() {
		AsyncStorage.getItem('email')
		.then((value) => { 
			this.setState({'email': value})	
		});

		fetch("http://mad-beta.herokuapp.com/api/v1/get_car_status", {
			method: "POST", 
			headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
			body: JSON.stringify({
				email: this.state.email
			}), 
      	})
        .then(responseData => responseData.json())
        .then((responseData) => {
			console.log('Below is respose from mobile')
			console.log(responseData.carsArray)
			console.log(responseData.carsArray[1])
			this.setState({
				vehicleReg: responseData.carsArray[0],
				carMake: responseData.carsArray[1],
				carModel: responseData.carsArray[2],
				carStatus: responseData.carsArray[3]
			})
        })
        .catch((error) => {
          console.error(error);
        })
        .done();
	}
	

	render() {
		return(  
			<ScrollView>
				<View style={styles.container}>
					<View style={styles.header}>
						<View style={{flexDirection: "row"}}>	
							<Text style={{fontSize: 30, color: "#4F8EF7"}}>
								Customer Satisfaction Insurance
							</Text>
						</View>
						<Text>Know whats happening with your car</Text>
					</View>

					<View style={styles.carCard}>
						<View style={{flexDirection: 'row', marginBottom: -15}}>
							<Feather name="shield" style={styles.headingIcon} />
							<Text style={{fontSize: 18, color: "#4F8EF7", paddingLeft: 5}}>Your Car</Text>
						</View>
						<View style={styles.headingHr}/>
						
						
						<View>
							{this.state.vehicleReg.length != 0?
								<View>
									{this.state.vehicleReg.map((reg, index) => 																								
							           <View key={index} style={{flexDirection: "column", marginTop: 10,padding: 10}} >
							           		<View style={{flexDirection: "row"}}>
								           		<FontAwesome name="car" style={styles.headingIcon} />						           		
								           		<View style={{flex: 1, flexDirection: "column", marginLeft: 5}}>
													<Text>Car Make: {this.state.carMake[index]}</Text>
													<Text>Car Model: {this.state.carModel[index]}</Text>
													<Text>Vehicle Reg: {this.state.vehicleReg[index]}</Text>	
												</View>
											</View>

											<View style={styles.smallHr}/>
												
											<View style={{flexDirection: "row"}}>
												<Feather name="activity" style={styles.activityIcon} />													
												<Text style={{fontSize: 15}}>CAR STATUS: </Text>											
												<View style={{flex: 1}}>
													<Text style={{fontSize: 15, color: "#4F8EF7"}}>
														{this.state.carStatus[index]}
													</Text>																						
												</View>
											</View>										
										</View>													
									)}
								</View>
							: 
								<View style={{flexDirection: 'row', justifyContent: "center", marginTop: 30}}>
									<Text>NO CARS ARE BEING WORKED ON</Text>
								</View>
							}							
						</View>
						

						
					</View>

				</View>
			</ScrollView>
		)
	}
}


const styles = StyleSheet.create({
	container: {
        height: Dimensions.get('window').height + 150,
        padding: 20,
    },
    header: {
    	backgroundColor: "white",
    	borderRadius: 4,
    	padding: 10,
    	height: "25%",
    	padding: 20
    },
    carCard: {
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
		color: "#4F8EF7",
		paddingTop: 8
	},
	headingIcon: {
		fontSize: 25,
		height: 40,
		marginRight: 10,
		color: "#4F8EF7",
	},
	activityIcon: {
		fontSize: 20,
		height: 20,
		marginRight: 5,
		marginTop: 2,
		color: "#4F8EF7",
	},
	headingHr: {
		borderBottomColor: '#d3d3d3',
		borderBottomWidth: 1,
		marginTop: 10,
		marginBottom: 0,
		width: '100%',
		alignSelf: 'center'
    },
    verticleHr: {
		borderLeftColor: '#d3d3d3',
		borderLeftWidth: 1,
		marginRight: 10,
		marginBottom: 0,
		height: '100%',
		alignSelf: 'center'
    },
    smallHr: {
		borderBottomColor: '#d3d3d3',
		borderBottomWidth: 1,
		marginTop: 3,
		marginBottom: 3,
		width: '100%',
		alignSelf: 'center'
    },
	buttonContainer: {
      backgroundColor: "#2980b6", 
	  paddingVertical: 15, 
	  marginTop: 10
    },

})