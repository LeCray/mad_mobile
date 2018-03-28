import React, { Component } from 'react';
import {Platform, StyleSheet, Dimensions, Text, View, Modal} from 'react-native';
import Pdf from 'react-native-pdf';




export class Invoices extends Component {

	static navigationOptions = {
		title: 'Invoices'
	}

	constructor(props) {
		super(props);
		this.state = {
			email: "", 
			invoices: [],
			modalVisible: false
		};
	}


	componentWillMount() {

		fetch("http://192.168.43.42:3000/api/v1/get_invoices", {
			method: "POST", 
			headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
			body: JSON.stringify({
				email: "captain@gmail.com"
			}), 
        })
        .then((responseData) => {
			console.log('Below is respose from mobile')
			this.setState({invoices: responseData._bodyText})
			console.log(this.state.invoices)
        })
        .catch((error) => {
          console.error(error);
        })
        .done();
	}

	_showModal = () => this.setState({ modalVisible: true })
	_hideModal = () => this.setState({ modalVisible: false })

	render() {
		const source = {uri:'https://www.tke.org/files/file/The_48_Laws_of_Power.pdf'};
		return(  
			<View style={styles.container}>
				
				<Text onPress={this._showModal}> The_48_Laws_of_Power.pdf </Text>

                <Modal
				animationType="slide"
				transparent={true}
				visible = {this.state.modalVisible}
				onRequestClose={this._hideModal}>
					
					<View style={{paddingTop: 50, backgroundColor: '#00000080', flex: 1}}>
						<View  style={{backgroundColor: '#fff', flex: 1}}>
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
        flex:1,
        width:Dimensions.get('window').width,
    }
 

})