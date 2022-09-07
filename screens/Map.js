import { Dimensions, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import { Ionicons, FontAwesome, MaterialIcons, Entypo } from '@expo/vector-icons';

import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';


const LOCATION_TRACKING = 'location-tracking';
import { useSelector, useDispatch } from 'react-redux';
import { liveSocket } from '../api/Sockets/liveLocationSocket';

import { setBusLocation, setSharingLocation, setReceivingLocation } from '../redux/slices/busLocationSlice';


const Map = () => {

  const user = useSelector(state => state.root.user);
  const navigation = useNavigation();

  const sharingLocation = useSelector(state => state.busLocation.sharingLocation)

  const payload = useSelector(state => state.busLocation.busLocation)
  const busLocation = payload ? payload.locations[0] : null
  const dispatch = useDispatch();


  // api call
  // res.data
  // setLocation(res.daat)


  liveSocket.onopen = () => {
    console.log("Connected...")
  }

  if (!user?.is_driver) {

    liveSocket.onmessage = (e) => {
      console.log("Location Received...")
      console.log(busLocation);
      dispatch(setBusLocation(e.data)); //re render
    };
  }


  const startLocationTracking = async () => {
    await Location.startLocationUpdatesAsync(LOCATION_TRACKING, {
      accuracy: Location.Accuracy.Highest,
      timeInterval: 1000,
      distanceInterval: 0,
    });
    const hasStarted = await Location.hasStartedLocationUpdatesAsync(
      LOCATION_TRACKING
    );

    hasStarted && dispatch(setSharingLocation(true));
    console.log('tracking started?', hasStarted);
  };


  const stopLocationTracking = async () => {
    await Location.stopLocationUpdatesAsync(LOCATION_TRACKING);
    dispatch(setSharingLocation(false));
  };


  useEffect(() => {
    (async () => {
      if (user?.is_driver) {

        let { status } = await Location.requestBackgroundPermissionsAsync();
        if (status !== 'granted') {
          console.log('Permission to access location was denied');
          return;
        }
      }
      else {
        console.log("Not a User Driver.")
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        showsCompass={true}
        compassOffset={{
          top: 10,
          right: 50
        }}
        // provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: 34.2311996,
          longitude: 74.72715,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
      >
        {(!user?.is_driver) &&
          <Marker
            title='Bus'
            description='Live Location of Bus'
            coordinate={{
              latitude: busLocation ? busLocation.coords.latitude : 34.2311996,
              longitude: busLocation ? busLocation.coords.longitude : 74.72715,
              latitudeDelta: 0.015,
              longitudeDelta: 0.0121,
            }}
          />
        }
      </MapView>


      <TouchableOpacity
        onPress={() => navigation.navigate('Bus')}
        activeOpacity={0.9}
        style={[styles.buttonBack,
        Platform.OS === 'ios' ? styles.shadow : null]}
      >
        <Ionicons name='arrow-back' size={24} color='#cf8300' />
      </TouchableOpacity>


      <TouchableOpacity
        onPress={() => console.log('hello World')}
        style={styles.myLocationButton}
      >
        <MaterialIcons name="my-location" size={24} color="#cf8300" />
      </TouchableOpacity>

      <View
        style={[styles.bottomConsole,
        Platform.OS === 'ios' ? styles.shadow : null]}
      >
        {(user?.is_driver) &&
          (
            (!sharingLocation) ? <TouchableOpacity
              onPress={startLocationTracking}
              style={styles.startLocationSharingBtn}>
              <FontAwesome name="location-arrow" size={24} color="#cf8300" />
              <Text style={styles.startLocationSharingBtnText}>Share Live Location</Text>
            </TouchableOpacity>
              :
              <TouchableOpacity
                onPress={stopLocationTracking}
                style={styles.stopLocationSharingBtn}>
                <Entypo name="cross" size={24} color="red" />
                <Text style={styles.stopLocationSharingBtnText}>Stop Live Location</Text>
              </TouchableOpacity>

          )}

        {(!user?.is_driver) &&
          <>
            <Text>{busLocation?.coords.latitude}</Text>
            <Text>{busLocation?.coords.longitude}</Text>
            <Text>{busLocation?.timestamp}</Text>
          </>
        }

      </View>

    </View >
  )
}

export default Map

const styles = StyleSheet.create({

  shadow: {
    shadowOffset: { width: 0, height: 0 },
    shadowColor: 'black',
    shadowOpacity: 0.3,
    shadowRadius: 5,
    zIndex: 999,
  },

  container: {
    flex: 1
  },


  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height
  },

  buttonBack: {
    position: 'absolute',
    top: 75,
    left: 20,
    backgroundColor: '#ffffff',
    width: 75,
    paddingVertical: 5,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 10,
  },

  bottomConsole: {

    position: 'absolute',
    bottom: 0,
    backgroundColor: '#ffffff',
    width: '100%',
    height: '15%',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 20,
  },


  startLocationSharingBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'

  },

  startLocationSharingBtnText: {
    marginLeft: 10,
    fontSize: 18,
    color: '#cf8300',
    fontWeight: 'bold'
  },


  stopLocationSharingBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'

  },

  stopLocationSharingBtnText: {
    marginLeft: 10,
    fontSize: 18,
    color: 'red',
    fontWeight: 'bold'
  },


  myLocationButton: {
    position: 'absolute',
    top: 75,
    right: 20,
    backgroundColor: '#ffffff',
    width: 75,
    paddingVertical: 5,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 10,
  },


  busLocationMarker: {
    height: 20,
    width: 20,
    zIndex: 9999
  }





})

TaskManager.defineTask(LOCATION_TRACKING, async ({ data, error }) => {
  if (error) {
    console.log('LOCATION_TRACKING task ERROR:', error);
    return;
  }
  if (data) {
    const { locations } = data;
    let lat = locations[0].coords.latitude;
    let long = locations[0].coords.longitude;

    console.log(
      `${new Date(Date.now()).toLocaleString()}: ${lat},${long}`
    );
    liveSocket.send(JSON.stringify(data));
  }
});