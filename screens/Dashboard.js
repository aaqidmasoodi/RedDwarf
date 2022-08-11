import { StyleSheet, Text, View, Image, ScrollView, FlatList } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react'

import TodayView from './components/Dashboard/TodayView';
import BusInfo from './components/Dashboard/BusInfo';


const data = {

}


const Dashboard = () => {
  return (

    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.contentContainer}>
          <TodayView />
          <BusInfo />

          <View style={styles.notifyContainer}>

            <View>
              <Text style={styles.notifyHeader}>Notices</Text>
            </View>


            {/* <FlatList



            /> */}

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
    padding: 20,
  },

  notifyContainer: {
    marginTop: 20
  },


  notifyHeader: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#4f4f4f'
  }

});


