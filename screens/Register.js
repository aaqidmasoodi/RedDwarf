import { Platform, StyleSheet, Text, View, KeyboardAvoidingView, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native'
import React, { useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { useEffect } from 'react';
import { setUserName, setUserPass } from '../redux/slices/signupSlice';
import { useSelector, useDispatch } from 'react-redux';

import { BASE_URL } from '../api/config'
import axios from 'axios'
import { useNavigation } from '@react-navigation/native';


const Register = () => {

    const navigation = useNavigation();

    const dispatch = useDispatch();
    const userPhoneNumber = useSelector(state => state.signup.phoneNumber);

    const [isLoading, setIsLoading] = useState(false);
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');


    let nameInput = useRef();
    let passInput = useRef();
    let confPassInput = useRef();


    const nameValid = (value) => value.length > 0;

    const passwordsValid = (pass1, pass2) => {
        const lengthsValid = pass1.length > 8 && pass2.length > 8;
        const passwordMatch = pass1 === pass2;

        return lengthsValid && passwordMatch;
    }



    const onChangeName = (value) => {
        setName(value);

    }

    const onChangePassword = (value) => {
        setPassword(value);
    }

    const onChangeConfirmPassowrd = (value) => {
        setConfirmPassword(value);
    }

    const handleRegister = async () => {

        setIsLoading(true);
        nameInput.blur();
        passInput.blur();
        confPassInput.blur();

        await axios.post(`${BASE_URL}/accounts/register/`, {
            phone: userPhoneNumber,
            name: name,
            password: password
        })
            .then(res => {
                dispatch(setUserName(name));
                dispatch(setUserPass(password));
                setIsLoading(false);
                navigation.replace('AccountCreated');
            })

            .catch(e => {
                Alert.alert('Something went wrong. Try again!')
                setIsLoading(false);
            })

    }


    const detailsValid = () => {
        return nameValid(name) && passwordsValid(password, confirmPassword);
    }




    useEffect(() => {
        nameInput.focus();
    }, [])


    return (
        <SafeAreaView style={styles.container}>

            <KeyboardAvoidingView
                // keyboardVerticalOffset={50}
                behavior={Platform.OS === 'ios' ? 'padding' : 'undefined'}
                style={styles.avoidingContainer}
            >


                <Text style={styles.textTitle}>Setup your account.</Text>
                <View style={styles.containerInput}>

                    <View style={styles.inputBoxIcon}>
                        <AntDesign name="user" size={24} color="#4f4f4f" />
                    </View>
                    <TextInput
                        ref={(input) => nameInput = input}
                        style={styles.phoneInputStyle}
                        placeholder='Full Name'
                        value={name}
                        onChangeText={onChangeName}
                        secureTextEntry={false}


                    />

                </View>

                <View style={styles.containerInput}>

                    <View style={styles.inputBoxIcon}>
                        <MaterialIcons name="lock-outline" size={24} color="#4f4f4f" />
                    </View>
                    <TextInput
                        ref={(input) => passInput = input}
                        value={password}
                        style={styles.passwordInputStyle}
                        onChangeText={onChangePassword}
                        placeholder='Password'
                        secureTextEntry={true}
                    />

                </View>

                <View style={styles.containerInput}>

                    <View style={styles.inputBoxIcon}>
                        <MaterialIcons name="lock-outline" size={24} color="#4f4f4f" />
                    </View>
                    <TextInput
                        ref={(input) => confPassInput = input}
                        value={confirmPassword}
                        style={styles.passwordInputStyle}
                        onChangeText={onChangeConfirmPassowrd}
                        placeholder='Confirm Password'
                        secureTextEntry={true}
                    />

                </View>



                <View style={styles.viewBottom}>

                    <TouchableOpacity
                        onPress={handleRegister}
                        disabled={!detailsValid() || isLoading}
                    >
                        <View style={[styles.btnContinue,
                        {
                            borderColor: detailsValid() ? '#cf8300' : '#afafaf'
                        }
                        ]}>
                            {!isLoading && <Text style={[styles.textContinue,
                            {
                                color: detailsValid() ? '#cf8300' : '#afafaf'
                            }
                            ]}>Create my account</Text>}

                            {isLoading && <ActivityIndicator size="large" color="#cf8300" />}

                        </View>


                    </TouchableOpacity>

                </View>




            </KeyboardAvoidingView>



        </SafeAreaView>
    )
}

export default Register

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#ffffff',
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