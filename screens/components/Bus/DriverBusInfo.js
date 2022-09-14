import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux';

const DriverBusInfo = () => {


    const user = useSelector(state => state.root.user);

    const getAvailableSeats = () => {
        return parseInt(user?.bus?.seats) - parseInt(user?.bus?.reserved_seats)
    }
    return (
        <View style={[styles.seatInfoContainer,
        Platform.OS === 'ios' ? styles.shadow : null]}>

            <View style={styles.seatInfoTop}>


                <View style={styles.seatCountContainer}>
                    <Text style={styles.seatCountLabel}>Seats</Text>
                    <Text style={styles.seatCountLabel}>{user?.bus?.seats}</Text>
                </View>

                <View style={styles.availBookStatusContainer}>
                    <View>
                        <Text style={styles.seatBookLabel}>Reserved</Text>
                        <Text style={styles.seatBookCount}>{user?.bus?.reserved_seats}</Text>
                    </View>
                    <View>
                        <Text style={styles.seatAvailLabel}>Available</Text>
                        <Text style={styles.seatAvailCount}>{getAvailableSeats()}</Text>
                    </View>
                </View>


            </View>


        </View>
    )
}

export default DriverBusInfo

const styles = StyleSheet.create({


    shadow: {
        shadowOffset: { width: 0, height: 2 },
        shadowColor: 'black',
        shadowOpacity: 0.2,
        shadowRadius: 5,
        zIndex: 999,
    },


    seatInfoContainer: {
        marginTop: 10,
        marginBottom: 5,
        borderRadius: 20,
        backgroundColor: '#ffffff',
        padding: 20,
        elevation: 5,
    },

    seatInfoTop: {
        flex: 1,
        backgroundColor: '#ffffff',
    },

    seatCountContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    seatCountLabel: {
        fontSize: 26,
        fontWeight: '800',
        color: '#6f6f6f'
    },

    availBookStatusContainer: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },


    seatBookLabel: {
        fontSize: 18,
        color: '#6f6f6f',
        fontWeight: 'bold'
    },

    seatAvailLabel: {
        fontSize: 18,
        color: '#6f6f6f',
        fontWeight: 'bold'
    },

    seatBookCount: {
        fontWeight: 'bold',
        fontSize: 24,
        color: '#6f6f6f'

    },

    seatAvailCount: {
        fontWeight: 'bold',
        fontSize: 24,
        color: '#6f6f6f',
        textAlign: 'right'
    },



    seatInfoBottom: {
        flex: 1,
        height: '50%',
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 20,
        padding: 10
    },

    seatInfoBottomActive: {
        backgroundColor: '#43a97e',

    },

    seatInfoBottomExpired: {
        backgroundColor: '#4f4f4f',
    },


    seatBookedStatus: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        paddingVertical: 5
    },

    seatBookedText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#ffffff'
    },

    seatBookingUpdate: {
        flex: 1,
        marginTop: 5,
        borderWidth: 1,
        borderColor: '#ffffff',
        borderRadius: 20,
        padding: 10,
        justifyContent: 'center',
        alignContent: 'center'
    },
})