import React, {Component} from 'react';
import {Text, Button,TouchableOpacity, View, TextInput, StyleSheet,
    ListView, ScrollView,
    KeyboardAvoidingView} from 'react-native';
import Display from 'react-native-display';

export default class Home extends Component {
    constructor(props){
        super(props);
        const ds= new ListView.DataSource({rowHasChanged:(r1, r2) => r1 !== r2});
        this.state = {
            datasource : ds.cloneWithRows(['Client', 'Messages']),
        }
        
    }
    componentWillMount() {
        fetch(global.url + '/assigneeWorks' , {
            method:'POST',
            headers: {
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                'username':global.username,
                'master':global.master,
            }),
        })
        .then(resData => resData.json())
        .then(res => {
            if(res['Success']==='Y'){
                this.setState({showMess:true,mess:'Success'})
                global.name= res['result']['name'];
                console.warn('name is '+global.name)
                global.username = res['result']['username']
                this.props.navigation.navigate('Home')
            }
            else{
                this.setState({showMess:true,mess:'Login Failed. Username or Password Wrong'})
            }

            console.warn(res)
        })
        .catch(e => {
             alert('Network Request failed')
             console.error(e)
        })
    }
    render(){
        const {navigate} = this.props.navigation
        return(
            <View  style={[styles.container,{backgroundColor:'white', textAlign:'center', flexDirection:'column', flex:1}]}>
                <Text style={{textAlign:'center',marginTop:30,fontWeight:'bold'}} >Welcome {global.name}</Text>
                <View style={{backgroundColor:'#F4FCF5', borderRadius:10,margin:10,padding:10}} > 
                    <Text>
                        Consignment ID :  {'\n'}
                        User Registration Time: {'\n'}
                        Indent Commodity:{'\n'}
                        Indent Number of Wagons: {'\n'}
                        Username :{'\n'}
                        Source Station Code: {'\n'}
                        Source Departure Time:{'\n'}

                        Distance Travelled: Destination Arrival Time :{'\n'}

                        Destination Station Code : {'\n'}

                        Unload Start Time :{'\n'}

                        Unload End Time : {'\n'}

                        Dock Assigned :{'\n'}

                        Completed :{'\n'}
                    </Text>
                    <ScrollView>
            <ListView
                dataSource={this.state.datasource}
                renderRow={ data => 
                    <View style={{flexDirection:'column'}} >

                        <Text style={{color:'#fff', fontWeight:'bold'}} >Phone : {data.phone} </Text>
                        <Text style={{color:'#fff', fontWeight:'bold'}}>IP : {data.ip} </Text>
                        <Text style={{color:'#fff', fontWeight:'bold'}}>Name : {data.name} </Text>
                        <Text style={{color:'#fff', fontWeight:'bold'}}>Time :{ data.time} </Text>
                        <Text style={{color:'#fff', fontWeight:'bold'}}>Work Type : {data.work_type} </Text>
                        <Text style={{color:'#fff', fontWeight:'bold'}}>Message : {data.message} </Text>
                        <Text style={{color:'#fff', fontWeight:'bold'}}>Email : {data.email} </Text>
                        <Text>{'\n'} </Text>
                    </View>
                 }
                />
            </ScrollView>
                    
                </View>
            </View>
        );
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