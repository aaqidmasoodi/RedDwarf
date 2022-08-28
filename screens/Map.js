import { StyleSheet, Text, TouchableOpacity, View,} from 'react-native'
import React, {useState, useEffect} from 'react'
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const getLocation = () => {
  
}

const Map = () => {

  const navigation = useNavigation();
  const [location, setLocation] = useState({
    latitude: 34.2306810561,
    longitude: 74.727365319,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121,
  });

  // useEffect(() => {
  //   setInterval(() => {

  //     setLocation({location});
  //     }, 10000);
  // }, []);


  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        // provider={PROVIDER_GOOGLE}
        region={location}
      >
        <Marker coordinate={location} style={styles.marker}
        image = {require('../assets/bus.png')}
        title={"Bus 6"}
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
    flex: 1
  },


  map: {
    flex: 1
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





})