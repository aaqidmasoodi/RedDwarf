import { StyleSheet, Text, TouchableOpacity, View, Alert, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';

import { login } from '../redux/slices/rootSlice';
import { connectSocket } from '../redux/slices/busLocationSlice';
import { BASE_URL } from '../api/config'
import axios from 'axios'

const AccountCreated = () => {

    const userPhone = useSelector(state => state.signup.phoneNumber);
    const usePass = useSelector(state => state.signup.password);

    const dispatch = useDispatch();

    const [isLoading, setIsLoading] = useState(false);

    const navigation = useNavigation();

    useEffect(
        () =>
            navigation.addListener('beforeRemove', (e) => {
                e.preventDefault();
            }),
        [navigation]
    );



    const handleLogin = async () => {

        setIsLoading(true);

        await axios.post(`${BASE_URL}/accounts/login/`, {
            phone: userPhone,
            password: usePass
        })
            .then(res => {
                dispatch(login(res.data));
                dispatch(connectSocket());
                setIsLoading(false);
            })

            .catch(e => {
                Alert.alert('Sorry, could not log you in. Try again!')
                setIsLoading(false);
            })

    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.textTitle}>{'Account created sucessfully.'}</Text>
            <MaterialCommunityIcons name="account-check-outline" size={128} color="#cf8300" />
            <View style={styles.actionContainer}>

                <TouchableOpacity
                    style={styles.btnContinue}
                    disabled={isLoading}
                    onPress={handleLogin}
                >
                    {!isLoading && <Text style={styles.textContinue}>Login</Text>}
                    {isLoading && <ActivityIndicator size="large" color="#cf8300" />}
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.navigateTextContainer}
                    disabled={isLoading}
                    onPress={() => navigation.navigate('Login')}
                >
                    <Text style={{ fontSize: 16, color: '#cf8300' }}>I'll login manually</Text>

                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default AccountCreated

const styles = StyleSheet.create({


    container: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#ffffff'
    },

    textTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#6f6f6f',
        width: 350,
        textAlign: 'center'
    },


    btnContinue: {
        width: 300,
        height: 50,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffffff',
        borderWidth: 2,
        borderColor: '#cf8300'
    },

    textContinue: {
        color: '#cf8300',
        alignItems: 'center',
        fontSize: 18,
        fontWeight: 'bold'
    },

    navigateTextContainer: {
        marginVertical: 10
    },

    actionContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    }
})