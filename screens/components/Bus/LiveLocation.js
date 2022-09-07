import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import * as Animatable from 'react-native-animatable';


const LiveLocation = () => {

  const navigation = useNavigation();
  const user = useSelector(state => state.root.user);
  const receivingLocation = useSelector(state => state.busLocation.receivingLocation);

  const blink = {
    0: {
      opacity: 0,
    },

    0.5: {
      opacity: 1
    },

    1: {
      opacity: 0
    }

  }

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
          scrollEnabled={false}
          zoomEnabled={false}
          region={{
            latitude: 34.23119965611817,
            longitude: 74.7271553195992,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}
        />

        {receivingLocation &&
          <Animatable.View
            animation={blink}
            duration={500}
            iterationCount={'infinite'}
            iterationDelay={1000}
            easing={'ease-in-out'}

            style={styles.locationLiveIndicator}>

          </Animatable.View>}
      </View>

      <View style={styles.mapOverlay}>
        {!receivingLocation && <View style={styles.mapOverlayHeader}>
          <Text style={{ fontWeight: 'bold', fontSize: 16, color: '#6f6f6f' }}>Live location Unavailable</Text>
          <></>
        </View>}
        {receivingLocation && <View style={styles.mapOverlayHeader}>
          <Text style={{ fontWeight: 'bold', fontSize: 16, color: '#6f6f6f' }}>Live location Available</Text>
          <Text>Tap to View</Text>
        </View>}
      </View>



    </TouchableOpacity>
  )
}

export default LiveLocation

const styles = StyleSheet.create({

  shadow: {
    shadowOffset: { width: 0, height: 0 },
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowRadius: 3,
    zIndex: 999,
  },


  locationContainer: {
    elevation: 10,
    marginTop: 20,
    backgroundColor: 'white',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    width: '100%',
    height: 200,
    overflow: 'hidden',
    elevation: 5,
  },


  smallMapContainer: {
    overflow: 'hidden',
    flex: 3,

  },


  smallMap: {
    overflow: 'hidden',
    flex: 3,

  },


  mapOverlay: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    padding: 15

  },

  mapOverlayHeader: {

    flexDirection: 'row',
    justifyContent: 'space-between'

  },

  locationLiveIndicator: {
    height: 15,
    width: 15,
    backgroundColor: 'red',
    position: 'absolute',
    borderRadius: 7.5,
    top: 20,
    right: 20
  }
})