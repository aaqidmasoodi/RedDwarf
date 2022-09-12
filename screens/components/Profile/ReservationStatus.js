import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Feather } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { getFormattedDate } from '../../../utils/getFormattedDate';
const ReservationStatus = () => {

    const lastPayment = useSelector(state => state.root.user?.last_payment);
    const reservationStatus = useSelector(state => state.root.user?.seatreservationstatus)

    const lastPaymentDate = lastPayment ? getFormattedDate(lastPayment.payment_date) : 'Not available.';
    const expiryDate = reservationStatus?.expiry_date ? getFormattedDate(reservationStatus.expiry_date) : 'Not available';



    return (
        <View style={[styles.reservationStatusContainer,
        Platform.OS === 'ios' ? styles.shadow : null]}>
            <View style={styles.reservationStatusHeader}>
                <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#6f6f6f' }}>Reservation</Text>
                <Feather name="check-circle" size={22} color="#6f6f6f" />
                {/* <Feather name="alert-circle" size={24} color="black" /> */}
            </View>
            <View style={styles.reservationStatusBody}>

                <View style={styles.containerAlignLeft}>
                    <Text style={{ fontWeight: 'bold', color: '#6f6f6f' }}>Last Payment</Text>
                    <Text>{lastPaymentDate}</Text>
                </View>

                <View style={styles.containerAlignRight}>
                    <Text style={{ fontWeight: 'bold', color: '#6f6f6f' }}>Expiry</Text>
                    <Text>{expiryDate}</Text>
                </View>

            </View>

        </View>
    )
}

export default ReservationStatus

const styles = StyleSheet.create({
    shadow: {
        shadowOffset: { width: 0, height: 0 },
        shadowColor: 'black',
        shadowOpacity: 0.2,
        shadowRadius: 3,
        zIndex: 999,
    },


    reservationStatusContainer: {
        marginTop: 20,
        padding: 15,
        backgroundColor: '#ffffff',
        borderRadius: 10,
        elevation: 3

    },

    reservationStatusHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    reservationStatusBody: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    containerAlignLeft: {
        alignItems: 'flex-start',
        textAlign: 'left'
    },

    containerAlignRight: {
        alignItems: 'flex-end',
        textAlign: 'right'
    },
})