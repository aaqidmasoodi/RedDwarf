import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainStack from './MainStack';
import AuthStack from './AuthStack';
import { useSelector, useDispatch } from 'react-redux';
import * as SecureStore from 'expo-secure-store';
const Stack = createStackNavigator();

import { setToken, setUser, setIsLoading, logout } from '../redux/slices/rootSlice';
import { ActivityIndicator, Alert, View } from 'react-native';
import api from '../api/config';

const Route = () => {

    const dispatch = useDispatch();

    const isLoggedIn = async () => {
        try {

            let token = await SecureStore.getItemAsync('token');

            if (token) {

                api.get('/accounts/user-info/', {
                    headers: { Authorization: `Token ${token}` }
                })
                    .then(res => {
                        dispatch(setToken(token));
                        dispatch(setUser(res.data));
                        // console.log(res.data)
                    })
                    .catch(e => {
                        console.log(e.response);
                        dispatch(logout());
                    })


            } else {
                dispatch(setToken(token));
                dispatch(setIsLoading(false));
            }



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