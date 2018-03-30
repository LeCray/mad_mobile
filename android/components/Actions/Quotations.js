import React, { Component } from 'react';
import {Platform, StyleSheet, Dimensions, Text, View, Modal, TouchableOpacity} from 'react-native';
import Pdf from 'react-native-pdf';




export class Quotations extends Component {

	static navigationOptions = {
		title: 'Quotations'
	}

	constructor(props) {
		super(props);
		this.state = {
			email: "", 
			quo: [],
			quo_url: [],
			quo_date: [],
			modalVisible: false,
			key: "",
			url: ""
		};
	}


	componentWillMount() {

		fetch("http://10.30.241.105:3000/api/v1/get_quotations", {
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
				quotations: responseData.Quotations
			})
			console.log("quotations: ", this.state.quotations)
			console.log("quotation_url: ", this.state.quo_url)
			console.log("quotation_date: ", this.state.quo_date)
        })
        .catch((error) => {
          console.error(error);
        })
        .done();
	}

	_showModal = (index) => {
		this.setState({url: "http://10.30.241.105:3000" + this.state.quo_url[index]});
		this.setState({key: index})
		this.setState({modalVisible: true})
		console.log("Key: ", index);
		console.log("URL: ", this.state.url)	
	}
	_hideModal = () => this.setState({ modalVisible: false })

	
		

	render() {
		const source = {uri: this.state.url}

		return(  
			<View style={styles.container}>
				
				{this.state.quo_date.map((date, index) => 
					<TouchableOpacity key={index} style={{padding: 10}} >
						<Text onPress={() => this._showModal(index)}> 
							{date.slice(0,10)} 
						</Text>								
					</TouchableOpacity>
				)}

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
						<Text style={{marginRight: 50}}>APPROVE</Text>
						<Text >DISAPPROVE</Text>
					</View>

		        </Modal>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 0,
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
    	
    }
 

})