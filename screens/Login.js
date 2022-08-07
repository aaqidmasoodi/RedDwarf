import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const Login = () => {


    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <Text style={{ fontSize: 30 }}>Login</Text>
            <TouchableOpacity
                onPress={() => navigation.navigate('SignUp')}
            >
                <Text>Sign Up</Text>
            </TouchableOpacity>
        </View>

    )
}

export default Login

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }


})