import { StyleSheet, Text, TouchableOpacity, View,} from 'react-native'
import React, {useState, useEffect, useRef} from 'react'
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';


const Map = () => {

  const funRef = useRef(null);

  const init_location = {
    latitude: 34.2306810561,
    longitude: 74.727305319,
    latitudeDelta: 0.008,
    longitudeDelta: 0.008,
  }

  const navigation = useNavigation();
  const [location, setLocation] = useState({
    latitude: 34.2306810561,
    longitude: 74.727305319,
  });
  const [location2, setLocation2] = useState({
    latitude: 34.0403,
    longitude: 74.8880,
  });
  const [location3, setLocation3] = useState({
    latitude: 34.2302810561,
    longitude: 74.727305319,
  });


  const getDistance = async () => {
    let url = "http://maps.googleapis.com/maps/api/directions/json?origin=" + location.latitude + "," + location.longitude + "&destination=" + location2.latitude + "," + location2.longitude + "&mode=driving&sensor=false&key=AIzaSyD_6Do63-2q2j1ijYqbeIUMaVQ2560fKvo";
    const response2 = await fetch(url, {
        method: 'GET',
    });
    
    const status = await response2.json();
    // console.log(url)
    console.log(response2);
  }
  getDistance();

  const getLocation = async () => {
    let postData =  location2;
    const response = await fetch('https://qr-api-test.herokuapp.com/busSimulation', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(postData) 
    });
    
    const new_location = await response.json();
    // console.log(new_location);
    setLocation2(new_location);
  }
  
  const getLocation2 = async () => {
    let coord1 = location2.latitude;
    let coord2 = location2.longitude;
    new_location.latitude = coord1 += Math.random() * 0.0001 ;
    new_location.longitude = coord2 += Math.random() * 0.0001 ;
    setLocation3(new_location);
  }

  useEffect(() => {
    funRef.current = setInterval(() => {
      getLocation();

    }, 2000);
    return () => clearInterval(funRef.current);
  }, []);


  useEffect(() => {
    let isSubscribed = true;
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();    //need bgPerm too
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let locations = await Location.watchPositionAsync({
        enableHighAccuracy: true ,
        accuracy: Location.Accuracy.Highest,
        distanceInterval: 2,
        timeInterval: 1000 },
        (loc) => {
          // console.log(loc)
          if (isSubscribed){
            setLocation({
              latitude: loc.coords.latitude,
              longitude: loc.coords.longitude,
            })
          }
        });
      // setLocation(location);
    })
    ();
    return () => (isSubscribed = false)
  }, []);
  
  var _mapView = MapView;

  return (
    <View style={styles.container}>
      <MapView
        ref = {(mapView) => { _mapView = mapView; }}
        style={styles.map}
        // provider={PROVIDER_GOOGLE}
        initialRegion={init_location}
      >
        <Marker coordinate={location} style={styles.marker}
        image = {require('../assets/person.png')}
        title={"You"}
        />
        <Marker coordinate={location2} style={styles.marker}
        image = {require('../assets/bus.png')}
        title={"Bus 5"}
        description={"Docking sucessfull!"}
        />
        <Marker coordinate={location3} style={styles.marker}
        image = {require('../assets/bus.png')}
        title={"Bus 4"}
        description={"Docking sucessfull!"}
        />
      </MapView>


      <TouchableOpacity
        onPress={() => navigation.navigate('Bus')}
        activeOpacity={0.9}
        style={[styles.button,
        Platform.OS === 'ios' ? styles.shadow : null]}
      >
        <Ionicons name='arrow-back' size={24} color='blue' />
      </TouchableOpacity>

      <View style={styles.mapButtons}>

      <TouchableOpacity 
            style={styles.btn_map}
           onPress = {() => _mapView.animateToRegion({
            latitude: 34.0403,
            longitude: 74.8880,
            latitudeDelta: 0.008,
            longitudeDelta: 0.008,
          }, 3000)}>
          <Text style={{color: 'black'}}>Bus location</Text>
      </TouchableOpacity>

      <TouchableOpacity 
            style={styles.btn_map}
           onPress = {() => _mapView.animateToRegion({
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.001,
            longitudeDelta: 0.001,
          }, 3000)}>
          <Text style={{color: 'black'}}>My location</Text>
      </TouchableOpacity>
    </View>
    </View>
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
    flex: 1,
    overflow:'hidden',
    borderRadius: 10, 
  },


  map: {
    flex: 1,
  },

  button: {
    position: 'absolute',
    marginTop: 75,
    marginLeft: 20,
    backgroundColor: '#ffffff',
    width: 75,
    paddingVertical: 5,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 10,
  },

  mapButtons:{
    flexDirection: 'row',
    justifyContent: 'space-around',
    textAlign: 'center',
    margin: 5,
  },

  btn_map:{
    margin: 5,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    
  }



})