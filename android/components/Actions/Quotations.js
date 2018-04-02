import React, { Component } from 'react';
import {Platform, StyleSheet, Dimensions, Text, 
		View, ScrollView, Modal, TouchableOpacity, ToastAndroid} from 'react-native';
import Pdf from 'react-native-pdf';
import Icon from 'react-native-vector-icons/Ionicons';




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
			quo_status: "",
		};
	}


	componentWillMount() {

		fetch("http://192.168.43.42:3000/api/v1/get_quotations", {
			method: "POST", 
			headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
			body: JSON.stringify({
				email: "captain@gmail.com"
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
				quo_status: responseDate.quotations[3]
			})
			console.log("quotation_url: ", this.state.quo_url)
			console.log("quotation_date: ", this.state.quo_date)
			console.log("quotation_id: ", this.state.quo_id)
			console.log("quotation_status: ", this.state.quo_status)
        })
        .catch((error) => {
          console.error(error);
        })
        .done();
	}

	_showModal = (index) => {
		this.setState({url: "http://192.168.43.42:3000" + this.state.quo_url[index]});
		this.setState({key: index})
		this.setState({modalVisible: true})
		console.log("Key: ", index);
		console.log("URL: ", this.state.url)	
	}
	_hideModal = () => this.setState({ modalVisible: false })

	


	_updateQuoStatus = (quo_status) => {
		//this.setState({quo_status: quo_status})
		console.log("Key", this.state.key)
		console.log("Quotation ID: ", this.state.quo_id[this.state.key])

		fetch("http://192.168.43.42:3000/api/v1/update_quotation_status", {
			method: "POST", 
			headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
			body: JSON.stringify({
				email: "captain@gmail.com",
				quo_status: quo_status,
				quo_id: this.state.quo_id[this.state.key]
			}), 
        })
        .then(() => {
			console.log('Quotation has been: ', quo_status)
			ToastAndroid.show('Quotation has been ' + quo_status, ToastAndroid.LONG)
        })
        .catch((error) => {
          console.error(error);
        })
        .done();

	}


	
		

	render() {
		const source = {uri: this.state.url}

		return(  
			<ScrollView>
				<View style={styles.container}>

					<View style={styles.header}>
						<View style={{flexDirection: "row"}}>
							<Icon name="md-ribbon" style={styles.headerIcon}/>
							<Text style={{fontSize: 30}}>Quotations</Text>
						</View>
						<Text>Approve or Disapprove proposed quotations</Text>
					</View>
					
					<View style={styles.quoCard}>
						<Text>Select quotation by date uploaded</Text>
						<View style={styles.hr}/>

						{this.state.quo_date.map((date, index) => 
							<TouchableOpacity key={index}>
								<View style={{flexDirection: "row"}}>
									<Icon name="md-copy" style={styles.cardIcon} />
									<View style={{flexDirection: "column"}}>
										<Text>Date: {date.slice(0,10)}</Text>
										<Text>Status: {this.state.quo_status[index]} </Text>
									</View>
									<View style={{marginLeft: 50, fontSize: 20}}>
										<Text 
										onPress={() => this._showModal(index)}
										style={{fontSize: 20}}> 
											 View
										</Text>								
									</View>
								</View>
							</TouchableOpacity>
						)}
					</View>

	                <Modal
					animationType="slide"
					transparent={true}
					visible = {this.state.modalVisible}
					onRequestClose={this._hideModal}>
						
						<View style={{flex: 1}}>
							<View  style={{flex: 1}}>
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

						</View>
						<View style={{padding: 20, flexDirection: "row", justifyContent: "center"}}>
							<TouchableOpacity  >
								<Text onPress={() => this._updateQuoStatus("approved")}>APPROVE</Text>
							</TouchableOpacity>
							<TouchableOpacity style={{marginLeft: 50}}>
								<Text onPress={() => this._updateQuoStatus("disapproved")}>DISAPPROVE</Text>
							</TouchableOpacity>
						</View>

			        </Modal>

			    </View>
			</ScrollView>
		)
	}
}

const styles = StyleSheet.create({
	container: {
        flex: 1,
        justifyContent: 'flex-start',
        padding: 20
    },
    header: {
    	backgroundColor: "white",
    	borderRadius: 4,
    	padding: 10,
    	height: "45%",
    	padding: 20
    },
    quoCard: {
    	backgroundColor: "white",
    	marginTop: 10,
    	padding: 20	
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
		marginTop: 6
	},
	cardIcon: {
		fontSize: 25,
		height: 40,
		color: 'black',
		marginRight: 20,
		marginBottom: 4
	},
	hr: {
		borderBottomColor: '#d3d3d3',
		borderBottomWidth: 1,
		marginTop: 10,
		marginBottom: 20,
		width: '100%',
		alignSelf: 'center'
    },
 

})