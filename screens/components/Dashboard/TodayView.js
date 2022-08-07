import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'


const TodayView = () => {
    return (
        <View style={styles.todayContainer}>
            <View>
                <Text style={styles.dateText}>25 July 2022</Text>
                <Text style={styles.dashboardText}>Dashboard</Text>
            </View>
            <Image
                style={styles.dashboardPhoto}
                source={require('../../../assets/app/profile_photo.jpeg')}
            />
        </View>
    )
}

export default TodayView

const styles = StyleSheet.create({

    todayContainer: {
        backgroundColor: '#ffffff',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    },

    dateText: {
        fontSize: 20,
        fontWeight: '600',
        color: '#e1aD01',
    },

    dashboardText: {
        fontSize: 35,
        fontWeight: '400',
        color: '#6f6f6f',
        marginTop: -10
    },

    dashboardPhoto: {
        width: 60,
        height: 60,
        resizeMode: 'cover',
        borderRadius: 30,
        marginRight: 10
    }

})