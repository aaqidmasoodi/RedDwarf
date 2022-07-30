import { StyleSheet, Text, View, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react'

import TodayView from './components/Dashboard/TodayView';
import BusInfo from './components/Dashboard/BusInfo';



const Dashboard = () => {
  return (

        <SafeAreaView style={styles.container}>
            
            <TodayView/>
            <BusInfo/>
             
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


