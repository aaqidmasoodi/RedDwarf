import { StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react'

const QRCode = () => {
  return (
    
    <SafeAreaView style={styles.container}>
            
    <View>
        <Text style={{fontSize: 60}}>QRCode</Text>
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

  },
});