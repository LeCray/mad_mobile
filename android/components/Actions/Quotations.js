import React, { Component } from 'react';
import {Platform, StyleSheet, Dimensions, Text, 
		View, ScrollView, Modal, TouchableOpacity, 
		ToastAndroid, AsyncStorage, ImageBackground, ActivityIndicator} from 'react-native';
import Pdf from 'react-native-pdf';
import Icon from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';




export class Quotations extends Component {

	static navigationOptions = {
		title: 'Back'
	}

	constructor(props) {
		super(props);
		this.state = {
			email: "", 
			quo: [],
			quo_url: [],
			quo_date: [],
			quo_id: [],
			modalVisible: false,
			key: "",
			url: "",
			quo_status: [],
			loading: true,
			loadingModalVisible: true
		};
	}


	async componentWillMount() {
		await AsyncStorage.getItem('email')
		.then((value) => { 
			this.setState({'email': value})	
		});

		fetch("http://mad-beta.herokuapp.com/api/v1/get_quotations", {
			method: "POST", 
			headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
			body: JSON.stringify({
				email: this.state.email
			}), 
        })
        .then(responseData => responseData.json())
        .then((responseData) => {
			console.log('Below is respose from mobile')
			console.log(responseData)
			this.setState({
				quo_url: responseData.quotations[0], 
				quo_date: responseData.quotations[1],
				quo_id: responseData.quotations[2],
				quo_status: responseData.quotations[3]
			})
        })
        .then(this._endLoad)
        .catch((error) => {
          console.error(error);
        })
        .done();


	}

