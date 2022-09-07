import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAPS_API_KEY } from '@env'
import MapView, { Marker } from 'react-native-maps';

const SetPickUpPoint = () => {

    return (

        <View style={styles.container}>

            <View style={styles.mapContainer}>
                <MapView
                    style={styles.pickupPointMap}
                    mapType={"standard"}
                    initialRegion={{
                        latitude: 37.78825,
                        longitude: -122.4324,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                >

                </MapView>
                <View style={styles.autoCompleteContainer}>
                    <GooglePlacesAutocomplete
                        fetchDetails={true}
                        enablePoweredByContainer={false}
                        placeholder='Search location'
                        nearbyPlacesAPI='GooglePlacesSearch'
                        debounce={1000}
                        onPress={(data, details = null) => {
                            console.log(details.geometry);
                            console.log(details);
                        }}
                        query={{
                            key: GOOGLE_MAPS_API_KEY,
                            language: 'en',
                        }}
                    />

                </View>


            </View>

            <View style={styles.detailContainer}>

            </View>

        </View>

        // // <View style={styles.container}>
        // <>
        //     <MapView
        //         style={styles.pickupPointMap}
        //         mapType={"standard"}
        //         initialRegion={{
        //             latitude: 37.78825,
        //             longitude: -122.4324,
        //             latitudeDelta: 0.0922,
        //             longitudeDelta: 0.0421,
        //         }}
        //     />


        //     {/* <GooglePlacesAutocomplete
        //         style={styles.placesAutoComplete}
        //         fetchDetails={true}
        //         enablePoweredByContainer={false}
        //         placeholder='Search location'
        //         nearbyPlacesAPI='GooglePlacesSearch'
        //         debounce={1000}
        //         onPress={(data, details = null) => {
        //             console.log(details.geometry);
        //             console.log(details);
        //         }}
        //         query={{
        //             key: GOOGLE_MAPS_API_KEY,
        //             language: 'en',
        //         }}
        //     /> */}

        // </>
        // // </View>
    )
}

export default SetPickUpPoint

const styles = StyleSheet.create({
    container: {
        flex: 1
    },


    mapContainer: {
        flex: 3
    },

    autoCompleteContainer: {
        position: 'absolute',
        top: '20%',
        width: '100%',
        padding: 20,
        zIndex: 999,
    },

    pickupPointMap: {
        width: '100%',
        height: '100%'
    },
    detailContainer: {
        flex: 3
    }
})