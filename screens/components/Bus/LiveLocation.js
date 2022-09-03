import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';

const LiveLocation = () => {

  const navigation = useNavigation();
  const [status, setStatus] = useState(false);

  const sharingLocation = async () => {
    const response = await fetch('https://qr-api-test.herokuapp.com/locationSharing?bus=5', {
        method: 'GET',
    });
    
    const status = await response.json();
    setStatus(status.sharing);
  }
  
  useEffect(() => {
    sharingLocation();
  }, [])
  

  return (
    <TouchableOpacity
      disabled={false}
      style={[styles.locationContainer,
      Platform.OS === 'ios' ? styles.shadow : null]}
      activeOpacity={0.9}
      onPress={() => navigation.navigate('Map')}
    >
      <View style={styles.smallMapContainer}>

        <MapView
          style={styles.smallMap}
          // provider={PROVIDER_GOOGLE}
          scrollEnabled={false}
          zoomEnabled={false}
          region={{
            latitude: 34.23119965611817,
            longitude: 74.7271553195992,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}
        >
        </MapView>
      </View>

      <View style={[styles.mapOverlay, status && {backgroundColor: 'blue'}]}>
        <View>
          {
            status ?
            <Text style={{ fontWeight: 'bold', fontSize: 16, color: 'white', textAlign:'center' }}>Real-time location available</Text>
            :
            <Text style={{ fontWeight: 'bold', fontSize: 16, color: 'white', textAlign: 'center' }}>Real-time location unavailable</Text>
          }
        </View>
      </View>

    </TouchableOpacity>
  )
}

export default LiveLocation

const styles = StyleSheet.create({

  shadow: {
    shadowOffset: { width: 0, height: 5 },
    shadowColor: 'black',
    shadowOpacity: 0.3,
    shadowRadius: 5,
    zIndex: 999,
  },

  locationContainer: {
    elevation: 10,
    marginTop: 20,
    backgroundColor: 'white',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width: '100%',
    height: 200,
    elevation: 5,
    overflow: 'hidden'


  },


  smallMapContainer: {
    flex: 3,

  },


  smallMap: {
    flex: 3,

  },


  mapOverlay: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    padding: 15,
    backgroundColor: 'grey'
  }
})