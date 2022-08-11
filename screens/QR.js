import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import QRCode from 'react-native-qrcode-svg';
import { SafeAreaView } from 'react-native-safe-area-context';

const QR = () => {

    const [qrvalue, setQrvalue] = useState('');

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