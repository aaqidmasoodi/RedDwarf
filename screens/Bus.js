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


          <BusBasicInfo />
          <SeatInfo />
          <LiveLocation />




          <View style={styles.driverContainer}>

            <View style={styles.driverContainerHeader}>
              <Text style={{ fontSize: 22, fontWeight: 'bold', color: '#6f6f6f' }}>Driver</Text>
              <Text style={{ fontSize: 18, fontWeight: '600', color: '#4f4f4f' }}>Mr. {'Adeeb Rahman'}</Text>
            </View>

            <TouchableOpacity style={styles.driverNumber}>
              <Text style={{ color: '#009ACD', fontWeight: '600' }}>Call {'+91 9797 944597'}</Text>
            </TouchableOpacity>

          </View>




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

  driverContainer: {
    marginTop: 20,
  },

  driverContainerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },


  driverNumber: {
    marginTop: 10,
    padding: 10,
    borderWidth: 2,
    borderColor: '#009ACD',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center'
  }


});


