import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainStack from './MainStack';
import AuthStack from './AuthStack';
import { useSelector } from 'react-redux';

const Stack = createStackNavigator();


const Route = () => {

    const isLoggedIn = useSelector((state) => state.isLoggedIn)
    return (
        <NavigationContainer>

            <Stack.Navigator>
                {isLoggedIn ? MainStack(Stack)
                    : AuthStack(Stack)
                }
            </Stack.Navigator>

        </NavigationContainer>
    )
}

export default Route