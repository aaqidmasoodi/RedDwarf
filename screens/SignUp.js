import { useRef, useState, useEffect } from 'react'
import { Platform, StyleSheet, Text, View, KeyboardAvoidingView, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDispatch } from 'react-redux';
import { setUserPhone } from '../redux/slices/signupSlice'

import api from '../api/config';



const SignUp = () => {


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


    const attemptSendOTP = () => {

        setIsLoading(true);
        textInput.blur();


        api.post('/accounts/send-otp/', {
            phone: phoneNumber
        })
            .then(response => {
                if (response.status === 200) {
                    setIsLoading(false);
                    dispatch(setUserPhone(phoneNumber));
                    navigation.navigate('EnterOTP', { 'phone': phoneNumber });
                }
                console.log(response.data);
                setIsLoading(false);

            })

            .catch(error => {
                setIsLoading(false);
                console.log(error)

                if (error.response.data.non_field_errors) {
                    Alert.alert(error.response.data.non_field_errors[0]);
                    setIsLoading(false);
                }

                if (error.response.data.error) {
                    Alert.alert(error.response.data.error);
                    setIsLoading(false);
                }


            })

    }


    return (

        <SafeAreaView style={styles.container}>

            <KeyboardAvoidingView
                // keyboardVerticalOffset={50}
                behavior={Platform.OS === 'ios' ? 'padding' : 'undefined'}
                style={styles.avoidingContainer}
            >


                <Text style={styles.textTitle}>You'll recieve a 4 digit OTP to verify your number.</Text>
                <View style={styles.containerInput}>

                    <View style={styles.openDialogueView}>
                        <Text>+91 |</Text>
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
                        onSubmitEditing={attemptSendOTP}


                    />

                </View>



                <View style={styles.viewBottom}>

                    <TouchableOpacity
                        onPress={attemptSendOTP}
                        disabled={!phoneIsValid(phoneNumber) || isLoading}
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
                            ]}>Send OTP</Text>}

                            {isLoading && <ActivityIndicator size="large" color="#cf8300" />}


                        </View>

                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.navigateTextContainer}
                        onPress={() => navigation.navigate('Login')}
                    >
                        <Text style={{ fontSize: 16, color: '#cf8300' }}>Already have an account? Login</Text>
                    </TouchableOpacity>

                </View>




            </KeyboardAvoidingView>



        </SafeAreaView>




    )
}

export default SignUp

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
        elevation: 2

    },


    openDialogueView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },

    phoneInputStyle: {
        marginLeft: 5,
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