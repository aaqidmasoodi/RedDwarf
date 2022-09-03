import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react'

import TodayView from './components/Dashboard/TodayView';
import BusInfo from './components/Dashboard/BusInfo';
import Alerts from './components/Dashboard/Alerts';
import SelectBusComponent from './components/SelectBusComponent';
import { useSelector } from 'react-redux';



const Dashboard = () => {

  const user = useSelector(state => state.root.user);
  const bus = user ? user.bus : null;


  return (

    <SafeAreaView style={styles.container}>



      {bus && <ScrollView>
        <View style={styles.contentContainer}>
          <TodayView />
          <BusInfo />
          <Alerts />

        </View>

      </ScrollView>}


      {!bus &&

        <SelectBusComponent />
      }

    </SafeAreaView >
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
    padding: 20,
  },



});


