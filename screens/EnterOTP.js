import { StyleSheet, Text, View, KeyboardAvoidingView, TextInput, TouchableOpacity } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { min } from 'react-native-reanimated';

const EnterOTP = () => {
    let textInput = useRef(null);

    const lengthOTP = 4;
    const [internalValue, setInternalValue] = useState('');


    const onChangeText = (val) => {
        setInternalValue(val);
    }


    useEffect(() => {
        textInput.focus();
    }, []);


    return (
        <SafeAreaView style={styles.container}>

            <KeyboardAvoidingView
                keyboardVerticalOffset={50}
                behavior={'undefined'}
                style={styles.avoidingContainer}
            >

                <Text style={styles.textTitle}>Enter the OTP sent via SMS</Text>

                <View>
                    <TextInput
                        ref={(input) => textInput = input}
                        onChangeText={onChangeText}
                        style={{ opacity: 0, height: 1 }}
                        value={internalValue}
                        maxLength={lengthOTP}
                        keyboardType='numeric'
                        returnKeyType='done'

                    />
                    <View style={styles.containerInput}>
                        {
                            Array(lengthOTP).fill().map((data, index) => (
                                <View
                                    key={index}
                                    style={styles.cellView}
                                >
                                    <Text
                                        style={styles.cellText}
                                        onPress={() => textInput.focus()}
                                    >
                                        {internalValue && internalValue.length > 0 ? internalValue[index] : ""}
                                    </Text>
                                </View>
                            ))
                        }

                    </View>
                </View>




                <View style={styles.bottomView}>
                    <TouchableOpacity>

                        <View style={styles.btnChangeNumber}>
                            <Text style={styles.textChange}>Change number</Text>
                        </View>

                    </TouchableOpacity>
                    <TouchableOpacity>

                        <View style={styles.btnResend}>
                            <Text style={styles.textResend}>Resend OTP</Text>
                        </View>

                    </TouchableOpacity>
                </View>

            </KeyboardAvoidingView>



        </SafeAreaView>
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

    cellView: {

        paddingVertical: 10,
        width: 40,
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 1.5

    },

    cellText: {
        textAlign: 'center',
        fontSize: 22,
        fontWeight: 'bold',
        color: '#4f4f4f'
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
        color: '#234DB7',
        alignItems: 'center',
        fontSize: 16
    },


    btnResend: {
        borderRadius: 10,
        alignItems: 'flex-start',
        justifyContent: 'center'
    },


    textResend: {
        color: '#234DB7',
        alignItems: 'center',
        fontSize: 16
    },


})