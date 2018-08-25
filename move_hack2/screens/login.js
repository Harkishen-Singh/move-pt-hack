import React, {Component} from 'react';
import {Text, Button,TouchableOpacity, View, TextInput, StyleSheet} from 'react-native';

global.url = 'http://0.0.0.0:5000'
export default class LoginScreen extends Component {
    constructor(props){
        super(props);
        this.state={
            username:'', password:'',
        }
    }
    render(){
        return(
            <View  style={[styles.container,{backgroundColor:'white', textAlign:'center', flexDirection:'column', flex:1}]} >
                <View style={{flexDirection:'column', marginTop:200, marginLeft:80}} >
                    <View style={{flexDirection:'row', justifyContent:'center'}} >
                        <Text style={[styles.container,  {color:'black', flex:1}]}>
                            Username : 
                        </Text>
                        <TextInput 
                        style={{flex:2}}
                        placeholder='Username'
                        underlineColorAndroid='transparent'
                        secureTextEntry={false}
                        onChangeText={ username => this.setState({username}) }

                        />

                    </View>
                    <View style={{flexDirection:'row', justifyContent:'center', marginTop:20}}>
                        <Text style={[styles.container,  {color:'black', flex:1}]}>
                        Password : 
                        </Text>
                        <TextInput 
                            style={{flex:2}}
                            placeholder='Password'
                            underlineColorAndroid='transparent'
                            secureTextEntry={true}
                            onChangeText={ password => this.setState({password}) }
                        />

                    </View>
                    

                </View>
                
                
                <TouchableOpacity style={{alignSelf:'center', marginTop:80 , backgroundColor:'blue',borderRadius:4, padding:10}}
                    onPress={this.checkLogin}
                >
                    <Text style={{color:'#fff'}} >Submit</Text>
                </TouchableOpacity>

                
            </View>
        );
    }

    checkLogin = () => {
        console.warn('reached checklogin' + this.state.username+this.state.password)
        fetch('http://127.0.0.1:5000/assigneeLogin' , {
            method:'POST',
            headers: {
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                'username':this.state.username,
                'password':this.state.password,
            }),
        })
        .then(resData => resData.json())
        .then(res => {
            console.warn(res)
        })
        .catch(e => {
             alert('Network Request failed')
             console.error(e)
        })
        // fetch('https://weatherdatabackend.herokuapp.com/loginOperations', {
        //     method:'POST',
        //     headers: {
        //         'Accept':'application/json',
        //         'Content-Type':'application/json'
        //     },
        //     body: JSON.stringify({
        //         'username':this.state.username,
        //         'password':this.state.password,
        //     }),
        // })
        // .then(resData => resData.json())
        // .then(res => {
        //     console.warn('Received as '+res);
        //     this.setState({showMessage:'Succesfully Logged In. Welcome '+res['first_name']+' '+res['second_name'],
        //         showMessageCheck:true, loginSuccess:true
        //         });
        // })
        // .catch(err => {
        //     this.setState({showMessage:'Logged In Unsuccessful',
        //     showMessageCheck:true, loginSuccess:false
        //     });
        // });
    }
}

const styles = StyleSheet.create({
    container:{
        color:'black'
    },
    fonts:{
        fontSize:20,
    }
})