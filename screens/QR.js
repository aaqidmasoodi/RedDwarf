import { StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import QRCode from 'react-native-qrcode-svg';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import api from '../api/config';


const QR = ({ route }) => {

    const funRef = useRef(null);

    const [qrvalue, setQrvalue] = useState(route.params.payload);
    const token = useSelector(state => state.root.token)


    const refreshQR = async () => {
        api.get('/payments/generate-qr/', {
            headers: { Authorization: `Token ${token}` }
        })
            .then(res => {
                setQrvalue(res.data.payload);
                console.log(res.data.payload);
            })
            .catch(e => {
                console.log(e.response)
            })
    }

    useEffect(() => {
        funRef.current = setInterval(() => {
            refreshQR();
        }, 30000);
        return () => {
            clearInterval(funRef.current);
        };
    }, []);



    return (
        <SafeAreaView style={styles.container}>
            <QRCode
                value={qrvalue ? qrvalue : 'https://cukbrs.herokuapp.com/'}
                size={250}
                color="black"
                backgroundColor="white"
            />
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
    }
})