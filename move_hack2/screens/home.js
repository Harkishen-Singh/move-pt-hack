import React, {Component} from 'react';
import {Text, Button,TouchableOpacity, View, TextInput, StyleSheet,ActivityIndicator,ToastAndroid,
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
    completeCall = (id, ass) => {
        console.warn('id is '+id + ' and ass : '+ass)
        fetch(global.url + '/workComplete' , {
            method:'POST',
            headers: {
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                'id':id,
                'assignee':ass,
            }),
        })
        .then(resData => resData.json())
        .then(res => {
            if(res['Success']=='Y'){
                ToastAndroid.showWithGravity(
                    'Saved Completed Task for consignment ID : '+id,
                    ToastAndroid.LONG,
                    ToastAndroid.CENTER
                )
            }
            else{
                ToastAndroid.showWithGravity(
                    'Error saving for consignment ID : '+id,
                    ToastAndroid.LONG,
                    ToastAndroid.CENTER
                )
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
            <View  style={[styles.container,{backgroundColor:'white', textAlign:'center', flexDirection:'column', flex:1,marginBottom:5}]}>
            <ScrollView>
                <Text style={{textAlign:'center',marginTop:30,fontWeight:'bold'}} >Welcome {global.name}</Text>
                <Text style={{textAlign:'center',marginTop:5,fontWeight:'bold'}}>Task Assigned : {global.task} </Text>
                <Display enable={this.state.showActivity}>
                    <ActivityIndicator
                        style={{marginTop:200}} 
                        size="large"
                    />
                </Display>
                <Display enable={!this.state.showActivity} >
                <View style={{backgroundColor:'#6AF77C', borderRadius:10,margin:10,padding:10}} > 
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
                    <View style={{flexDirection:'column',backgroundColor:'#6AF77C', borderRadius:10,margin:10,padding:10}} >

                        {/* <Text style={{color:'#fff', fontWeight:'bold'}} >Phone : {data.phone} </Text>
                        <Text style={{color:'#fff', fontWeight:'bold'}}>IP : {data.ip} </Text>
                        <Text style={{color:'#fff', fontWeight:'bold'}}>Name : {data.name} </Text>
                        <Text style={{color:'#fff', fontWeight:'bold'}}>Time :{ data.time} </Text>
                        <Text style={{color:'#fff', fontWeight:'bold'}}>Work Type : {data.work_type} </Text>
                        <Text style={{color:'#fff', fontWeight:'bold'}}>Message : {data.message} </Text>
                        <Text style={{color:'#fff', fontWeight:'bold'}}>Email : {data.email} </Text>
                        <Text>{'\n'} </Text> */}
                    <Text>
                    <Text style={{fontWeight:'bold'}} >Consignment ID : </Text> {data.consignmentid} {'\n'}
                    <Text style={{fontWeight:'bold'}} >User Registration Time:</Text> {data.userregtime}{'\n'}
                    <Text style={{fontWeight:'bold'}} >Indent Commodity:</Text> {data.indentcomm}{'\n'}
                    <Text style={{fontWeight:'bold'}} >Indent Number of Wagons:</Text> {data.indentwagon}{'\n'}
                    <Text style={{fontWeight:'bold'}} >Username :</Text> {data.usernmae} {'\n'}
                    <Text style={{fontWeight:'bold'}} >Source Station Code:</Text> {data.srcstncode}{'\n'}
                    <Text style={{fontWeight:'bold'}} >Source Departure Time:</Text> {data.srcdeptime}{'\n'}

                        <Text style={{fontWeight:'bold'}} >Distance Travelled:</Text> {data.disttravel} {'\n'}
                        <Text style={{fontWeight:'bold'}} >Destination Arrival Time :</Text> {data.destarrivaltime}{'\n'}

                        <Text style={{fontWeight:'bold'}} >Destination Station Code :</Text> {data.deststncode}{'\n'}

                        <Text style={{fontWeight:'bold'}} >Unload Start Time :</Text> {data.unload_strt_time}{'\n'}

                        <Text style={{fontWeight:'bold'}} >Unload End Time : </Text>{data.unload_end_time}{'\n'}

                        <Text style={{fontWeight:'bold'}} >Dock Assigned :</Text> {data.dockassigned}{'\n'}

                        <Text style={{fontWeight:'bold'}} >Completed :</Text> {data.completed}{'\n'}{'\n'}
                        
                    </Text>
                    <TouchableOpacity style={{backgroundColor:'yellow', padding:10, position:'absolute',
                         right:5,bottom:5, borderRadius:6}} 
                         onPress={()=>this.completeCall(data.consignmentid, data.assignee)}
                         >
                           <Text style={{color:'black'}} >Completed</Text> 
                        </TouchableOpacity>
                        
                    </View>
                 }
                /></ScrollView>
            
                    
                </View></Display>
                </ScrollView>
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