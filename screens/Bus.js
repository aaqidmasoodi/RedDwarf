import { StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react'


import BusBasicInfo from './components/Bus/BusBasicInfo';
import SeatInfo from './components/Bus/SeatInfo';
import LiveLocation from './components/Bus/LiveLocation';



const Dashboard = () => {


  return (

        <SafeAreaView style={styles.container}>
            
            


            <ScrollView>
              <View style={styles.contentContainer}>                
                <BusBasicInfo/>

                <SeatInfo/>

                <LiveLocation/>

  

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
  },


  

  });


