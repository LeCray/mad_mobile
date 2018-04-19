import React, { Component } from 'react';
import {Platform, StyleSheet, Dimensions, Text, 
		View, Modal, TouchableOpacity, ScrollView, 
		AsyncStorage, ImageBackground, ActivityIndicator} from 'react-native';
import Pdf from 'react-native-pdf';
import Feather from 'react-native-vector-icons/Feather';
import Icon from 'react-native-vector-icons/Ionicons';



export class Invoices extends Component {

	static navigationOptions = {
		title: 'Back'
	}

	constructor(props) {
		super(props);
		this.state = {
			email: "", 
			inv: [],
			inv_url: [],
			inv_date: [],
			modalVisible: false,
			key: "",
			url: "",
			loading: true,
			loadingModalVisible: true
		};
	}


	componentWillMount() {

		fetch("http://mad-beta.herokuapp.com/api/v1/get_invoices", {
			method: "POST", 
			headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
			body: JSON.stringify({
				email: "captain@gmail.com"
			}), 
        })
        .then(responseData => responseData.json())
        .then((responseData) => {
			console.log('Below is respose from mobile')
			this.setState({
				inv_url: responseData.invoices[0], 
				inv_date: responseData.invoices[1],
				inv: responseData.invoices
			})
			console.log("Invoices: ", this.state.inv)
			console.log("Invoice_url: ", this.state.inv_url)
			console.log("Invoice_date: ", this.state.inv_date)
        })
        .catch((error) => {
          console.error(error);
        })
        .done();
	}

	_showModal = (index) => {
		this.setState({url: "10.203.61.15" + this.state.inv_url[index]});
		this.setState({key: index})
		this.setState({modalVisible: true})
		console.log("Key: ", index);
		console.log("URL: ", this.state.url)		
	}
	_hideModal = () => this.setState({ modalVisible: false })


	_endLoad = () => {
		this.setState({loading: false})	
		this.setState({loadingModalVisible: false})
	}
	_hideLoadingModal = () => this.setState({ loadingModalVisible: false })

	
		
	render() {
		const source = {uri: this.state.url}



		return(  
			<ScrollView>
				<View style={styles.container}>

					<View style={styles.header}>
						<ImageBackground 
						style={{width: '100%', height: '100%'}} 
						onLoad={this._endLoad}
						source={require('../invoice_picture.png')}>

							<View style={{flexDirection: "column", padding: 20}}>	
								<Text style={{fontSize: 30, color: "white"}}>Invoices</Text>
								<Text style={{fontSize: 20, color: "white", fontStyle: "italic"}}>
									View your recent invoices
								</Text>
							</View>

						</ImageBackground>
					</View>

					<View style={styles.invoiceCard}>
						<View style={{flexDirection: 'row', marginBottom: 10}}>
							{/*<Feather name="clock" style={styles.headingIcon} />*/}
							<Text style={{fontSize: 18, color: "#47969e", paddingLeft: 5}}>Invoices</Text>
						</View>
						<View style={styles.invHr}/>



						{this.state.inv_date.map((date, index) => 
							<View key={index} style={{padding: 10}} >
								<View style={{flexDirection: "row", justifyContent: 'center'}}>
									<Feather name="file-text" color="#4F8EF7" style={styles.cardIcon} />
									<View style={{flexDirection: "column", justifyContent: 'center'}}>
										<Text>Date: {date.slice(0,10)}</Text>
									</View>

									<View style={{flex: 1, justifyContent: "center"}}>
										<TouchableOpacity>
											<Text 
											onPress={() => this._showModal(index)}
											style={{fontSize: 15, textAlign: "right", marginRight: 10}}> 
												View
											</Text>			
										</TouchableOpacity>					
									</View>
								</View>
								<View style={styles.hr}/>
							</View>
						)}
					</View>
					
					


	                <Modal
					animationType="slide"
					transparent={true}
					visible = {this.state.modalVisible}
					onRequestClose={this._hideModal}>
						
						<View style={{flex: 1}}>		
							<Pdf
			                    source={source}
			                    onLoadComplete={(numberOfPages,filePath)=>{
			                        console.log('number of pages: ', numberOfPages);
			                    }}
			                    onPageChanged={(page,numberOfPages)=>{
			                        console.log('current page: ', page);
			                    }}
			                    onError={(error)=>{
			                        console.log(error);
			                    }}
			                    style={styles.pdf}/>		
						</View>
						
						<View style={styles.modalHr}/>
						<View style={{paddingTop: 10, flexDirection: "row", justifyContent: "center", backgroundColor: "white"}}>
							<View style={{flexDirection: "row"}}>
				         		<Feather name="chevron-down" style={styles.modalIcon} />
								<TouchableOpacity  >
									<Text 
									onPress={this._hideModal}
									style={{marginTop: 5}}>
										CLOSE
									</Text>
								</TouchableOpacity>
							</View>
						</View>
			        </Modal>

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
    invoiceCard: {
    	backgroundColor: "white",
    	borderRadius: 4,
    	marginTop: 10,
    	padding: 20,
    	flex: 1
    },
	headingIcon: {
		fontSize: 25,
		height: 40,
		marginRight: 10,
		color: "#4F8EF7",
	},
	cardIcon: {
		fontSize: 25,
		height: 40,
		marginRight: 10,
		color: "#4F8EF7",
		paddingTop: 8
	},
	modalIcon: {
		fontSize: 25,
		height: 40,
		marginRight: 10,
		color: "#4F8EF7",
	},
	buttonContainer: {
		backgroundColor: "#2980b6", 
		paddingVertical: 15, 
		marginTop: 10
    },
	pdf: {
        flex: 1,
        width: Dimensions.get('window').width,
    },
    btn: {
    	height: 30,
    	flexDirection: "row", 
    	alignItems: "center", 
    	justifyContent: 'center',	
    },
	invHr: {
		borderBottomColor: '#d3d3d3',
		borderBottomWidth: 1,
		marginTop: 10,
		marginBottom: 0,
		width: '100%',
		alignSelf: 'center'
    },
	hr: {
		borderBottomColor: '#d3d3d3',
		borderBottomWidth: 1,
		marginTop: 10,
		marginBottom: -10,
		width: '100%',
		alignSelf: 'center'
    },
    modalHr: {
		borderBottomColor: '#d3d3d3',
		borderBottomWidth: 1,
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
	}
 

})