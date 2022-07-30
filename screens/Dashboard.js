import { StyleSheet, Text, View, Image, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react'

import TodayView from './components/Dashboard/TodayView';
import BusInfo from './components/Dashboard/BusInfo';



const Dashboard = () => {
  return (

        <SafeAreaView style={styles.container}>
            <ScrollView>
              <View style={styles.contentContainer}>                
                <TodayView/>
                <BusInfo/>
      

              </View>
            </ScrollView>
        </SafeAreaView>
  )
}

export default Dashboard

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#ffffff',
  
    },

    contentContainer: {
      height: '100%',
      paddingHorizontal: 20,
      paddingBottom: 20
    }

  });


