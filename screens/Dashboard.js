import { StyleSheet, Text, View, Image, ScrollView, FlatList, TextInput, Alert, Button } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react'
import { MaterialIcons, Ionicons } from '@expo/vector-icons';

import TodayView from './components/Dashboard/TodayView';
import BusInfo from './components/Dashboard/BusInfo';
import { useState , useRef, useEffect } from 'react';
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

async function schedulePushNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "CUKBRS",
      body: 'Start sharing the location',
    },
    trigger: { 
      // hour: 2, minute: 52, repeats: true        // time to repeat everyday
      seconds: 1
     },
  });
}

async function registerForPushNotificationsAsync() {
  let token;
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
}

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




const Dashboard = () => {

  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    schedulePushNotification().then(console.log('schedule'));

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  const [coordinator, setCoordintor] = useState(true)

  const [alert, setAlert] = useState('');

  const postAlert = async (text) => {
    if(text){
  
    console.log(text);
  
      let id = 10 + Math.floor(Math.random() * 100);
      let title = Date().split('GMT')[0];
      let body = text;
  
      let newAlert = {
        "id": id,
        "title": title,
        "body": body,
      }
  
      data.unshift(newAlert);
      setAlert('');
    }
  
      // navigation.navigate('Dashboard')
  };

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
              <View
                style={{
                  borderBottomColor: 'black',
                  borderBottomWidth: 1,
                }}
              />

            </View>


            <FlatList

              data={data}
              nestedScrollEnabled
              style={styles.noticeList}
              keyExtractor={(item) => item.id}
              showsHorizontalScrollIndicator={false}
              horizontal={false}
              showsVerticalScrollIndicator={true}
              tyle={styles.noticeObject}
              renderItem={({ item }) => {
                return (

                  <View style={styles.noticeObject}>
                    <Text style={{ fontWeight: 'bold', fontSize: 16, color: '#3f3f3f', textAlign: 'center' }}>{item.title}</Text>
                    <Text style={{ fontSize: 14, marginTop: 5, color: '#6f6f6f', textAlign:'center', fontStyle:'italic' }}>{item.body}</Text>
                  </View>
                )

              }}

            />
{ coordinator &&
            <TextInput
            value={alert}
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
    paddingBottom: 20,
    marginBottom: 20
  },

  noticeListContainer: {
    marginTop: 20,
    backgroundColor: '#ffffff',
  },


  noticeListHeader: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: 'bold',
    color: '#4f4f4f'
  },

  noticeList: {
    height: 250,
    marginTop: 10,
    
  },

  noticeObject: {
    borderRadius: 20,
    margin: 5,
    width: 300,
    backgroundColor: '#ffffff',
    padding: 20,
    borderBottomColor:'yellow',
    borderTopColor: 'red',
    borderLeftColor: 'blue',
    borderRightColor: 'green',
    borderWidth: 1,
    elevation: 10,

  },
  alert:{
    textAlign: 'center',
    borderWidth: 2,
    borderColor: 'grey',
    margin: 10,
    borderRadius: 5,
    padding: 10,
    flexDirection: 'row', 
    alignItems: 'center',
  },
  input:{
    flex: 1,
  }


});


