import React, { Component } from 'react';
import {Platform, StyleSheet, Text, View, ScrollView,
	Dimensions, TouchableOpacity, AsyncStorage, 
	ImageBackground, Modal, ActivityIndicator} from 'react-native';
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
			loading: true,
			loadingModalVisible: true
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
				email: "captain@gmail.com"
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

	_endLoad = () => {
		this.setState({loading: false})	
		this.setState({loadingModalVisible: false})
	}
	_hideLoadingModal = () => this.setState({ loadingModalVisible: false })
	

	render() {
		return(  
			<ScrollView>
				<View style={styles.container}>
					<View style={styles.header}>
						<ImageBackground 
						style={{width: '100%', height: '100%'}} 
						onLoad={this._endLoad}
						source={require('../csi_picture.png')}>
						
							<View style={{flexDirection: "column", padding: 20}}>	
								<Text style={{fontSize: 30, color: "white"}}>
									Customer Satisfaction Insurance
								</Text>
								<Text style={{fontSize: 20, color: "white", fontStyle: "italic"}}>
									Know whats happening with your car
								</Text>
							</View>
						</ImageBackground>
					</View>

					<View style={styles.carCard}>
						<View style={{flexDirection: 'row', marginBottom: 10}}>
							{/*<Feather name="shield" style={styles.headingIcon} />*/}
							<Text style={{fontSize: 18, color: "#47969e", paddingLeft: 5}}>Your Car</Text>
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
												<Text style={{fontSize: 15, color: "red"}}>CAR STATUS: </Text>											
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

					<Modal
					animationType={'none'}
					transparent={true}
					visible = {this.state.loadingModalVisible}
					onRequestClose={this._hideLoadingModal}>
					
						<View style={styles.modalBackground}>
							<View style={styles.activityIndicatorWrapper}>
								<View style={{flexDirection: "row"}}>
									<ActivityIndicator animating={this.state.loading} size="large" color="#666666" />					
								</View>

							</View>
						</View>
			        </Modal>

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
    	height: "25%",    	
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
	}

})