import { useRef, useState, useEffect } from 'react'
import { StyleSheet, Text, View, KeyboardAvoidingView, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'



const SignUp = () => {

    let textInput = useRef(null);

    const [phoneNumber, setPhoneNumber] = useState('');
    const [focusInput, setFocusInput] = useState(false);

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

        navigation.navigate('EnterOTP')

    }


    return (

        <SafeAreaView style={styles.container}>

            <KeyboardAvoidingView
                keyboardVerticalOffset={50}
                behavior={'undefined'}
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


                    />

                </View>

                <TouchableOpacity
                    style={styles.navigateTextContainer}
                    onPress={() => navigation.navigate('Login')}
                >
                    <Text style={{ fontSize: 16, color: '#244db7' }}>Already have an account? Login</Text>
                </TouchableOpacity>

                <View style={styles.viewBottom}>

                    <TouchableOpacity
                        onPress={attemptSendOTP}
                        disabled={!phoneIsValid(phoneNumber)}
                    >
                        <View style={[styles.btnContinue,
                        {
                            backgroundColor: phoneIsValid(phoneNumber) ? '#244db7' : '#6f6f6f'
                        }
                        ]}>
                            <Text style={styles.textContinue}>Send OTP</Text>
                        </View>

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
        backgroundColor: '#244db7'
    },

    textContinue: {
        color: '#ffffff',
        alignItems: 'center',
        fontSize: 18
    },

    navigateTextContainer: {
        marginVertical: 30,
        padding: 10
    },








})