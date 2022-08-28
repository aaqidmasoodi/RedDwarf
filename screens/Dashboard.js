import { StyleSheet, Text, View, Image, ScrollView, FlatList, TextInput, Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react'
import { MaterialIcons, Ionicons } from '@expo/vector-icons';

import TodayView from './components/Dashboard/TodayView';
import BusInfo from './components/Dashboard/BusInfo';
import { useState } from 'react';



let data = [
  {
    id: 1,
    title: 'August bus fee',
    body: 'Assalamualaikum dear all, some of the members are yet to submit their bus fee for the month of August 2022. Those who are yet to submit are requested to kindly do it as soon as possible.',
  },
  {
    id: 2,
    title: 'Route Change for 2 days',
    body: 'the bus will no longer be going via lal chowck for the next 2 days in the view of election campain. People who live in the vicinitines may contact the driver for alternative pickup point.',
  },
  {
    id: 3,
    title: 'Route Change for 2 days',
    body: 'the bus will no longer be going via lal chowck for the next 2 days in the view of election campain. People who live in the vicinitines may contact the driver for alternative pickup point.',
  },
  {
    id: 4,
    title: 'Route Change for 2 days',
    body: 'the bus will no longer be going via lal chowck for the next 2 days in the view of election campain. People who live in the vicinitines may contact the driver for alternative pickup point.',
  },
  {
    id: 5,
    title: 'Route Change for 2 days',
    body: 'the bus will no longer be going via lal chowck for the next 2 days in the view of election campain. People who live in the vicinitines may contact the driver for alternative pickup point.',
  },
]


const postAlert = async (text) => {

  console.log(text);

    let id = 10 + Math.floor(Math.random() * 10);
    let title = "New Alert";
    let body = text;

    let newAlert = {
      "id": id,
      "title": title,
      "body": body,
    }

    data.unshift(newAlert);

    // navigation.navigate('Dashboard')
};

const Dashboard = () => {

  const [coordinator, setCoordintor] = useState(true)

  const [alert, setAlert] = useState('');

  const onChangeAlert = (text) => {
    setAlert(text);
  }

  return (

    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.contentContainer}>
          <TodayView />
          <BusInfo />

          <View style={styles.noticeListContainer}>

            <View>
              <Text style={styles.noticeListHeader}>Alerts</Text>


            </View>


            <FlatList

              data={data}
              nestedScrollEnabled
              style={styles.noticeList}
              keyExtractor={(item) => item.id}
              showsHorizontalScrollIndicator={false}
              horizontal={true}
              showsVerticalScrollIndicator={false}
              tyle={styles.noticeObject}
              renderItem={({ item }) => {
                return (

                  <View style={styles.noticeObject}>
                    <Text style={{ fontWeight: 'bold', fontSize: 18, color: '#3f3f3f' }}>{item.title}</Text>
                    <Text style={{ fontSize: 16, marginTop: 5, color: '#6f6f6f' }}>{item.body}</Text>
                  </View>
                )

              }}

            />
{ coordinator &&

            <TextInput
            style={styles.alert}
            placeholder={'Send Alert'}
            onChangeText={onChangeAlert}
            onSubmitEditing={() => postAlert(alert)}
            />
}

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

  noticeListContainer: {
    marginTop: 20,
    backgroundColor: '#ffffff',
  },


  noticeListHeader: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#4f4f4f'
  },

  noticeList: {
    height: 250,
    marginTop: 10
  },

  noticeObject: {
    borderRadius: 20,
    marginRight: 10,
    width: 300,
    minHeight: 250,
    backgroundColor: '#ffffff',
    padding: 20,
    borderWidth: 1,
    borderLeftWidth: 5,
    borderTopColor: '#afafaf',
    borderRightColor: '#afafaf',
    borderBottomColor: '#afafaf',
    borderLeftColor: '#6f6f6f'

  },
  alert:{
    textAlign: 'center',
    borderWidth: 2,
    borderColor: 'grey',
    marginTop: 10,
    borderRadius: 5,
    padding: 10,
  }


});


