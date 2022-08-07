import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const SignUp = () => {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <Text style={{ fontSize: 30 }}>Sign Up</Text>
            <TouchableOpacity
                onPress={() => navigation.navigate('Login')}
            >
                <Text>Login</Text>
            </TouchableOpacity>
        </View>
    )
}

export default SignUp

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }


})