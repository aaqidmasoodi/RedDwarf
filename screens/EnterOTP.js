import { Platform, StyleSheet, Text, View, KeyboardAvoidingView, TextInput, TouchableOpacity, ActivityIndicator, Alert } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native';
import { setUserPhone } from '../redux/slices/signupSlice';
import { useDispatch } from 'react-redux';
import api from '../api/config';




const EnterOTP = ({ route }) => {


    const dispatch = useDispatch();
    let textInput = useRef(null);

    const lengthOTP = 4;
    const [otpValue, setOtpValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [validated, setvalidated] = useState(false);
    const [otpFilled, setOtpFilled] = useState(false);
    const [allowBack, setAllowBack] = useState(false);


    const navigation = useNavigation();


    useEffect(() => {
        textInput.focus();
    }, []);



    useEffect(() => {
        if (validated) {
            navigation.replace('OTPValidated');
        }
    }, [validated])


    useEffect(() => {
        if (otpFilled) {

            attemptValidateOTP();
        }

    }, [otpFilled]);


    useEffect(() => {
        if (allowBack) {

            navigation.navigate('SignUp');

        }
    }, [allowBack])


    useEffect(
        () =>
            navigation.addListener('beforeRemove', (e) => {


                if (allowBack || otpFilled && !isLoading) {

                    return;
                }


                e.preventDefault();
            }),
        [navigation, allowBack, otpFilled, isLoading]
    );


    const attemptValidateOTP = () => {
        setIsLoading(true);

        api.post('/accounts/validate-otp/', {
            phone: route.params.phone, // temporary, later we must use redux to handle this part
            otp: otpValue
        })
            .then(response => {
                if (response.status === 200) {
                    setIsLoading(false);
                    setvalidated(true);
                }

            })

            .catch(error => {
                setIsLoading(false);
                setOtpValue(null);
                setOtpFilled(false);

                if (error.response.data.otp) {
                    Alert.alert(error.response.data.otp[0]);
                    setIsLoading(false);

                }

                if (error.response.data.error) {
                    Alert.alert(error.response.data.error);
                    setIsLoading(false);


                }

            })

    }

    const onChangeText = (val) => {
        setOtpValue(val);

        if (val.length === 4) {
            setOtpFilled(true);
        }
    }



    const handleChangePhoneNumber = () => {
        dispatch(setUserPhone(null));
        setAllowBack(true);
    }




    return (

        <>

            <SafeAreaView style={styles.container}>

                <KeyboardAvoidingView
                    // keyboardVerticalOffset={50}
                    behavior={Platform.OS === 'ios' ? 'padding' : 'undefined'}
                    style={styles.avoidingContainer}
                >

                    <Text style={styles.textTitle}>Enter the OTP sent via SMS</Text>

                    <View>

                        <View style={styles.containerInput}>

                            <TextInput
                                ref={(input) => textInput = input}
                                onChangeText={onChangeText}
                                editable={!otpFilled}
                                selectTextOnFocus={!otpFilled}
                                style={styles.OTPInput}
                                value={otpValue}
                                maxLength={lengthOTP}
                                keyboardType='numeric'
                                returnKeyType='done'
                                onSubmitEditing={attemptValidateOTP}

                            />



                        </View>

                    </View>




                    <View style={styles.bottomView}>
                        <TouchableOpacity
                            onPress={(handleChangePhoneNumber)}
                        >

                            <View style={styles.btnChangeNumber}>
                                <Text style={styles.textChange}>Change number</Text>
                            </View>

                        </TouchableOpacity>
                        <TouchableOpacity>

                            <View style={styles.btnResend}>
                                <Text style={styles.textResend}>{"Resend OTP (24)"}</Text>
                            </View>

                        </TouchableOpacity>
                    </View>





                </KeyboardAvoidingView>




            </SafeAreaView>

            {isLoading && <View style={styles.laodingOverlay}>

                <ActivityIndicator size="large" color="#cf8300" />

            </View>}
        </>
    )
}

export default EnterOTP

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
        alignItems: 'center',
        justifyContent: 'center'


    },

    OTPInput: {
        width: '100%',
        height: 100,
        fontSize: 36,
        textAlign: 'center',
        justifyContent: 'space-between',
        alignItems: 'center',
        letterSpacing: 20,
    },





    bottomView: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        width: '100%',
        marginBottom: 20,


    },

    btnChangeNumber: {
        borderRadius: 10,
        alignItems: 'flex-start',
        justifyContent: 'center',
    },


    textChange: {
        color: '#cf8300',
        alignItems: 'center',
        fontSize: 16
    },


    btnResend: {
        borderRadius: 10,
        alignItems: 'flex-start',
        justifyContent: 'center'
    },


    textResend: {
        color: '#cf8300',
        alignItems: 'center',
        fontSize: 16
    },


    laodingOverlay: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        backgroundColor: '#cf830025',
        justifyContent: 'center',
        alignItems: 'center'

    },

})