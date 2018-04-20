import React, { Component } from 'react';
import {Platform, StyleSheet, Text, View, Dimensions, 
	ScrollView, Image, Modal, ActivityIndicator} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';



export class About extends Component {

	
	static navigationOptions = {
		drawerLabel: 'About',
		drawerIcon: <Feather name="tag" size={20} color="#51A8B1"/>
	}


	constructor(props) {
		super(props);
		this.state = {
			loading: true,
			loadingModalVisible: true
		};
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
						<View style={{flexDirection: "row"}}>	
							<Text style={{fontSize: 30, color: "#51A8B1"}}>About</Text>
						</View>
						<View style={styles.hr}/>
						<Text style={{textAlign: "center"}}>
							Founded by Bobby Johannes Mahele, Mahele Auto Doctor is a 100% Black Owned company 
							with a broad range of Services to offer South Africa who is currently holding 
							a redseal trade test in the same trade with a total of 15 other qualifications & accreditations
							from introduction to entrepeneurship with North West University and obtained 
							3 Distinctions in Human Resource, Project Management, 
							Financial Management, Production Manangement, Personal Development, 
							Conflict Resolution, Emotional Intelligence & many more.. 
						</Text>
						<View style={styles.smallHr}/>
						<Text style={{textAlign: "center"}}>
							Mr Mahele is also a member of both the Brics Youth Forum and Brics Entrepeneurship Forum.{"\n"}
							He has represented South Africa in Russia, China and India on Global Trade and the importance
							of SME's in GDP contribution as well as skills development.
						</Text>
						<View style={styles.smallHr}/>
						<Text style={{textAlign: "center"}}>
							He has been awarded an Honarary Diploma fom Samara State University of Economics, Russia 
							by the Rector Gabiibulla R. Khasaev. {"\n"}
							He holds a secondary Honarary Diploma from UFA, Russia on Small Businesses of the SCO and Brics Regions -
							awarded by the President of the CCI RB, Azat Fazlyev
						</Text>
						<View style={styles.smallHr}/>
						<Text style={{textAlign: "center"}}>
							Furthermore, he has also recently been elected as a committee member of the RMI (Retail Motor Industry. SA)
						</Text>

						<View style={{height: 300, marginTop: 20, marginBottom: 10, flexDirection: "row", justifyContent: "center"}}>
							<Image
							onLoad={this._endLoad}
							style={{width: 200, height: 300}}								  								    							    							 
							source={require('../../app/src/main/res/bobby.png')}/>								
						</View>

						<Text style={{textAlign: "center", fontWeight: "bold", fontSize: 15}}>Bobby Johannes Mahele </Text>
						<Text style={{textAlign: "center"}}>Owner</Text>
							
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
        height: Dimensions.get('window').height+300,
        padding: 20,
    },
    header: {
    	flex: 1,
    	backgroundColor: "white",
    	borderRadius: 4,
    	paddingTop: 20,    	
    	paddingLeft: 30,
    	paddingRight: 30
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
	},
    smallHr: {
		borderBottomColor: '#d3d3d3',
		borderBottomWidth: 1,
		marginTop: 5,
		marginBottom: 5,
		width: '80%',
		alignSelf: "center"
    }

})