	_showModal = (index) => {
		this.setState({url: "http://mad-beta.herokuapp.com" + this.state.quo_url[index]});
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

	


	_updateQuoStatus = (quo_status) => {
		//this.setState({quo_status: quo_status})
		console.log("Key", this.state.key)
		console.log("Quotation ID: ", this.state.quo_id[this.state.key])


		fetch("http://mad-beta.herokuapp.com/api/v1/update_quotation_status", {
			method: "POST", 
			headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
			body: JSON.stringify({
				email: this.state.email,
				quo_status: quo_status,
				quo_id: this.state.quo_id[this.state.key]
			}), 
        })
        .then(responseData => responseData.json())
        .then((responseData) => {
			console.log('Quotation has been: ', quo_status)
			this.setState({
				quo_url: responseData.quotations[0], 
				quo_date: responseData.quotations[1],
				quo_id: responseData.quotations[2],
				quo_status: responseData.quotations[3]
			})
			this._hideModal()
			ToastAndroid.show('Quotation has been ' + quo_status, ToastAndroid.LONG)
        })
        .catch((error) => {
          console.error(error);
        })
        .done();
	}

	renderNewQuo = (status, date, index) => {
	    if (status == null) {
			return (
				<View style={{flexDirection: "row"}}>

					<Feather name="alert-circle" style={styles.cardIcon} />
		    		<View style={{flexDirection: "column"}}>
						<Text>Date: {date.slice(0,10)}</Text>
						<Text>Status: {this.state.quo_status[index]} </Text>
					</View>

					<View style={{marginLeft: 50,flex: 1}}>
						<TouchableOpacity>
						<Text 
						onPress={() => this._showModal(index)}
						style={{fontSize: 15, textAlign: "right", marginRight: 10, fontWeight: "bold"}}> 
							VIEW
						</Text>			
						</TouchableOpacity>					
					</View>
				</View>
			)
	    } else {
	    	return null
	    }
	}

	renderOldQuo = (status, date, index) => {
	    if (status == "Approved") {
			return (
				<View style={{flexDirection: "column"}}>
					<View style={{flexDirection: "row", justifyContent: 'center'}}>
						<Feather name="check" color="#4F8EF7" style={styles.cardIcon} />
						<View style={{flexDirection: "column", justifyContent: 'center'}}>
							<Text>Date: {date.slice(0,10)}</Text>
							<Text>Status: {this.state.quo_status[index]} </Text>
						</View>

						<View style={{flex: 1, justifyContent: "center"}}>
							<TouchableOpacity>
							<Text 
							onPress={() => this._showModal(index)}
							style={{fontSize: 15, textAlign: "right", marginRight: 10}}> 
								VIEW
							</Text>			
							</TouchableOpacity>					
						</View>
					</View>
					<View style={styles.quoHr}/>
				</View>
			)
	    } else if (status == "Disapproved") {
	        return(
	        	<View style={{flexDirection: "column"}}>
		        	<View style={{flexDirection: "row"}}>
		         		<Feather name="x" style={styles.cardxIcon} />
		         		<View style={{flexDirection: "column", justifyContent: 'center'}}>
							<Text>Date: {date.slice(0,10)}</Text>
							<Text>Status: {this.state.quo_status[index]} </Text>
						</View>

						<View style={{flex: 1, justifyContent: "center"}}>
							<TouchableOpacity>
							<Text 
							onPress={() => this._showModal(index)}
							style={{fontSize: 15, textAlign: "right", marginRight: 10}}> 
								VIEW
							</Text>			
							</TouchableOpacity>					
						</View>
					</View>
					<View style={styles.quoHr}/>
				</View>
			)
	    } else {
	    	return null
	    }
	}


		

	render() {
		const source = {uri: this.state.url}

		return(  									
			<View style={styles.container}>
				<View style={styles.header}>
					<ImageBackground 						
					style={{width: '100%', height: '100%'}} 
					source={require('../../app/src/main/res/quotation_picture.png')}>

						<View style={{flexDirection: "column", padding: 20}}>		
							<Text style={{fontSize: 30, color: "white"}}>Quotations</Text>
							<Text style={{fontSize: 20, color: "white", fontStyle: "italic"}}>
								Approve or Disapprove proposed quotations
							</Text>
						</View>
					</ImageBackground>
				</View>
				
				<View style={styles.newQuo}>						
					<View style={{flexDirection: 'row', marginBottom: 10}}>
						{/*<Feather name="bell" style={styles.headingIcon} />*/}
						<Text style={{fontSize: 18, color: "#47969e"}}> New Quotations </Text>
					</View>
					<View style={styles.hr}/>
					<ScrollView>
						{this.state.quo_date.map((date, index) => 
							<TouchableOpacity key={index} style={{marginTop: 1}}>
				                {this.renderNewQuo(this.state.quo_status[index], date, index)}			
							</TouchableOpacity>
						)}
					</ScrollView>
				</View>
				<View style={styles.oldQuo}> 												
					<View style={{flexDirection: 'row', marginBottom: 10}}>
						{/*<Feather name="clock" style={styles.headingIcon} />*/}
						<Text style={{fontSize: 18, color: "#47969e", paddingLeft: 5}}>Old Quotations</Text>
					</View>
					<View style={styles.hr}/>
					<ScrollView>
						{this.state.quo_date.map((date, index) => 
							<TouchableOpacity key={index}>									
					            {this.renderOldQuo(this.state.quo_status[index], date, index)}	
							</TouchableOpacity>
						)}
					</ScrollView>
				</View>

                <Modal
				animationType="slide"
				transparent={false}
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
					<View style={{paddingTop: 10, flexDirection: "row", justifyContent: "center"}}>
						<View style={{flexDirection: "row"}}>
			         		<Feather name="check" style={styles.modalIcon} />
							<TouchableOpacity  >
								<Text 
								onPress={() => this._updateQuoStatus("approved")}
								style={{marginTop: 5}}>
									APPROVE
								</Text>
							</TouchableOpacity>
						</View>
						<View style={{flexDirection: "row", marginLeft: 50}}>
		         			<Feather name="x" style={styles.modalxIcon} />
							<TouchableOpacity>
								<Text 
								onPress={() => this._updateQuoStatus("disapproved")}
								style={{marginTop: 5}}>
									DISAPPROVE
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
		)
	}
}

const styles = StyleSheet.create({
	container: {
        flex: 1,
        padding: 20,
    },
    header: {
    	backgroundColor: "white",
    	borderRadius: 4,
    	height: "25%",
    },
    newQuo: {
    	backgroundColor: "white",
    	borderRadius: 4,
    	marginTop: 10,
    	padding: 20,
    	paddingBottom: 5,
    	flex: .7  	
    },
    oldQuo: {
    	backgroundColor: "white",
    	borderRadius: 4,
    	marginTop: 10,
    	padding: 20,  
    	flex: 1	
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
	headerIcon: {
		fontSize: 30,
		height: 40,
		color: 'black',
		marginRight: 10,
		marginTop: 6,
		color: "#4F8EF7"
	},
	cardIcon: {
		fontSize: 25,
		height: 40,
		marginRight: 10,
		color: "#51A8B1",
		paddingTop: 8
	},
	cardxIcon: {
		fontSize: 25,
		height: 40,
		marginRight: 10,
		color: "rgba(231,76,60,1)",
		paddingTop: 8
	},
	headingIcon: {
		fontSize: 25,
		height: 40,
		marginRight: 10,
		color: "#4F8EF7",
	},
	modalIcon: {
		fontSize: 25,
		height: 40,
		marginRight: 10,
		color: "#4F8EF7",
	},
	modalxIcon: {
		fontSize: 25,
		height: 40,
		marginRight: 10,
		color: "rgba(231,76,60,1)",
	},
	hr: {
		borderBottomColor: '#d3d3d3',
		borderBottomWidth: 1,
		marginTop: 10,
		marginBottom: 0,
		width: '100%',
		alignSelf: 'center'
    },
    quoHr: {
		borderBottomColor: '#d3d3d3',
		borderBottomWidth: 1,
		marginTop: 5,
		marginBottom: 5,
		width: '100%',
		alignSelf: 'center'
    },
    modalHr: {
		borderBottomColor: '#d3d3d3',
		borderBottomWidth: 1,
		marginBottom: 5,
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