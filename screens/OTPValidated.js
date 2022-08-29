import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

const OTPValidated = () => {

    const userPhone = useSelector(state => state.signup.phoneNumber);



    const navigation = useNavigation();

    useEffect(
        () =>
            navigation.addListener('beforeRemove', (e) => {
                e.preventDefault();
            }),
        [navigation]
    );

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.textTitle}>{`Your phone number ${userPhone ? '+91 ' + userPhone : ''} \n was verified sucessfully.`}</Text>
            <Ionicons name="checkmark-circle" size={128} color="#cf8300" />
            <TouchableOpacity
                style={styles.btnContinue}
                onPress={() => navigation.navigate('Register')}
            >
                <Text style={styles.textContinue}>Continue</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default OTPValidated

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
})