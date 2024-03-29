import { StyleSheet, Text, View, Image, Platform } from 'react-native'
import React from 'react'
import * as Animatable from 'react-native-animatable';
import { Ionicons } from '@expo/vector-icons';




const BusInfo = () => {
    return (
        <Animatable.View style={[styles.busInfoContainer,
        Platform.OS === 'ios' ? styles.shadow : null]}
            animation='pulse'
            useNativeDriver

        >
            <View style={styles.busInfo}>

                <Ionicons name='bus-sharp' size={60} color='#cf8300' />

                <View style={styles.busTextInfo}>
                    <Text style={[styles.alignRight, styles.LeavingText]}>Leaving</Text>
                    <Text style={[styles.alignRight, styles.timeText]}>4:30</Text>
                    <Text style={[styles.alignRight, styles.AMPMText]}>PM</Text>
                </View>
            </View>
            <View style={styles.busStatementNotifier}>
                <Text style={[styles.alignCenter, styles.notifyText]}>Your bus will leave in about 15 mins.</Text>
            </View>
        </Animatable.View>
    )
}

export default BusInfo

const styles = StyleSheet.create({

    shadow: {
        shadowOffset: { width: 0, height: 0 },
        shadowColor: 'black',
        shadowOpacity: 0.2,
        shadowRadius: 3,
        zIndex: 999,
    },

    busInfoContainer: {
        backgroundColor: '#ffffff',
        marginTop: 20,
        padding: 20,
        justifyContent: 'center',
        alignContent: 'center',
        borderRadius: 20,
        elevation: 5,


    },

    busVector: {
        width: 60,
        height: 60,
        resizeMode: 'contain',
    },

    busInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    alignRight: {
        textAlign: 'right'
    },

    alignCenter: {
        textAlign: 'center'
    },

    busStatementNotifier: {
        alignContent: 'center'
    },

    notifyText: {
        fontSize: 15,
        fontWeight: '500',
        color: '#4f4f4f'
    },

    /* -------------- */
    LeavingText: {
        fontSize: 15,
        fontWeight: 'bold'
    },

    timeText: {
        marginTop: -5,
        fontSize: 50,
        fontWeight: 'bold'
    },

    AMPMText: {
        marginTop: -10,
        fontWeight: '600'
    }
    /* -------------- */

})