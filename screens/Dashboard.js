import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, ActivityIndicator, RefreshControl } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useEffect } from 'react'
import TodayView from './components/Dashboard/TodayView';
import BusInfo from './components/Dashboard/BusInfo';
import Alerts from './components/Dashboard/Alerts';
import SelectBusComponent from './components/SelectBusComponent';
import { useSelector, useDispatch } from 'react-redux';

import { Entypo } from '@expo/vector-icons';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import api from '../api/config'
import { setUser } from '../redux/slices/rootSlice';
import Toast from 'react-native-toast-message'

const Dashboard = () => {

  const user = useSelector(state => state.root.user);
  const token = useSelector(state => state.root.token);
  const navigation = useNavigation();

  const bus = user ? user.bus : null;

  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);


  useEffect(() => {
    Toast.show({
      type: 'success',
      text1: 'Welcome',
      text2: `You are logged in as ${user?.name}`,
    });
  }, [])


  const handleRefresh = () => {
    setRefreshing(true);

    if (token !== null) {
      api.get('/accounts/user-info/', {
        headers: { Authorization: `Token ${token}` }
      })
        .then(res => {
          dispatch(setUser(res.data))
          setRefreshing(false);

        })
        .catch(err => {
          console.log(err.response);
          setRefreshing(false);
        })
    }
  }

  // const refresh = () => {
  //   if (token !== null) {
  //     api.get('/accounts/user-info/', {
  //       headers: { Authorization: `Token ${token}` }
  //     })
  //       .then(res => {
  //         dispatch(setUser(res.data))
  //       })
  //       .catch(err => {
  //         console.log(err.response);
  //       })
  //   }

  // }


  // useEffect(() => {
  //   const log = navigation.addListener('focus', () => {
  //     refresh();
  //   });

  //   return log;
  // }, [navigation]);


  return (

    <SafeAreaView style={styles.container}>

      {(user?.is_driver || user?.is_coordinator) &&
        <TouchableOpacity style={styles.createAlertBtn}>
          <Entypo name="plus" size={36} color="#ffffff" />
        </TouchableOpacity>
      }

      {bus && <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
          />
        }
        nestedScrollEnabled>
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


