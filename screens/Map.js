import { StyleSheet, Text, TouchableOpacity, View,} from 'react-native'
import React, {useState, useEffect, useRef} from 'react'
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { setEnabled } from 'react-native/Libraries/Performance/Systrace';


const Map = () => {

  const [enabled, setEnabled] = useState(true);

  const funRef = useRef(null);
  const [time, setTime] = useState(0);
  const init_location = {
    latitude: 34.2306810561,
    longitude: 74.727305319,
    latitudeDelta: 0.008,
    longitudeDelta: 0.008,
  }

  const navigation = useNavigation();
  const [myLocation, setLocation] = useState({
    latitude: 34.2306810561,
    longitude: 74.727305319,
  });
  const [busLocation, setBusLocation] = useState({
    latitude: 34.0403,
    longitude: 74.8880,
  });
  const [location3, setLocation3] = useState({
    latitude: 34.2302810561,
    longitude: 74.727305319,
  });


  const getDistance = async () => {
    let url = "http://maps.googleapis.com/maps/api/directions/json?origin=" + location.latitude + "," + location.longitude + "&destination=" + location2.latitude + "," + location2.longitude + "&mode=driving&sensor=false&key=AIzaSyCqRV8TnSQYjNtxRA0o-zoDGm9UdWur1bo";
    const response2 = await fetch(url, {
        method: 'GET',
    });
    
    const status = await response2.json();
    console.log(url)
    console.log(response2);
  }
  // getDistance();

  const getLocation = async () => {
    let postData =  busLocation;
    const response = await fetch('https://qr-api-test.herokuapp.com/busSimulation', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(postData) 
    });
    
    const new_location = await response.json();
    // console.log(new_location);
    setBusLocation(new_location);
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
      },
        (loc) => {
          // console.log(loc)
          if (isSubscribed){
            setLocation({
              latitude: loc.coords.latitude,
              longitude: loc.coords.longitude,
            })
            if(loc.coords.speed > 0.001){     //for console logging. least speed
              setEnabled(true);
              let delta1 = loc.coords.latitude - busLocation.latitude;
              let delta2 = loc.coords.longitude - busLocation.longitude;
              let dist = Math.sqrt((delta1)*(delta1) + (delta2)*(delta2));
              let dist_new = dist * 111 * 1.2; // 111 is 1 kms in degree and 1.2 is my personal contribution lol
              let speed_new = loc.coords.speed * 3.6;
              let time_new = String(dist_new/speed_new * 60).slice(0,3);
              if(time_new > 200) setEnabled(false); //200 peak time
              setTime(time_new);
              console.log(loc.coords.speed + ' kmph ' + time_new + ' minutes' );
            }else{
              setEnabled(false);
            }
          }
        });
      // setLocation(location);
    })
    ();
    }, 1000);
    return () => clearInterval(funRef.current);
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
        <Marker coordinate={myLocation} style={styles.marker}
        image = {require('../assets/person.png')}
        title={"You"}
        />
        <Marker coordinate={busLocation} style={styles.marker}
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
      {
        enabled ?
        <View style={[styles.estimate, {backgroundColor: 'lightgreen'}]}>
          <Text>Estd time: {time} mins</Text>
        </View>
        :
        <View style={[styles.estimate, {backgroundColor: 'lightyellow'}]}>
          <Text>Moving slow/Stopped</Text>
        </View>
      }

      <View style={styles.mapButtons}>

      <TouchableOpacity 
            style={styles.btn_map1}
           onPress = {() => _mapView.animateToRegion({
            latitude: busLocation.latitude,
            longitude: busLocation.longitude,
            latitudeDelta: 0.008,
            longitudeDelta: 0.008,
          }, 3000)}>
          <Ionicons name="bus-sharp" size={24} />
      </TouchableOpacity>

      <TouchableOpacity 
            style={styles.btn_map2}
           onPress = {() => _mapView.animateToRegion({
            latitude: myLocation.latitude,
            longitude: myLocation.longitude,
            latitudeDelta: 0.001,
            longitudeDelta: 0.001,
          }, 3000)}>
          <Ionicons name="person-sharp" size={24} />
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

  

  btn_map1:{
    bottom: 20,
    left: 50,
    position: 'absolute',
    margin: 5,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    
  },
  btn_map2:{
    position: 'absolute',
    bottom: 20,
    right: 50,
    margin: 5,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    
  },

  estimate: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    position: 'absolute',
    marginTop: 75,
    right: 0,
    width: 200,
    justifyContent: 'center',
    opacity: 0.8
  }



})