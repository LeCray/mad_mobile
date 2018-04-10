import React, { Component } from 'react';
import {Platform, StyleSheet, Text, View, Dimensions} from 'react-native';




export class Csi extends Component {

	
	static navigationOptions = {
		title: 'Back'
	}

	constructor(props) {
		super(props);
		this.state = {
			email: "", 
			vehicleReg: [],
			carStatus: [], 
		};
	}

	componentWillMount() {

		fetch("http://192.168.0.36:3000/api/v1/get_car_status", {
			method: "POST", 
			headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
			body: JSON.stringify({
				email: "captain@gmail.com"
			}), 
      })
        .then(responseData => responseData.json())
        .then((responseData) => {
			console.log('Below is respose from mobile')
			console.log(responseData.carsArray)
			this.setState({
				vehicleReg: responseData.carsArray[0],
				carStatus: responseData.carsArray[1]
			})
        })
        .catch((error) => {
          console.error(error);
        })
        .done();
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

				{this.state.vehicleReg.map((reg, index) => 
					<View key={index} style={{padding: 10}} >
						<Text>{reg}</Text>	
					</View>
				)}

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
	buttonContainer: {
      backgroundColor: "#2980b6", 
	  paddingVertical: 15, 
	  marginTop: 10
    },

})