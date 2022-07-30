import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';

const LiveLocation = () => {

  const navigation = useNavigation();

  return (
    <TouchableOpacity
                style={styles.locationContainer}
                activeOpacity={0.9}
                onPress={() => navigation.navigate('Map')}
                >
                    <View style={styles.smallMapContainer}>

                    <MapView
                    style={styles.smallMap}
                    provider={PROVIDER_GOOGLE}
                    region={{
                      latitude: 37.78825,
                      longitude: -122.4324,
                      latitudeDelta: 0.015,
                      longitudeDelta: 0.0121,
                    }}
                    >
                    </MapView>
                    </View>

                  <View style={styles.mapOverlay}>
                    <View>
                      <Text style={{fontWeight: 'bold', fontSize: 16, color: '#6f6f6f'}}>Live location Unavailable</Text>
                    </View>
                  </View>

    </TouchableOpacity>
  )
}

export default LiveLocation

const styles = StyleSheet.create({
    locationContainer: {
        elevation: 10,
        marginTop: 20,
        backgroundColor: 'white',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        width: '100%',
        height: 200,
        elevation: 10,

    
      },
    
    
      smallMapContainer: {
        flex: 3,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
      },
    
    
      smallMap: {
        borderRadius: 20,
        flex: 3,

      },
    
    
      mapOverlay: {
        flex: 1,
        backgroundColor: '#ffffff',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        padding: 15
        
      }
})