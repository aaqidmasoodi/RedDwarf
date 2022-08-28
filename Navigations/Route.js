import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainStack from './MainStack';
import AuthStack from './AuthStack';
import { useSelector, useDispatch } from 'react-redux';
import * as SecureStore from 'expo-secure-store';
const Stack = createStackNavigator();

import { setToken, setUser } from '../redux/slices/rootSlice';
import { ActivityIndicator, Alert, View } from 'react-native';



const Route = () => {

    const dispatch = useDispatch();

    const isLoggedIn = async () => {
        try {

            let token = await SecureStore.getItemAsync('token');
            let user = await SecureStore.getItemAsync('user')
            dispatch(setToken(token));
            dispatch(setUser(JSON.parse(user)));


        } catch {
            Alert.alert('Something went wrong.')
        }

    }

    useEffect(() => {
        isLoggedIn();
    }, []);



    const token = useSelector(state => state.root.token)
    const isLoading = useSelector(state => state.root.isLoading)

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size={'large'} color='#cf8300' />
            </View>
        );
    }


    return (
        <NavigationContainer>

            <Stack.Navigator>
                {token ? MainStack(Stack)
                    : AuthStack(Stack)
                }
            </Stack.Navigator>

        </NavigationContainer>
    )
}

export default Route