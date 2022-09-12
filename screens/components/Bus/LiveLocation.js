import { StyleSheet, Text, View, TouchableOpacity, Platform } from 'react-native'
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
      activeOpacity={0.8}
      onPress={() => navigation.navigate('Map')}
    >
      <View style={[styles.smallMapContainer,
      Platform.OS === 'ios' ? styles.addRoundedCorners : null]}>

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
            duration={1000}
            iterationCount={'infinite'}
            iterationDelay={500}
            easing={'ease-in-out-sine'}
            useNativeDriver
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

        {receivingLocation && <View style={styles.mapOverlayFooter}>
          <Text style={{ fontWeight: 'bold', fontSize: 16, color: '#8f8f8f' }}>ETA</Text>
          <Text style={{ fontWeight: 'bold', fontSize: 20, color: '#6f6f6f', marginLeft: 3 }}>{'12'}</Text>
          <Text style={{ fontWeight: 'bold', fontSize: 16, color: '#8f8f8f', marginLeft: 3 }}>mins</Text>
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
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,

    width: '100%',
    height: 200,
    elevation: 5,
    zIndex: 9999,
  },


  smallMapContainer: {

    overflow: 'hidden',
    flex: 3,

  },

  addRoundedCorners: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },


  smallMap: {
    flex: 3,

  },


  mapOverlay: {
    flex: 1.25,
    alignItems: 'flex-start',
    backgroundColor: '#ffffff',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    padding: 15,

  },

  mapOverlayHeader: {

    flexDirection: 'row',
    justifyContent: 'space-between'

  },


  mapOverlayFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: -5

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