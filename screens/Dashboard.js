import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react'

import TodayView from './components/Dashboard/TodayView';
import BusInfo from './components/Dashboard/BusInfo';
import Alerts from './components/Dashboard/Alerts';
import SelectBusComponent from './components/SelectBusComponent';
import { useSelector } from 'react-redux';

import { Entypo } from '@expo/vector-icons';

const Dashboard = () => {

  const user = useSelector(state => state.root.user);
  const bus = user ? user.bus : null;


  return (

    <SafeAreaView style={styles.container}>

      {(user?.is_driver || user?.is_coordinator) &&
        <TouchableOpacity style={styles.createAlertBtn}>
          <Entypo name="plus" size={36} color="#ffffff" />
        </TouchableOpacity>
      }

      {bus && <ScrollView nestedScrollEnabled>
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

  createAlertBtn: {
    bottom: 20,
    right: 20,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    position: 'absolute',
    backgroundColor: '#cf8300',
    width: 60,
    height: 60,
    borderRadius: 30,
    elevation: 3,
    zIndex: 9999
  }



});


