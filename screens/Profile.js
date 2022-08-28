import { StyleSheet, Text, View, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react'
import { useSelector } from 'react-redux';




const Profile = () => {

  const user = useSelector(state => state.root.user)


  return (
    <SafeAreaView style={styles.container}>

      {/* Header */}

      <View style={styles.profileHeaderContainer}>
        <Image
          style={styles.profilePhoto}
          source={require('../assets/app/profile_photo.jpeg')}
        />
        <View style={styles.profileHeaderInner}>
          <Text style={styles.profileName}>{user.name}</Text>
          <Text style={styles.profileContact}>+91 {user.phone}</Text>
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
    padding: 20,

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