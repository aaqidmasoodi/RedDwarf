import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';



const SelectBusComponent = () => {

    const navigation = useNavigation();

    return (
        <View style={styles.flexFullView}>
            <Ionicons style={{ height: 64 }} name="bus-sharp" size={64} color={'#cf8300'} />

            <Text style={styles.noBusHeader}>{`Choose a bus`}</Text>
            <Text style={styles.noBusBody}>{`Reserve your seat monthly, track the bus, get alerts, validate your payments and much more.`}</Text>
            <TouchableOpacity style={styles.chooseBusBtn}
                onPress={() => navigation.navigate('SelectBus')}
            >
                <Text style={{ fontWeight: '600', fontSize: 18, color: '#cf8300' }} >
                    Get Started

                </Text>
            </TouchableOpacity>
        </View>
    )
}

export default SelectBusComponent

const styles = StyleSheet.create({


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
        width: '85%',
        textAlign: 'center',
        color: '#6f6f6f',
        fontSize: 18,
        fontWeight: '400'

    },

    chooseBusBtn: {
        marginVertical: 5,
        minWidth: 150,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        borderRadius: 10
    },
})