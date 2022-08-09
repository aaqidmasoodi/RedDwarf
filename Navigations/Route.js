import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainStack from './MainStack';
import AuthStack from './AuthStack';

const Stack = createStackNavigator();


const Route = () => {
    return (
        <NavigationContainer>

            <Stack.Navigator>
                {false ? MainStack(Stack)
                    : AuthStack(Stack)
                }
            </Stack.Navigator>

        </NavigationContainer>
    )
}

export default Route