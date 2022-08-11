import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Ionicons } from '@expo/vector-icons';
import { StripeProvider } from '@stripe/stripe-react-native';
import Payment from './Payment';
import { STRIPE_PUBLISHABLE_KEY } from '@env';


const SeatInfo = () => {

  const [active, setActive] = useState(false);

  return (

    <View style={[styles.seatInfoContainer,
    Platform.OS === 'ios' ? styles.shadow : null]}>

      <View style={styles.seatInfoTop}>


        <View style={styles.seatCountContainer}>
          <Text style={styles.seatCountLabel}>Seats</Text>
          <Text style={styles.seatCountLabel}>30</Text>
        </View>

        <View style={styles.availBookStatusContainer}>
          <View>
            <Text style={styles.seatBookLabel}>Booked</Text>
            <Text style={styles.seatBookCount}>22</Text>
          </View>
          <View>
            <Text style={styles.seatAvailLabel}>Available</Text>
            <Text style={styles.seatAvailCount}>8</Text>
          </View>
        </View>


      </View>

      <View style={[styles.seatInfoBottom, active ? styles.seatInfoBottomActive : styles.seatInfoBottomExpired]}>

        {active ?
          <View style={styles.seatBookedStatus}>
            <Text style={styles.seatBookedText}>Booked</Text>
            <Ionicons name='checkmark-sharp' size={26} color='#ffffff' />
          </View> :

          <View style={styles.seatBookedStatus}>
            <Text style={styles.seatBookedText}>Expired</Text>
            <Ionicons name='warning' size={26} color='#ffffff' />
          </View>
        }

        {active && <View style={styles.seatBookingUpdate}>

          <View>
            <Text style={{ textAlign: 'center', fontWeight: '600', fontSize: 18, color: '#fff' }}>Your seat is reserved for this month.</Text>
            <Text style={{ textAlign: 'center', fontSize: 14, color: '#fff', marginTop: 2 }}>Next payment date is 30 Auguest 2022.</Text>
          </View>

        </View>}


        <StripeProvider publishableKey={STRIPE_PUBLISHABLE_KEY}>
          {!active && <Payment updateStatus={setActive} />}
        </StripeProvider>




      </View>

    </View>
  )
}


export default SeatInfo

const styles = StyleSheet.create({

  shadow: {
    shadowOffset: { width: 0, height: 5 },
    shadowColor: 'black',
    shadowOpacity: 0.3,
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