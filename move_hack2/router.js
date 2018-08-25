import React from 'react';
import {createStackNavigator, createBottomTabNavigator} from 'react-navigation';
import LoginScreen from './screens/login';


export const Navigator = createStackNavigator({
    LoginScreen : {
        screen:LoginScreen,
        navigationOptions: {
            title: 'Login Screen',
            header: null
          },
    }
},
{
    initialRouteName:'LoginScreen',
}

)
