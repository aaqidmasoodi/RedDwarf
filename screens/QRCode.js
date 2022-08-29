import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import api from '../api/config';


import { useSelector } from 'react-redux';
import { useState } from 'react';


const QRCode = () => {

  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation();

  const token = useSelector(state => state.root.token)


  const handleGenerateQR = async () => {
    setIsLoading(true);
    api.get('/payments/generate-qr/', {
      headers: { Authorization: `Token ${token}` }
    })
      .then(res => {
        navigation.navigate('QR', { 'payload': res.data.payload });
        console.log(res.data.payload)
        setIsLoading(false);

      })
      .catch(e => {
        console.log(e.response)
        setIsLoading(false);

      })
  }


  return (

    <SafeAreaView style={styles.container}>

      <View style={styles.textContainer}>
        <Text style={styles.scanText}>Show QR code to validate</Text>
        <Text style={styles.validateText}> Your payment can be securely validated</Text>

        <TouchableOpacity
          style={styles.viewQRBtn}
          onPress={handleGenerateQR}
          disabled={isLoading}
        >
          {!isLoading && <Text style={{ fontWeight: '600', fontSize: 18, color: '#cf8300' }}>Generate QR</Text>}

          {isLoading && <ActivityIndicator size="large" color="#cf8300" />}
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  )
}

export default QRCode

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },

  textContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },

  scanText: {
    fontSize: 26,
    fontWeight: 'bold'
  },


  validateText: {
    textAlign: 'center',
    fontSize: 18,
    width: 300,
    color: '#4f4f4f'
  },


  viewQRBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    height: 75,
    padding: 20,
  }
});