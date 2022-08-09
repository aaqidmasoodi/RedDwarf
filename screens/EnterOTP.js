import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const EnterOTP = () => {
    const [OTP, setOTP] = useState('');

    const navigation = useNavigation();

    const onChangeOTP = (val) => {
        setOTP(val);
    }


    const attemptVerifyOTP = () => {

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
                        value={OTP}
                        onChangeText={onChangeOTP}
                        secureTextEntry={false}
                        maxLength={10}


                    />

                </View>

                <View style={styles.viewBottom}>

                    <TouchableOpacity
                        onPress={attemptVerifyOTP}
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

export default EnterOTP

const styles = StyleSheet.create({})