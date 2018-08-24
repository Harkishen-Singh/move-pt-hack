import React, {Component} from 'react';
import {Text, Button,TouchableOpacity, View, TextInput} from 'react-native';


export default class LoginScreen extends Component {
    constructor(props){
        super(props);
        this.state={

        };
    }
    render(){
        return(
            <View>
                <Text>
                    Username : 
                </Text>
                <TextInput 
                placeholder='Username'
                />

                
            </View>
        );
    }
}
