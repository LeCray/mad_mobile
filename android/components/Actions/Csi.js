import React, { Component } from 'react';
import {Platform, StyleSheet, Text, View, Dimensions, TouchableOpacity} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Icon from 'react-native-vector-icons/Ionicons';




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

		fetch("http://10.199.61.17:3000/api/v1/get_car_status", {
			method: "POST", 
			headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
			body: JSON.stringify({
				email: "mistercryptogrid@gmail.com"
				//email: "captain@gmail.com"
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

	renderIf = (reg, index) => {
		console.log("CarStatus Length: ", this.state.carStatus.length)
		if (this.state.carStatus.length >= 1) {
			return(
				<View>			
					<View style={{padding: 10}} >
						<Text>Car Make: {this.state.carMake[index]}</Text>
						<Text>Car Model: {this.state.carModel[index]}</Text>
						<Text>Vehicle Reg: {this.state.vehicleReg[index]}</Text>	
						<Text>Car Status: {this.state.carStatus[index]}</Text>
					</View>			
				</View>
			)
		} else {
			return(
				<View>
					<Text>NO CARS ARE BEING WORKED ON</Text>
				</View>
			)
		}
	}
	

	render() {
		return(  
			<View style={styles.container}>
				<View style={styles.header}>
					<View style={{flexDirection: "row"}}>	
						<Text style={{fontSize: 30, color: "#4F8EF7"}}>Customer Insurance Index</Text>
					</View>
					<Text>Know whats happening with your car</Text>
				</View>

				<View style={styles.carCard}>
					<View style={{flexDirection: 'row', marginBottom: -15}}>
						<Feather name="clock" style={styles.headingIcon} />
						<Text style={{fontSize: 18, color: "#4F8EF7", paddingLeft: 5}}>Car</Text>
					</View>
					<View style={styles.headingHr}/>
					
					
						<View>
							{this.state.vehicleReg.length != 0?
								<View>
									{this.state.vehicleReg.map((reg, index) => 																								
							           <View key={index} style={{padding: 10}} >
											<Text>Car Make: {this.state.carMake[index]}</Text>
											<Text>Car Model: {this.state.carModel[index]}</Text>
											<Text>Vehicle Reg: {this.state.vehicleReg[index]}</Text>	
											<Text>Car Status: {this.state.carStatus[index]}</Text>
										</View>													
									)}
								</View>
							: 
								<View>
									<Text>NO CARS ARE BEING WORKED ON</Text>
								</View>
							}							
						</View>
					

					
				</View>

			</View>
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
	headingHr: {
		borderBottomColor: '#d3d3d3',
		borderBottomWidth: 1,
		marginTop: 10,
		marginBottom: 0,
		width: '100%',
		alignSelf: 'center'
    },
	buttonContainer: {
      backgroundColor: "#2980b6", 
	  paddingVertical: 15, 
	  marginTop: 10
    },

})