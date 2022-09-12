import { ActivityIndicator, Alert, FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import { useState, useEffect } from 'react'

import api from '../api/config';
import { setUser } from '../redux/slices/rootSlice'
import { useSelector, useDispatch } from 'react-redux'



const SelectBus = () => {

    const navigation = useNavigation();
    const [selected, setSelected] = useState(null);
    const [selectedItem, setSelectedItem] = useState(null);
    const [didSelect, setDidSelect] = useState(false);
    const [buses, setBuses] = useState(null);
    const [isFetching, setIsFetching] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const token = useSelector(state => state.root.token)

    const dispatch = useDispatch();

    useEffect(() => {
        const fetch = navigation.addListener('focus', async () => {
            setIsFetching(true);
            api.get('/buses/', {
                headers: { Authorization: `Token ${token}` }
            })
                .then(res => {
                    setBuses(res.data);
                    // console.log(res.data)
                    setIsFetching(false);

                })
                .catch(e => {
                    console.log(e.response);
                    setIsFetching(true);

                })
        });

        return fetch;
    }, [navigation]);


    const handleContinue = async () => {
        setIsLoading(true);
        api.post('/buses/allocate/', {
            id: selected
        }, {
            headers: { Authorization: `Token ${token}` }
        })
            .then(res => {

                api.get('/accounts/user-info/', {
                    headers: { Authorization: `Token ${token}` }
                })
                    .then(res => {
                        dispatch(setUser(res.data));
                        setIsLoading(false);
                        navigation.navigate('BusChanged', {
                            params: {
                                bus: selectedItem
                            }
                        })
                    })
                    .catch(e => {
                        console.log(e.response)
                    })
            })
            .catch(err => {
                setIsLoading(false);
                navigation.navigate('Bus')
                Alert.alert("Sorry, could not change your bus. Try again later!")
            })
    }



    return (
        <SafeAreaView style={styles.container}>

            <View style={styles.listHeader}>
                <Text style={styles.selectBusHeader}>Select Bus</Text>
                <>
                    {isFetching && <ActivityIndicator size="large" color="#cf8300" />}
                </>
            </View>


            {!isFetching && (buses?.length > 0) && <FlatList
                style={styles.busList}
                showsVerticalScrollIndicator={false}
                data={buses}
                keyExtractor={item => item.id}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity
                            activeOpacity={0.6}
                            onPress={() => {
                                setSelected(item.id);
                                setDidSelect(true);
                                setSelectedItem(item);
                            }}
                            style={[styles.busObject, item.id === selected && styles.selectedItem]}>

                            <View style={styles.rowView}>
                                <View>
                                    <Text style={{ fontWeight: 'bold' }}>Bus</Text>
                                    <Text style={{ fontSize: 24 }}>{item.number}</Text>
                                </View>
                                <View style={styles.busRouteEnds}>
                                    <Text style={styles.busStart}>{item.start}</Text>
                                    <Text style={styles.busDestination}>{item.destination}</Text>
                                </View>
                            </View>

                            <View style={styles.busObjBottom}>
                                <View style={styles.plateContainer}>
                                    <Text style={styles.feeTextHeader}>Plate number</Text>
                                    <Text style={styles.feeText}>{item.plate_number}</Text>
                                </View>
                                <View style={styles.feeContainer}>
                                    <Text style={styles.feeTextHeader}>Monthly Fee</Text>
                                    <Text style={styles.feeText}>₹ {item.fee}</Text>
                                </View>
                            </View>



                        </TouchableOpacity>
                    )
                }}
            />}

            {!isFetching && !(buses?.length > 0) &&
                <View style={styles.noBusesView}>
                    <Text style={styles.noBusesViewText}>There is nothing here.</Text>
                </View>
            }



            {(buses?.length > 0) && < View style={styles.viewBottom} >
                <TouchableOpacity
                    onPress={handleContinue}
                    disabled={!didSelect}
                    style={[styles.chooseBusButton, !didSelect && styles.chooseBusButtonDisabled]}>
                    {!isLoading && <Text style={[styles.chooseBusButtonText, !didSelect && styles.chooseBusButtonTextDisabled]}>Continue</Text>}
                    {isLoading && <ActivityIndicator size="large" color="#cf8300" />}
                </TouchableOpacity>
            </View >}

        </SafeAreaView >
    )
}

export default SelectBus

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        padding: 20
    },

    selectBusHeader: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#cf8300'
    },
    listHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    noBusesView: {
        flex: 1,
        // backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center'
    },

    noBusesViewText: {
        fontWeight: '600',
        fontSize: 20,
        color: '#6f6f6f',
        width: '75%',
        textAlign: 'center'
    },
    busObject: {
        borderRadius: 10,
        marginBottom: 20,
        padding: 15,
        backgroundColor: '#fafafa',
    },

    selectedItem: {
        borderWidth: 2,
        borderColor: '#cf8300',
        backgroundColor: '#ffffef',
    },

    busList: {
        marginVertical: 20,
        height: '60%',
        padding: 10
    },

    rowView: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    viewBottom: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },

    chooseBusButton: {
        borderWidth: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15,
        borderRadius: 10,
        borderColor: '#cf8300'
    },


    chooseBusButtonText: {
        color: '#cf8300',
        alignItems: 'center',
        fontSize: 18,
        fontWeight: 'bold'
    },


    chooseBusButtonDisabled: {
        borderColor: '#afafaf'
    },

    chooseBusButtonTextDisabled: {
        color: '#afafaf',
    },


    busStart: {
        textAlign: 'right',
        textTransform: 'capitalize',
        fontWeight: 'bold',
        color: '#6f6f6f'
    },

    busObjBottom: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 5,
    },

    busDestination: {
        textAlign: 'right',
        textTransform: 'capitalize',
        fontWeight: 'bold',
        color: '#6f6f6f'

    },

    feeContainer: {
        justifyContent: 'center',
        alignItems: 'flex-end',
        marginVertical: 5
    },

    plateContainer: {
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginVertical: 5
    },

    feeTextHeader: {
        fontWeight: 'bold',
        color: '#6f6f6f'
    },
    feeText: {
        fontWeight: '600',
        color: '#4f4f4f',
        textAlign: 'center',
        fontSize: 22,
        textTransform: 'uppercase'
    }



})