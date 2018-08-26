import React from 'react';
import {createStackNavigator, createBottomTabNavigator} from 'react-navigation';
import LoginScreen from './screens/login';
import Home from './screens/home'

export const Navigator = createStackNavigator({
    LoginScreen : {
        screen:LoginScreen,
        navigationOptions: {
            title: 'Login Screen',
            header: null
          },
    },
    Home : {
        screen:Home,
        navigationOptions: {
            title: 'Home',
            header: null
          },
    },
},
{
    initialRouteName:'LoginScreen',
}

)
