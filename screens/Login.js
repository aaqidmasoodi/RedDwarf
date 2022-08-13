import { useRef, useState, useEffect } from 'react'
import { Platform, StyleSheet, Text, View, KeyboardAvoidingView, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Feather } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';


import { useDispatch } from 'react-redux';
import { login } from '../redux/slices/rootSlice';


const Login = () => {

    const dispatch = useDispatch();

    let textInput = useRef(null);

    const [phoneNumber, setPhoneNumber] = useState('');
    const [focusInput, setFocusInput] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const navigation = useNavigation();

    const phoneIsValid = (number) => number.length === 10;

    const onChangePhone = (number) => {
        setPhoneNumber(number);
    }

    const onChangeFocus = () => {
        setFocusInput(true);
    }

    const onChangeBlur = () => {
        setFocusInput(false);
    }

    useEffect(() => {
        textInput.focus();
    }, [])




    return (

        <SafeAreaView style={styles.container}>

            <KeyboardAvoidingView
                // keyboardVerticalOffset={50}
                behavior={Platform.OS === 'ios' ? 'padding' : 'undefined'}
                style={styles.avoidingContainer}
            >


                <Text style={styles.textTitle}>Use your phone number and password to login</Text>
                <View style={styles.containerInput}>

                    <View style={styles.inputBoxIcon}>
                        <Feather name="phone" size={24} color="#4f4f4f" />
                    </View>
                    <TextInput
                        ref={(input) => textInput = input}
                        style={styles.phoneInputStyle}
                        placeholder='9797944597'
                        keyboardType='numeric'
                        value={phoneNumber}
                        onChangeText={onChangePhone}
                        secureTextEntry={false}
                        maxLength={10}
                        onFocus={onChangeFocus}
                        onBlur={onChangeBlur}


                    />

                </View>

                <View style={styles.containerInput}>

                    <View style={styles.inputBoxIcon}>
                        <FontAwesome name="lock" size={24} color="#4f4f4f" />
                    </View>
                    <TextInput
                        style={styles.passwordInputStyle}
                        placeholder='••••••••'
                        secureTextEntry={true}
                    />

                </View>



                <View style={styles.viewBottom}>

                    <TouchableOpacity
                        onPress={() => dispatch(login())}
                        disabled={!phoneIsValid(phoneNumber)}
                    >
                        <View style={[styles.btnContinue,
                        {
                            borderColor: phoneIsValid(phoneNumber) ? '#cf8300' : '#afafaf'
                        }
                        ]}>
                            {!isLoading && <Text style={[styles.textContinue,
                            {
                                color: phoneIsValid(phoneNumber) ? '#cf8300' : '#afafaf'
                            }
                            ]}>Login</Text>}

                            {isLoading && <ActivityIndicator size="large" color="#cf8300" />}

                        </View>


                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.navigateTextContainer}
                        onPress={() => navigation.navigate('SignUp')}
                    >
                        <Text style={{ fontSize: 16, color: '#cf8300' }}>Dont't have an account? Sign up</Text>
                    </TouchableOpacity>

                </View>




            </KeyboardAvoidingView>



        </SafeAreaView>




    )
}

export default Login

const styles = StyleSheet.create({


    container: {
        flex: 1,
        backgroundColor: '#ffffff'
    },

    avoidingContainer: {
        flex: 1,
        paddingHorizontal: 20,
        alignItems: 'center',


    },


    textTitle: {
        marginVertical: 50,
        fontSize: 18,
        fontWeight: 'bold',
        color: '#6f6f6f',
        width: 300,
        textAlign: 'center'
    },


    containerInput: {
        flexDirection: 'row',
        paddingHorizontal: 12,
        borderRadius: 10,
        backgroundColor: 'white',
        alignItems: 'center',
        elevation: 2,
        marginVertical: 10

    },


    inputBoxIcon: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },

    phoneInputStyle: {
        marginLeft: 10,
        flex: 1,
        height: 50
    },

    passwordInputStyle: {
        marginLeft: 20,
        flex: 1,
        height: 50
    },

    viewBottom: {
        flex: 1,
        width: '100%',
        justifyContent: 'flex-end',
        marginBottom: 20,
        alignItems: 'center',
    },

    btnContinue: {
        width: 300,
        height: 50,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffffff',
        borderWidth: 2,
    },

    textContinue: {
        color: '#ffffff',
        alignItems: 'center',
        fontSize: 18,
        fontWeight: 'bold'
    },

    navigateTextContainer: {
        marginVertical: 10
    },


})