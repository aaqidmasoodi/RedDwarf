import { StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react'


import BusBasicInfo from './components/Bus/BusBasicInfo';
import SeatInfo from './components/Bus/SeatInfo';
import LiveLocation from './components/Bus/LiveLocation';
import DriverInfo from './components/Bus/DriverInfo';

import SelectBusComponent from './components/SelectBusComponent';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import MapView from 'react-native-maps';


const Bus = () => {
    const user = useSelector(state => state.root.user);
    const bus = user ? user.bus : null;
    const navigation = useNavigation();

    return (

        <SafeAreaView style={styles.container}>

            {bus && <ScrollView>
                <View style={styles.contentContainer}>

                    <BusBasicInfo />
                    {(!user?.is_driver) && <SeatInfo />}


                    <LiveLocation />

                    {(!user?.is_driver) && <DriverInfo />}

                </View>
            </ScrollView>}






            {!bus &&
                <SelectBusComponent />
            }

        </SafeAreaView>
    )
}

export default Bus

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',

    },

    contentContainer: {
        height: '100%',
        padding: 20,
    },

    flexFullView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    flexFullView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },


    noBusHeader: {
        fontSize: 24,
        color: '#4f4f4f',
        fontWeight: '600',
        marginVertical: 10,
    },

    noBusBody: {
        width: '80%',
        textAlign: 'center',
        color: '#6f6f6f',
        fontSize: 16,
        fontWeight: '400'

    },

    chooseBusBtn: {
        marginVertical: 30,
        minWidth: 150,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        borderRadius: 10
    },

    navBtn: {
        marginVertical: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },


});
