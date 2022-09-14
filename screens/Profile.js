import { StyleSheet, View, ScrollView, RefreshControl } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import api from '../api/config'
import { setUser } from '../redux/slices/rootSlice';

import ProfileHeader from './components/Profile/ProfileHeader';
import PickupPoint from './components/Profile/PickupPoint';
import ReservationStatus from './components/Profile/ReservationStatus';
import LatestPayments from './components/Profile/LatestPayments';



const Profile = () => {

  const user = useSelector(state => state.root.user);
  const token = useSelector(state => state.root.token);

  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);

  const refresh = () => {
    if (token !== null) {
      api.get('/accounts/user-info/', {
        headers: { Authorization: `Token ${token}` }
      })
        .then(res => {
          dispatch(setUser(res.data))
        })
        .catch(err => {
          console.log(err.response);
        })
    }

  }

  const handleRefresh = () => {
    setRefreshing(true);
    refresh();
    setRefreshing(false);
  }





  // useEffect(() => {
  //   const log = navigation.addListener('focus', () => {
  //     refresh();
  //   });

  //   return log;
  // }, [navigation]);


  return (

    <SafeAreaView style={styles.container}>

      <ScrollView
        nestedScrollEnabled
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
          />
        }
      >
        <View style={styles.contentContainer}>


          <ProfileHeader />


          {!(user?.is_driver) &&
            <>
              <PickupPoint />
              <ReservationStatus />
              <LatestPayments />
            </>}


        </View>
      </ScrollView>


    </SafeAreaView >
  )
}

export default Profile

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