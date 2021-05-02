import React, {Component} from 'react';
import {Text, Button,TouchableOpacity, View, TextInput, ActivityIndicator, ImageBackground,Image,
     StyleSheet,KeyboardAvoidingView} from 'react-native';
import Display from 'react-native-display';

global.url = 'http://localhost:8080'
export default class LoginScreen extends Component {
    constructor(props){
        super(props);
        this.state={
            username:'', password:'',showMess:false,mess:'',
        }
    }
    render(){
        // const {navigate} = this.props.navigation
        return(
            <View  style={[styles.container,{backgroundColor:'white', textAlign:'center', flexDirection:'column', flex:1}]} >
            <KeyboardAvoidingView behavior='padding'>
            
                <View style={{flexDirection:'column', marginTop:150}} >
                <Image
                source={require('../download.png')} 
                style={{width:100,height:100,resizeMode:'contain',alignSelf:'center'}}
            />
                    <View style={{flexDirection:'row', justifyContent:'center',marginTop:50, marginLeft:80}} >
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
                    <View style={{flexDirection:'row', justifyContent:'center', marginTop:20, marginLeft:80}}>
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
                
                
                <TouchableOpacity style={{alignSelf:'center', marginTop:60 , backgroundColor:'blue',borderRadius:4, padding:10}}
                    onPress={this.checkLogin}
                >
                    <Text style={{color:'#fff'}} >Submit</Text>
                </TouchableOpacity>
                <Display enable={this.state.showActivity} >
                    <ActivityIndicator 
                    style={{marginTop:30}}
                        size='small'
                    />
                </Display>
                <Display enable={this.state.showMess} >
                    <Text style={{textAlign:'center', color:'green', fontSize:20,fontWeight:'bold',marginTop:10}}  >
                        {this.state.mess}
                    </Text>
                </Display>
                
                </KeyboardAvoidingView>
            </View>
        );
    }

    checkLogin = () => {
        console.warn('reached checklogin' + this.state.username+this.state.password)
        this.setState({showActivity:true})
        fetch(global.url +  '/assigneeLogin' , {
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
            if(res['Success']==='Y'){
                this.setState({showMess:true,mess:'Success', showActivity:false})
                global.name= res['result']['name'];
                console.warn('name is '+global.name)
                global.username = res['result']['username']
                global.master =  res['result']['master']
                global.task = res['result']['task']
                this.props.navigation.navigate('Home')
            }
            else{
                this.setState({showMess:true,mess:'Login Failed. Username or Password Wrong',showActivity:false})
            }

            console.warn(res)
        })
        .catch(e => {
             alert('Network Request failed')
             console.error(e)
        })
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