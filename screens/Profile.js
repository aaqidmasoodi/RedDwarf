import { StyleSheet, Text, View, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react'




const Profile = () => {
  return (
    <SafeAreaView style={styles.container}>

      {/* Header */}

      <View style={styles.profileHeaderContainer}>
        <Image
          style={styles.profilePhoto}
          source={require('../assets/app/profile_photo.jpeg')}
        />
        <View style={styles.profileHeaderInner}>
          <Text style={styles.profileName}>Aaqid Masoodi</Text>
          <Text style={styles.profileContact}>+91 {'9797 944597'}</Text>
        </View>

      </View>




    </SafeAreaView>
  )
}

export default Profile

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,

  },

  profileHeaderContainer: {
    flexDirection: 'row',
  },

  profilePhoto: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    borderRadius: 50
  },

  profileHeaderInner: {
    padding: 25
  },

  profileName: { fontSize: 24, fontWeight: 'bold', color: '#6f6f6f' },
  profileContact: { fontSize: 16, color: '#6f6f6f', fontWeight: '600', marginTop: 2 },

});