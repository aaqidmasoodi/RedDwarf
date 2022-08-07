import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const Map = () => {

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        region={{
          latitude: 34.23119965611817,
          longitude: 74.7271553195992,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
      >
      </MapView>


      <TouchableOpacity
        onPress={() => navigation.navigate('Bus')}
        activeOpacity={0.9}
        style={styles.button}
      >
        <Ionicons name='arrow-back' size={24} color='blue' />
      </TouchableOpacity>



    </View>
  )
}

export default Map

const styles = StyleSheet.create({
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