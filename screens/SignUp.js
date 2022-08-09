import { useState } from 'react'
import { StyleSheet, Text, View, KeyboardAvoidingView, TextInput } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { TouchableOpacity } from 'react-native-gesture-handler'


const SignUp = () => {

    const [phoneNumber, setPhoneNumber] = useState('');

    const navigation = useNavigation();

    const onChangePhone = (number) => {
        setPhoneNumber(number);
    }


    const attemptSendOTP = () => {

    }

    return (

        <SafeAreaView style={styles.container}>

            <KeyboardAvoidingView
                keyboardVerticalOffset={50}
                behavior={'padding'}
                style={styles.avoidingContainer}
            >


                <Text style={styles.textTitle}>You'll recieve a 4 digit OTP to verify your number.</Text>
                <View style={styles.containerInput}>

                    <View style={styles.openDialogueView}>
                        <Text>+91 |</Text>
                    </View>
                    <TextInput
                        style={styles.phoneInputStyle}
                        placeholder='9797 944597'
                        keyboardType='numeric'
                        value={phoneNumber}
                        onChangeText={onChangePhone}
                        secureTextEntry={false}
                        maxLength={10}


                    />

                </View>

                <View style={styles.viewBottom}>

                    <TouchableOpacity
                        onPress={attemptSendOTP}
                    >
                        <View style={[styles.btnContinue,
                        {
                            backgroundColor: phoneNumber ? '#244db7' : '#6f6f6f'
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
        color: '#4f4f4f',
        width: 300,
        textAlign: 'center'
    },


    containerInput: {
        flexDirection: 'row',
        paddingHorizontal: 12,
        borderRadius: 10,
        backgroundColor: 'white',
        alignItems: 'center',
        borderBottomColor: 1.5,
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
        minHeight: '40%',
        justifyContent: 'flex-end',
        marginBottom: 50,
        alignItems: 'center',
    },

    btnContinue: {
        width: 150,
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
    }






})