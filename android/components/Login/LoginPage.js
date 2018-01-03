import React, { Component } from 'react';
import {Platform, StyleSheet, Text, View, KeyboardAvoidingView} from 'react-native';

import {LoginForm} from './LoginForm';


export class LoginPage extends Component {

static navigationOptions = {
    title: "Login"
  }
  render() {
    return(  
    <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={70}>       
        
          <LoginForm navigation={this.props.navigation}/>
        
    </KeyboardAvoidingView>
    )
  }
}
