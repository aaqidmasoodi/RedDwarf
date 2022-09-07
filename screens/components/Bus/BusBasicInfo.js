import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'



const BusBasicInfo = () => {



  const user = useSelector(state => state.root.user);
  const bus = user ? user.bus : null
  const busNumber = bus ? bus.number : null;
  const busStart = bus ? bus.start : null;
  const busDestination = bus ? bus.destination : null;


  return (
    <View style={styles.busBasicInfoContainer}>
      <View>
        <Text style={styles.busNoText}>Bus</Text>
        <Text style={styles.busNoDigitText}>{busNumber}</Text>
      </View>
      <View style={{ marginTop: 5 }}>
        <Text style={[styles.busBasicInfoRoute, styles.busStartText]}>{busStart}</Text>
        <Text style={[styles.busBasicInfoRoute, styles.busEndText]}>{busDestination}</Text>
      </View>
    </View>
  )
}

export default BusBasicInfo

const styles = StyleSheet.create({
  busBasicInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start'
  },

  busNoText: {
    fontSize: 22,
    fontWeight: '600',
    color: '#6f6f6f',

  },

  busNoDigitText: {
    fontSize: 36,
    fontWeight: 'bold',
    marginTop: -10,
    color: '#6f6f6f',

  },

  busBasicInfoRoute: {
    fontSize: 18,
    color: '#6f6f6f',
    textAlign: 'right',
    fontWeight: '400',
    textTransform: 'uppercase'
  }

})