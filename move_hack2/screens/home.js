import React, {Component} from 'react';
import {Text, Button,TouchableOpacity, View, TextInput, StyleSheet,ActivityIndicator,
    ListView, ScrollView,
    KeyboardAvoidingView} from 'react-native';
import Display from 'react-native-display';

export default class Home extends Component {
    constructor(props){
        super(props);
        const ds= new ListView.DataSource({rowHasChanged:(r1, r2) => r1 !== r2});
        this.state = {
            datasource : ds.cloneWithRows(['Client', 'Messages']),showActivity:true,
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
                console.warn(res['result'])
                data= res['result']
                this.setState({datasource: this.state.datasource.cloneWithRows(data), showActivity:false})
            }
            else{
               alert('error while fetching') 
               this.setState({showActivity:false})
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
                <Display enable={this.state.showActivity}>
                    <ActivityIndicator
                        style={{marginTop:200}} 
                        size="large"
                    />
                </Display>
                <Display enable={!this.state.showActivity} >
                <View style={{backgroundColor:'green', borderRadius:10,margin:10,padding:10}} > 
                    {/* <Text>
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
                    </Text> */}
                    <ScrollView>
            <ListView
                dataSource={this.state.datasource}
                renderRow={ data => 
                    <View style={{flexDirection:'column',backgroundColor:'#F4FCF5', borderRadius:10,margin:10,padding:10}} >

                        {/* <Text style={{color:'#fff', fontWeight:'bold'}} >Phone : {data.phone} </Text>
                        <Text style={{color:'#fff', fontWeight:'bold'}}>IP : {data.ip} </Text>
                        <Text style={{color:'#fff', fontWeight:'bold'}}>Name : {data.name} </Text>
                        <Text style={{color:'#fff', fontWeight:'bold'}}>Time :{ data.time} </Text>
                        <Text style={{color:'#fff', fontWeight:'bold'}}>Work Type : {data.work_type} </Text>
                        <Text style={{color:'#fff', fontWeight:'bold'}}>Message : {data.message} </Text>
                        <Text style={{color:'#fff', fontWeight:'bold'}}>Email : {data.email} </Text>
                        <Text>{'\n'} </Text> */}
                        <Text>
                        Consignment ID :  data.consignmentid {'\n'}
                        User Registration Time: {data.userregtime}{'\n'}
                        Indent Commodity: {data.indentcomm}{'\n'}
                        Indent Number of Wagons: {data.indentwagon}{'\n'}
                        Username : {data.usernmae} {'\n'}
                        Source Station Code: {data.srcstncode}{'\n'}
                        Source Departure Time: {data.srcdeptime}{'\n'}

                        Distance Travelled: {data.disttravel} {'\n'}
                         Destination Arrival Time : {data.destarrivaltime}{'\n'}

                        Destination Station Code : {data.deststncode}{'\n'}

                        Unload Start Time : {data.unload_strt_time}{'\n'}

                        Unload End Time : {data.unload_end_time}{'\n'}

                        Dock Assigned : {data.dockassigned}{'\n'}

                        Completed : {data.completed}{'\n'}{'\n'}
                    </Text>
                    </View>
                 }
                />
            </ScrollView>
                    
                </View></Display>
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