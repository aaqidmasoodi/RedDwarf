import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

import { useSelector } from 'react-redux'

const TodayView = () => {


    const user = useSelector(state => state.root.user);
    const firstName = user ? user.name.split(" ")[0] : null;
    const userProfilePhoto = user ? user.profile.profile_picture : null;


    return (
        <View style={styles.todayContainer}>
            <View>
                <Text style={styles.greetText}>Hi, {firstName}</Text>
            </View>
            <Image
                style={styles.dashboardPhoto}
                source={{
                    uri: userProfilePhoto,
                }}
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
        alignItems: 'flex-end'
    },

    greetText: {
        fontSize: 35,
        fontWeight: '300',
        color: '#6f6f6f',
        marginTop: -10
    },

    dashboardPhoto: {
        width: 40,
        height: 40,
        resizeMode: 'cover',
        borderRadius: 20,
        marginRight: 10
    }

})