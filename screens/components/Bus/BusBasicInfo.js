import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const BusBasicInfo = () => {
  return (
        <View style={styles.busBasicInfoContainer}>
            <View>
                <Text style={styles.busNoText}>Bus No.</Text>
                <Text style={styles.busNoDigitText}>6</Text>
            </View>
            <View>
                <Text style={[styles.busBasicInfoRoute, styles.busStartText]}>PanthaChowk</Text>
                <Text style={[styles.busBasicInfoRoute, styles.busEndText]}>Tulmullah</Text>
            </View>
        </View>
  )
}

export default BusBasicInfo

const styles = StyleSheet.create({
    busBasicInfoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
      },
  
      busNoText: {
        fontSize: 22,
        fontWeight: '600'
      },
  
      busNoDigitText: {
        fontSize: 30,
        fontWeight: '600',
        marginTop: -5
      },
  
      busBasicInfoRoute: {
        fontSize: 20,
        color: '#3f3f3f'
      }
  
})