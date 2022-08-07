import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react'

const QRCode = () => {
  return (

    <SafeAreaView style={styles.container}>

      <View style={styles.textContainer}>
        <Text style={styles.scanText}>Show QR code to validate</Text>
        <Text style={styles.validateText}> Your payment can be securely validated</Text>

        <TouchableOpacity>
          <Text style={styles.viewQRBtn}>View QR</Text>
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
    marginTop: 30,
    padding: 20,
    fontWeight: '600',
    fontSize: 18,
    color: 'blue'
  }
});