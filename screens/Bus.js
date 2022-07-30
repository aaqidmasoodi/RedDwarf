import { StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react'


import BusBasicInfo from './components/Bus/BusBasicInfo';


const Dashboard = () => {
  return (

        <SafeAreaView style={styles.container}>
            
            <BusBasicInfo/>
             
        </SafeAreaView>
  )
}

export default Dashboard

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#ffffff',
      paddingHorizontal: 20,
      paddingVertical: 5,
  
    },

  });


