import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const BusBasicInfo = () => {
  return (
        <View style={styles.busBasicInfoContainer}>
            <View>
                <Text style={styles.busNoText}>Bus</Text>
                <Text style={styles.busNoDigitText}>6</Text>
            </View>
            <View>
                <Text style={[styles.busBasicInfoRoute, styles.busStartText]}>panthachowk</Text>
                <Text style={[styles.busBasicInfoRoute, styles.busEndText]}>tulmullah</Text>
            </View>
        </View>
  )
}

export default BusBasicInfo

const styles = StyleSheet.create({
    busBasicInfoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
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
        fontWeight: 'bold',
        textTransform: 'uppercase'
      }
  
})