import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import QRCode from 'react-native-qrcode-svg';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';


const QR = () => {
    
    const navigation = useNavigation();
    const [qrvalue, setQRvalue] = useState('');
    const [loading, setLoading] = useState(true);

    const getQR = async () => {
        try {
            const response = await fetch('https://qr-api-test.herokuapp.com/getQr');
            const json = await response.json();
            setQRvalue(json['token']);
        }
        catch (error){
            console.log(error);
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getQR();
        setInterval(() => {
            getQR();
          }, 30000);
      }, []);

    return (
        <SafeAreaView style={styles.container}>
            {
                loading ? <><ActivityIndicator size="large" color="#cf8300" /> 
                <Text>Loading</Text>
                 </> :
            <View style={styles.container}>
            <QRCode
            value={qrvalue}
                size={250}
                color="black"
                backgroundColor="white"
                />
            <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('QRCode')}>
                <Text style={styles.btntxt}>Back</Text>
            </TouchableOpacity>
            </View>
            }
        </SafeAreaView>

    )
}

export default QR

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center'
    },

    btn: {
        padding: 10,
        justifyContent: 'center',
        textAlign: 'center',
        marginTop: 20,
        borderRadius: 5,
    },
    btntxt: {
        textAlign: 'center',
        padding: 15,
        fontWeight: '600',
        fontSize: 18,
        color: '#cf8300',
        borderColor: '#cf8300',
        borderWidth: 2,
        borderRadius: 5,
    }
})