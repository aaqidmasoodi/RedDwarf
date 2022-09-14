import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Ionicons } from '@expo/vector-icons';
import { StripeProvider } from '@stripe/stripe-react-native';
import Payment from './Payment';
import { STRIPE_PUBLISHABLE_KEY } from '@env';
import { useSelector } from 'react-redux';
import { getFormattedDateFull } from '../../../utils/getFormattedDate';

const SeatInfo = () => {


  const user = useSelector(state => state.root.user);
  const active = user?.seatreservationstatus.status
  const reservationStatus = useSelector(state => state.root.user?.seatreservationstatus)
  const expiryDate = reservationStatus?.expiry_date ? getFormattedDateFull(reservationStatus.expiry_date) : 'Not available';

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

      <View style={[styles.seatInfoBottom, active ? styles.seatInfoBottomActive : styles.seatInfoBottomExpired]}>

        {active ?
          <View style={styles.seatBookedStatus}>
            <Text style={styles.seatBookedText}>Reserved</Text>
            <Ionicons name='checkmark-sharp' size={26} color='#ffffff' />
          </View> :

          <View style={styles.seatBookedStatus}>
            <Text style={styles.seatBookedText}>Reserve your seat</Text>
            <Ionicons name='warning' size={26} color='#ffffff' />
          </View>
        }

        {active && <View style={styles.seatBookingUpdate}>

          <View>
            <Text style={{ textAlign: 'center', fontWeight: '600', fontSize: 18, color: '#fff' }}>Your seat is reserved.</Text>
            <Text style={{ textAlign: 'center', fontSize: 14, color: '#fff', marginTop: 2 }}>Next payment date is {expiryDate}.</Text>
          </View>

        </View>}


        <StripeProvider publishableKey={STRIPE_PUBLISHABLE_KEY}>
          {!active && <Payment />}
        </StripeProvider>




      </View>

    </View>
  )
}


export default SeatInfo

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
    height: 300,
    borderRadius: 20,
    elevation: 5,
  },

  seatInfoTop: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 30,

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