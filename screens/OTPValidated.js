import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const OTPValidated = () => {
    return (
        <SafeAreaView style={styles.container}>
            <Ionicons name="checkmark-done" size={128} color="darkgreen" />
        </SafeAreaView>
    )
}

export default OTPValidated

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff'
    }
})