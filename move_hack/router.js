import React from 'react';
import {createStackNavigator, createBottomTabNavigator} from 'react-navigation';
import LoginScreen from './screens/login';


export var Navigator = createStackNavigator({
    LoginScreen : {
        screen:LoginScreen,
        navigationOptions:{
            tabBarLabel:'Login | Screen',
        }
    }
},
{
    initialRouteName:'LoginScreen',
}

)
