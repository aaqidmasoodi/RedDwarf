import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { Feather } from '@expo/vector-icons';
const PickupPoint = () => {
    return (
        <View style={[styles.pickupPointInfoContainer,
        Platform.OS === 'ios' ? styles.shadow : null]}>

            <View style={styles.pickupPointerHeader}>
                <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#6f6f6f' }}>Pickup Point</Text>

                <TouchableOpacity
                    onPress={() => navigation.navigate('SetPickUpPoint')}
                >
                    <Feather name="edit-2" size={22} color="#cf8300" />
                </TouchableOpacity>

            </View>

            <View style={styles.pickupPointBody}>
                <Text>Shalateng, Srinagar 190012</Text>
            </View>


        </View>
    )
}

export default PickupPoint

const styles = StyleSheet.create({

    shadow: {
        shadowOffset: { width: 0, height: 0 },
        shadowColor: 'black',
        shadowOpacity: 0.2,
        shadowRadius: 3,
        zIndex: 999,
    },


    pickupPointInfoContainer: {
        marginTop: 20,
        padding: 15,
        backgroundColor: '#ffffff',
        borderRadius: 10,
        elevation: 3
    },


    pickupPointerHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },


    pickupPointBody: {
        marginTop: 10
    },
})