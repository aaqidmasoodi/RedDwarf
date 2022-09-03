import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const DriverInfo = () => {
    return (
        <View style={styles.driverContainer}>

            <View style={styles.driverContainerHeader}>
                <Text style={{ fontSize: 22, fontWeight: 'bold', color: '#6f6f6f' }}>Driver</Text>
                <Text style={{ fontSize: 18, fontWeight: '600', color: '#4f4f4f' }}>Mr. {'Adeeb Rahman'}</Text>
            </View>

            <TouchableOpacity style={styles.driverNumber}>
                <Text style={{ color: '#cf8300', fontWeight: '600' }}>Call {'+91 9797 944597'}</Text>
            </TouchableOpacity>

        </View>
    )
}

export default DriverInfo

const styles = StyleSheet.create({

    driverContainer: {
        marginTop: 20,
    },

    driverContainerHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },


    driverNumber: {
        marginTop: 10,
        padding: 10,
        borderWidth: 2,
        borderColor: '#cf8300',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center'
    }
})