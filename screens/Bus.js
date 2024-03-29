import { StyleSheet, Text, TouchableOpacity, View, ScrollView, RefreshControl, Image, Dimensions } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useEffect, useState } from 'react'


import BusBasicInfo from './components/Bus/BusBasicInfo';
import SeatInfo from './components/Bus/SeatInfo';
import LiveLocation from './components/Bus/LiveLocation';
import DriverInfo from './components/Bus/DriverInfo';
import Members from './components/Bus/Members';
import DriverBusInfo from './components/Bus/DriverBusInfo';
import SelectBusComponent from './components/SelectBusComponent';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { setUser } from '../redux/slices/rootSlice';
import api from '../api/config'


const Bus = () => {
    const user = useSelector(state => state.root.user);
    const bus = user ? user.bus : null;
    const navigation = useNavigation();
    const token = useSelector(state => state.root.token);
    const dispatch = useDispatch();
    const [refreshing, setRefreshing] = useState(false);
    const handleRefresh = () => {
        setRefreshing(true);

        if (token !== null) {
            api.get('/accounts/user-info/', {
                headers: { Authorization: `Token ${token}` }
            })
                .then(res => {
                    dispatch(setUser(res.data))
                    setRefreshing(false);

                })
                .catch(err => {
                    console.log(err.response);
                    setRefreshing(false);
                })
        }
    }


    // const refresh = () => {
    //     if (token !== null) {
    //         api.get('/accounts/user-info/', {
    //             headers: { Authorization: `Token ${token}` }
    //         })
    //             .then(res => {
    //                 dispatch(setUser(res.data))
    //             })
    //             .catch(err => {
    //                 console.log(err.response);
    //             })
    //     }

    // }

    // useEffect(() => {
    //     const log = navigation.addListener('focus', () => {
    //         refresh();
    //     });

    //     return log;
    // }, [navigation]);

    return (

        <SafeAreaView style={styles.container}>

            {bus && <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={handleRefresh}
                    />
                }
            >
                <View style={styles.contentContainer}>





                    <BusBasicInfo />

                    {(user?.is_driver) && <DriverBusInfo />}

                    {(user?.is_driver) && <Members />}

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
